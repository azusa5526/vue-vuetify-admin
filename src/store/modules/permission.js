import router, { asyncRoutes, constantRoutes } from '@/router';

/**
 * Through meta.permissions determines whether the current user rights match
 * @param permissions
 * @param route
 */
const hasPermission = (permissions, route) => {
	if (route.meta && route.meta.permissions) {
		return permissions.some((permission) => route.meta.permissions.includes(permission));
	}
	return true;
};

/**
 * Recursively filter asynchronous routing tables to return routing tables
 * that meet user permissions
 * @param permissions
 * @param routes asyncRoutes
 */
export const filterAsyncRoutes = (permissions, routes) => {
	const res = [];
	routes.forEach((route) => {
		const tmp = { ...route };
		if (hasPermission(permissions, tmp)) {
			if (tmp.children) {
				tmp.children = filterAsyncRoutes(permissions, tmp.children);
			}
			res.push(tmp);
		}
	});
	return res;
};

const permission = {
	namespaced: true,
	state: {
		routes: [],
		addRoutes: []
	},

	getters: {
		permissionRoutes: (state) => state.routes,
		addRoutes: (state) => state.addRoutes
	},

	mutations: {
		SET_ROUTES: (state, routes) => {
			state.addRoutes = routes;
			state.routes = constantRoutes.concat(routes);
		}
	},
	actions: {
		// GenerateRoutes: async ({ commit }, { roles }) => {
		// 	try {
		// 		console.groupCollapsed(`[vuex.permission] GenerateRoutes [${roles}]`);
		// 		let accessedRoutes;
		// 		if (roles.includes('admin')) {
		// 			accessedRoutes = asyncRoutes;
		// 		} else {
		// 			accessedRoutes = filterAsyncRoutes(roles, asyncRoutes);
		// 		}
		// 		commit('SET_ROUTES', accessedRoutes);
		// 		// Apply selected allowed routes
		// 		router.addRoutes(accessedRoutes);
		// 		console.log('[vuex.permission] accessedRoutes ', constantRoutes);
		// 		console.groupEnd();
		// 	} catch (err) {
		// 		console.warn('[vuex.permission] GenerateRoutes', err);
		// 	}
		// }
		GenerateRoutes: async ({ commit }, payload) => {
			console.log('vuex permission.js GenerateRoutes payload', payload);

			// let accessedRoutes;
			// if (payload.includes('ADMIN')) {
			// 	accessedRoutes = asyncRoutes;
			// } else {
			// 	accessedRoutes = filterAsyncRoutes(payload, asyncRoutes);
			// }
			const accessedRoutes = filterAsyncRoutes(payload, asyncRoutes);

			commit('SET_ROUTES', accessedRoutes);
			// Apply selected allowed routes
			router.addRoutes(accessedRoutes);
			console.log('[vuex.permission] accessedRoutes ', constantRoutes);
			console.groupEnd();
		}
	}
};

export default permission;
