/** When your routing table is too long, you can split it into small modules */

import Layout from '@/views/layout/TheLayout.vue';

const permissionRouter = {
	path: '/permission',
	component: Layout,
	redirect: 'noredirect',
	name: 'Permission',
	meta: {
		title: 'route.permissions',
		icon: 'mdi-account-group'
	},
	children: [
		{
			path: 'role-management',
			component: () => import('@/views/components/Permission/RoleManagement.vue'),
			name: 'PermissionRoleManagement',
			meta: { title: 'route.permission.roleManagement', grantedPermissions: ['Pages.Users'], noCache: true }
		},
		{
			path: 'permission-management',
			component: () => import('@/views/components/Permission/PermissionManagement.vue'),
			name: 'PermissionPermissionManagement',
			meta: { title: 'route.permission.permissionManagement', grantedPermissions: ['Pages.Roles'], noCache: true }
		}
	]
};

export default permissionRouter;
