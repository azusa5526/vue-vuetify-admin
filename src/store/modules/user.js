// import { loginByEmail, getUserInfo } from '@/api/login';
import { login, getUser, AbpUserConfiguration } from '@/api/user';
import { setToken, removeToken, getToken, setCurrentUserId, removeCurrentUserId } from '@/utils/auth';
import { resetRouter } from '@/router';

const user = {
	state: {
		token: getToken(),
		roles: [],
		permissions: [],
		user: '',
		name: ''
		// avatar: '',
		// status: '',
		// code: '',
		// introduction: '',
		// setting: {
		// 	articlePlatform: []
		// }
	},

	getters: {
		token: (state) => state.token,
		roles: (state) => state.roles,
		permissions: (state) => state.permissions,
		name: (state) => state.name,
		user: (state) => state.user,
		avatar: (state) => state.avatar,
		status: (state) => state.status,
		introduction: (state) => state.introduction,
		setting: (state) => state.setting
	},

	mutations: {
		SET_USER_INFO: (state, payload) => {
			if (payload.logout) {
				state.token = '';
				state.roles = [];
				state.permissions = [];
				state.user = '';
				state.name = '';
			} else {
				state.token = payload.token || state.token;
				state.roles = payload.roleNames || state.roles;
				state.permissions = payload.permissions || state.permissions;
				state.user = payload || state.user;
				state.name = payload.name || state.name;
			}
		},
		SET_TOKEN: (state, token) => {
			state.token = token;
		}
	},

	actions: {
		Login: async ({ commit, dispatch, getters }, payload) => {
			console.log('vuex user.js payload', payload);

			const response = await login({
				userNameOrEmailAddress: payload.username.trim(),
				password: payload.password,
				rememberClient: true
			});

			// Store token in Cookie
			await setToken(response.data.result.accessToken);
			await setCurrentUserId(response.data.result.userId);
			await commit('SET_TOKEN', response.data.result.accessToken);
			if (getters.token) {
				await dispatch('GetUserInfo', response.data.result.userId);
				await dispatch('permission/GenerateRoutes', getters.permissions);
			} else {
				console.log('vuex user.js getters.token not set correctly.');
			}
		},

		GetUserInfo: async ({ commit, getters }, payload) => {
			const getPermissionsResponse = await AbpUserConfiguration(getters.token);
			const getUserResponse = await getUser(payload);

			getUserResponse.data.result.permissions = Object.keys(getPermissionsResponse.data.result.auth.grantedPermissions);
			await commit('SET_USER_INFO', getUserResponse.data.result);
		},

		// GetUserPermission: async ({ getters }) => {
		// 	const response = await AbpUserConfiguration(getters.token);
		// 	console.log('vuex user.js GetUserPermission response > grantedPermissions', response.data.result.auth.grantedPermissions);
		// },

		// GetUserInfo: async ({ commit, state }) => {
		// 	console.log('[vuex.user] GetUserInfo');
		// 	try {
		// 		const response = await getUserInfo(state.token);

		// 		// Since mockjs does not support custom status codes, it can only be hacked like this
		// 		if (!response) {
		// 			throw new Error('Verification failed, please login again.');
		// 		}

		// 		// Verify returned roles are a non-null array
		// 		if (response.user.roles && response.user.roles.length === 0) {
		// 			throw new Error('getInfo: roles must be a non-null array!');
		// 		}

		// 		commit('SET_USER_INFO', response.user);
		// 	} catch (err) {
		// 		console.warn('[vuex.user] GetUserInfo', err);
		// 	}
		// },

		LogOut: async ({ commit }) => {
			console.log('[vuex.user] LogOut');
			await removeToken();
			await commit('SET_USER_INFO', { logout: true });
			removeCurrentUserId();
			resetRouter();
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
	}
};

export default user;
