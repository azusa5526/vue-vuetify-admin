import { login, getUser, AbpUserConfiguration, getUserAll, createUser, deleteUser, updateUser, getUsersByParams } from '@/api/user';
import { setToken, removeToken, getToken, setCurrentUserId, removeCurrentUserId } from '@/utils/auth';
import { resetRouter } from '@/router';

const state = {
	// User state
	token: getToken(),
	roles: [],
	grantedPermissions: [],
	user: '',
	name: '',
	// avatar: '',
	// status: '',
	// code: '',
	// introduction: '',
	// setting: {
	// 	articlePlatform: []
	// }

	// Users state
	allUsers: [],
	vetifiedUsers: [],
	pendingUsers: [],
	verifiedUsersCount: 0,
	pendingUsersCount: 0
};

const getters = {
	// User getters
	token: (state) => state.token,
	roles: (state) => state.roles,
	grantedPermissions: (state) => state.grantedPermissions,
	allPermissions: (state) => state.allPermissions,
	name: (state) => state.name,
	user: (state) => state.user,
	// avatar: (state) => state.avatar,
	// status: (state) => state.status,
	// introduction: (state) => state.introduction,
	setting: (state) => state.setting,

	// Users getters
	allUsersList: (state) => state.allUsers,
	vetifiedUsersList: (state) => state.vetifiedUsers,
	pendingUsersList: (state) => state.pendingUsers,
	verifiedUsersCount: (state) => state.verifiedUsersCount,
	pendingUsersCount: (state) => state.pendingUsersCount
};

const mutations = {
	SET_USER_INFO: (state, payload) => {
		if (payload.logout) {
			state.token = '';
			state.roles = [];
			state.grantedPermissions = [];
			state.allPermissions = [];
			state.user = '';
			state.name = '';
		} else {
			state.token = payload.token || state.token;
			state.roles = payload.roleNames || state.roles;
			state.grantedPermissions = payload.grantedPermissions || state.grantedPermissions;
			state.allPermissions = payload.allPermissions || state.allPermissions;
			state.user = payload || state.user;
			state.name = payload.name || state.name;
		}
	},

	SET_TOKEN: (state, token) => {
		state.token = token;
	},

	SET_ALL_USERS: (state, allUsers) => {
		state.allUsers = allUsers;
	},

	SET_USERS: (state, payload) => {
		const { isActive, responseData } = payload;
		if (isActive) {
			state.vetifiedUsers = responseData;
		} else {
			state.pendingUsers = responseData;
		}
	},

	SET_USERS_COUNT: (state, payload) => {
		const { isActive, responseData } = payload;
		if (isActive) {
			state.verifiedUsersCount = responseData;
		} else {
			state.pendingUsersCount = responseData;
		}
	}
};

const actions = {
	Login: async ({ commit, dispatch, getters }, payload) => {
		console.log('vuex user.js payload', payload);

		const response = await login({
			userNameOrEmailAddress: payload.username.trim(),
			password: payload.password,
			rememberClient: true
		}).catch((error) => {
			console.error('vuex user.js login error', error);
			dispatch('alert/updateMessage', { message: '登入失敗', status: 'error' }, { root: true });
		});

		// Store token in Cookie
		await setToken(response.data.result.accessToken);
		await setCurrentUserId(response.data.result.userId);

		await commit('SET_TOKEN', response.data.result.accessToken);
		if (getters.token) {
			await dispatch('GetUserInfo', response.data.result.userId);
			await dispatch('permission/GenerateRoutes', getters.grantedPermissions, { root: true });
		} else {
			console.error('vuex user.js getters.token not set correctly.');
		}
	},

	GetUserInfo: async ({ commit, getters }, payload) => {
		const getPermissionsResponse = await AbpUserConfiguration(getters.token);
		const getUserResponse = await getUser(payload);

		getUserResponse.data.result.grantedPermissions = Object.keys(getPermissionsResponse.data.result.auth.grantedPermissions);
		getUserResponse.data.result.allPermissions = Object.keys(getPermissionsResponse.data.result.auth.allPermissions);

		await commit('SET_USER_INFO', getUserResponse.data.result);
	},

	LogOut: async ({ commit }) => {
		console.log('[vuex.user] LogOut');
		await removeToken();
		await commit('SET_USER_INFO', { logout: true });
		removeCurrentUserId();
		resetRouter();
	},

	getAllUsers: async ({ commit }) => {
		const response = await getUserAll();
		commit('SET_ALL_USERS', response.data.result.items);
	},

	getUsersByParams: async ({ commit }, payload) => {
		console.log('vuex user.js getUserByParams payload', payload);
		const response = await getUsersByParams(payload);
		const { isActive } = payload;
		commit('SET_USERS', { isActive: isActive, responseData: response.data.result.items });
		commit('SET_USERS_COUNT', { isActive: isActive, responseData: response.data.result.totalCount });
	},

	createUser: async (context, payload) => {
		console.log('vuex user.js createUser payload', payload);
		// try {
		// 	await createUser(payload);
		// } catch (error) {
		// 	console.log(error);
		// 	throw new Error('vuex user.js createUser error', error);
		// }
		await createUser(payload);
	},

	deleteUser: async (context, id) => {
		console.log('vuex uesr.js deleteUser id', id);
		try {
			await deleteUser(id);
		} catch (error) {
			throw new Error('vuex user.js deleteUser error', error);
		}
	},

	updateUser: async (context, payload) => {
		console.log('vuex user.js updateUser payload', payload);
		try {
			await updateUser(payload);
		} catch (error) {
			throw new Error('vuex user.js updateUser error', error);
		}
	}

	// Dynamically modify permissions
	/* ChangeRoles: async ({ commit, dispatch }, role) => {
      try {
        console.log('[vuex.user] ChangeRoles', role);
        await commit('SET_TOKEN', role);
        const data = await getUserInfo(role);
        await commit('SET_USER_INFO', data);
        // Redraw the side menu after dynamically modifying the permissions
        await dispatch('GenerateRoutes', data);
      } catch (err) {
        console.warn('[vuex.user] ChangeRoles', err);
      }
    }, */
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
