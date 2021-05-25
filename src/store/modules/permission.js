import router, { asyncRoutes, constantRoutes } from '@/router';

/**
 * Through meta.permissions determines whether the current user rights match
 * @param grantedPermissions
 * @param route
 */
const hasPermission = (grantedPermissions, route) => {
	if (route.meta && route.meta.grantedPermissions) {
		return grantedPermissions.some((permission) => route.meta.grantedPermissions.includes(permission));
	}
	return true;
};

/**
 * Recursively filter asynchronous routing tables to return routing tables
 * that meet user permissions
 * @param grantedPermissions
 * @param routes asyncRoutes
 */
export const filterAsyncRoutes = (grantedPermissions, routes) => {
	const res = [];
	routes.forEach((route) => {
		const tmp = { ...route };
		if (hasPermission(grantedPermissions, tmp)) {
			if (tmp.children) {
				tmp.children = filterAsyncRoutes(grantedPermissions, tmp.children);
			}
			res.push(tmp);
		}
	});
	return res;
};

const state = {
	routes: [],
	addRoutes: []
};

const getters = {
	permissionRoutes: (state) => state.routes,
	addRoutes: (state) => state.addRoutes
};

const mutations = {
	SET_ROUTES: (state, routes) => {
		state.addRoutes = routes;
		state.routes = constantRoutes.concat(routes);
	}
};

const actions = {
	GenerateRoutes: async ({ commit }, payload) => {
		// console.log('vuex permission.js GenerateRoutes payload', payload);

		const accessedRoutes = filterAsyncRoutes(payload, asyncRoutes);
		commit('SET_ROUTES', accessedRoutes);

		// Apply selected allowed routes
		router.addRoutes(accessedRoutes);
		// console.log('[vuex.permission] accessedRoutes ', constantRoutes);
		console.groupEnd();
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
