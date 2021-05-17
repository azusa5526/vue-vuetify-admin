import axios from 'axios';
import store from '@/store';
import { getToken } from '@/utils/auth';

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
		if (store.getters.token) {
			// let each request carry token
			config.headers.Authorization = 'Bearer ' + getToken();
		}
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
		if (error.response) {
			switch (error.response.status) {
				case 404:
					console.log('code 404, page not found');
					// go to 404 page
					break;
				case 500:
					console.log('code 500, internal server error');
					// go to 500 page
					break;
				default:
					console.log(error.message);
			}
		}
	}
);

export default instance;
