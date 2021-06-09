import axios from 'axios';
import store from '@/store';
// import { getToken } from '@/utils/auth';

const instance = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	headers: {
		'Access-Control-Allow-Origin': '*'
	}
	// // send cookies when cross-domain requests
	// withCredentials: true,

	// // request timeout
	// timeout: 5000
});

// request interceptor
instance.interceptors.request.use(
	(config) => {
		// do something before request is sent
		if (store.getters['user/token']) {
			// let each request carry token
			config.headers.Authorization = 'Bearer ' + store.getters['user/token'];
		}
		// console.log('utlis request interceptors.request config', config);
		return config;
	},
	(error) => {
		// do something with request error
		console.log('request error', error);
		return Promise.reject(error);
	}
);

// response interceptor
instance.interceptors.response.use(
	(response) => {
		const res = response;
		return res;
	},
	(error) => {
		console.log(error.response.data);
		return Promise.reject(error.response);

		// if (error.response) {
		// 	console.log('utils.js request error.response', error.response);
		// 	switch (error.response.status) {
		// 		case 404:
		// 			console.log('Request.js error. Code 404, page not found.');
		// 			// go to 404 page
		// 			break;
		// 		case 500:
		// 			console.log('Request.js error. Code 500, internal server error.');
		// 			// go to 500 page
		// 			break;
		// 		default:
		// 			console.log('Request.js error.', error.message);
		// 	}
		// }
	}
);

export default instance;
