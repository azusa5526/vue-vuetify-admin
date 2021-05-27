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
	userTotalCount: 0
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
	// vetifiedUsersList: (state) => state.allUsers.filter((user) => user.isActive),
	// pendingUsersList: (state) => state.allUsers.filter((user) => !user.isActive),
	vetifiedUsersList: (state) => state.vetifiedUsers,
	pendingUsersList: (state) => state.pendingUsers
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
	}

	// SET_USER_TOTAL_COUNT: (state, countNumber) => {
	// 	state.userTotalCount = count
	// }
};

const actions = {
	Login: async ({ commit, dispatch, getters }, payload) => {
		console.log('vuex user.js payload', payload);

		const response = await login({
			userNameOrEmailAddress: payload.username.trim(),
			password: payload.password,
			rememberClient: true
		});

		console.log('vuex user.js login response', response);

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
		// console.log('vuex user.js GetUserInfo getters', getters);
		// console.log('vuex user.js GetUserInfo payload', payload);
		const getPermissionsResponse = await AbpUserConfiguration(getters.token);
		const getUserResponse = await getUser(payload);

		// console.log('vuex user.js GetUserInfo getPermissionsResponse', getPermissionsResponse);
		// console.log('vuex user.js GetUserInfo getUserResponse', getUserResponse);

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
		console.log('vuex user.js getUsersByParams payload', payload);
		const response = await getUsersByParams(payload);
		console.log('vuex user.js getUsersByParams response', response);
		const { isActive } = payload;
		commit('SET_USERS', { isActive: isActive, responseData: response.data.result.items });
	},

	createUser: async (context, payload) => {
		try {
			await createUser(payload);
		} catch (error) {
			throw new Error('vuex user.js createUser error', error);
		}
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
		console.log('vuex user.js updateUser', payload);
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
