import NProgress from 'nprogress'; // progress bar
import router from './index';
import store from '../store';
import authRouter from './modules/auth';
import 'nprogress/nprogress.css'; // progress bar style
import { getToken, getCurrentUserId, removeToken, removeCurrentUserId } from '@/utils/auth';

// NProgress Configuration
NProgress.configure({ showSpinner: false });

// Generate white list
const whiteList = ['/landing', '/land']
	.concat(Array.from(authRouter, (route) => route.path))
	.concat(Array.from(authRouter, (route) => route.alias));
// .filter((route) => route); // remove undefined element
console.log('[router.whiteList]', whiteList);

/**
 * Check user has permission for this routes.
 * 'admin' permission passed directly.
 * @param {Array} roles
 * @param {Array} permissionRoles
 */

router.beforeEach(async (to, from, next) => {
	NProgress.start();

	const hasTokenInCookie = getToken();
	if (hasTokenInCookie) {
		// console.log('has Token', hasTokenInCookie);

		// console.log('router permission.js store', store);

		if (store.getters['user/grantedPermissions'] && store.getters['user/grantedPermissions'].length > 0) {
			// console.log('has Token > getters.roles is', store.getters['user/roles']);
			// console.log('has Token > getters.grantedPermissions is', store.getters['user/grantedPermissions']);
			next();
		} else {
			// console.log('has Token but getter.roles not exist, goto re getCurrentUserId & re generate dynamic routes');

			// const GetUserInfo = await store.dispatch('user/GetUserInfo', getCurrentUserId(), { root: true });
			// console.log('router permission.js GetUserInfo', GetUserInfo);
			// console.log('router permission.js GetUserInfo<getters user/grantedPermissions> ', store.getters['user/grantedPermissions']);
			await store.dispatch('user/GetUserInfo', getCurrentUserId());

			// const GenerateRoutes = await store.dispatch('permission/GenerateRoutes', store.getters['user/grantedPermissions']);
			// console.log('router permission.js GenerateRoutes', GenerateRoutes);
			// console.log(
			// 	'router permission.js GenerateRoutes<getters permission/permissionRoutes> ',
			// 	store.getters['permission/permissionRoutes']
			// );
			await store.dispatch('permission/GenerateRoutes', store.getters['user/grantedPermissions']);

			if (store.getters['permission/permissionRoutes']) {
				// console.log('set dynamic routes successfully', store.getters['permission/permissionRoutes']);
				next({ ...to, replace: true });
			} else {
				// console.log('set dynamic routes error');
				// console.log('redirect to signin. Clear old Token, CurrentUserId, Router');
				store.commit('user/SET_USER_INFO', { logout: true });
				removeToken();
				removeCurrentUserId();
				router.resetRouter();
				next(`/signin?redirect=${to.path}`);
			}
		}
	} else {
		// console.log('no Token');
		if (whiteList.includes(to.path)) {
			// console.log('No token but you are goto the whiteList pages');
			next();
		} else {
			// console.log('No token and toPage not in whiteList, redirect to signin page');
			next(`/signin?redirect=${to.path}`);
		}
	}

	NProgress.done();
});

router.afterEach(async () => {
	NProgress.done();
});
