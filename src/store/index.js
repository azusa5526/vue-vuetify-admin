import Vue from 'vue';
import Vuex from 'vuex';

// Plugins
import syncStorage from './plugins/syncStorage';

// Modules
import permission from './modules/permission';
import settings from './modules/settings';
import user from './modules/user';
import roles from './modules/roles';
import alert from './modules/alert';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		permission,
		settings,
		user,
		roles,
		alert
	},

	plugins: [syncStorage({})],

	state: {},
	mutations: {},
	actions: {},
	getters: {}
});
