import 'normalize.css/normalize.css';
import 'vuetify/dist/vuetify.min.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

import Vue from 'vue';
import vuetify from './plugins/vuetify';
import i18n from './locale'; // Internationalization

import App from './App.vue';
import router from './router';
import store from './store';

import './router/permission';
import './registerServiceWorker';

// vee-validate
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';

// vee-validate
Object.keys(rules).forEach((rule) => {
	extend(rule, rules[rule]);
});
localize('zh_TW', TW);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
configure({
	classes: {
		valid: 'is-valid',
		invalid: 'is-invalid'
	}
});

new Vue({
	router,
	store,
	i18n,
	vuetify,
	render: (h) => h(App)
}).$mount('#app');
