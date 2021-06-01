import { getRoles, getRole, addRole, updateRole, deleteRole } from '@/api/roles';

const state = {
	roles: [],
	rolesCount: 0
};

const getters = {
	roleList: (state) => state.roles,
	rolesCount: (state) => state.rolesCount
};

const mutations = {
	SET_ROLES: (state, roles) => {
		state.roles = roles;
	},

	SET_ROLES_COUNT: (state, payload) => {
		state.rolesCount = payload;
	}
};

const actions = {
	getRoles({ commit }) {
		return new Promise((resolve, reject) => {
			getRoles()
				.then((response) => {
					commit('SET_ROLES', response.data.result.items);
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	getRolesByParams({ commit }, payload) {
		console.log('vuex user.js getRolesByParams payload', payload);
		return new Promise((resolve, reject) => {
			getRoles(payload)
				.then((response) => {
					console.log('vuex user.js getRolesByParams response.data.result.items', response.data.result.items);
					commit('SET_ROLES', response.data.result.items);
					commit('SET_ROLES_COUNT', response.data.result.totalCount);
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	getRole(context, id) {
		return new Promise((resolve, reject) => {
			getRole(id)
				.then((response) => {
					const items = response.data.result.items;
					resolve(items);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	addRole(context, info) {
		return new Promise((resolve, reject) => {
			addRole(info)
				.then((response) => {
					resolve(response.data.success);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	updateRole(context, info) {
		return new Promise((resolve, reject) => {
			updateRole(info)
				.then((response) => {
					resolve(response.data.success);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	deleteRole(context, id) {
		return new Promise((resolve, reject) => {
			deleteRole(id)
				.then((response) => {
					resolve(response.data.success);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
