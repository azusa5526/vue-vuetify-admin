import NProgress from 'nprogress'; // progress bar
import router from './index';
import store from '../store';
import authRouter from './modules/auth';
import 'nprogress/nprogress.css'; // progress bar style
// eslint-disable-next-line no-unused-vars
import { getToken, getCurrentUserId, removeToken, removeCurrentUserId } from '@/utils/auth';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

/**
 * Generate white list
 */
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
		// console.log('has Token');

		if (store.getters.grantedPermissions && store.getters.grantedPermissions.length > 0) {
			// console.log('has Token > getters.roles is', store.getters.roles);
			// console.log('has Token > getters.grantedPermissions is', store.getters.grantedPermissions);
			next();
		} else {
			console.log('has Token but getter.roles not exist, goto re getCurrentUserId & re generate dynamic routes');
			try {
				await store.dispatch('GetUserInfo', getCurrentUserId());
				// const GenerateRoutes = await store.dispatch('permission/GenerateRoutes', store.getters.roles);
				// const GenerateRoutes =
				await store.dispatch('permission/GenerateRoutes', store.getters.grantedPermissions);
				// console.log('set dynamic routes successfully', GenerateRoutes);
				next({ ...to, replace: true });
			} catch (error) {
				// console.log('set dynamic routes error', error);
				// console.log('redirect to signin. Clear old Token, CurrentUserId, Router');
				store.commit('SET_USER_INFO', { logout: true });
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
