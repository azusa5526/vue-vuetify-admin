import request from '@/utils/request';

export function login(data) {
	return request({
		url: '/api/TokenAuth/Authenticate',
		method: 'post',
		data
	});
}
export function createUser(data) {
	return request({
		url: '/api/services/app/User/Create',
		method: 'post',
		data
	});
}

export function updateUser(data) {
	return request({
		url: '/api/services/app/User/Update',
		method: 'put',
		data
	});
}
export function deleteUser(id) {
	return request({
		url: '/api/services/app/User/Delete',
		method: 'delete',
		params: { Id: id }
	});
}
export function getRoles() {
	return request({
		url: 'api/services/app/User/GetRoles',
		method: 'get'
	});
}

export function AbpUserConfiguration() {
	return request({
		url: '/AbpUserConfiguration/GetAll',
		method: 'get'
	});
}

export function getCurrentLoginInformations() {
	return request({
		url: '/api/services/app/Session/GetCurrentLoginInformations',
		method: 'get'
	});
}
export function getUserAll(params) {
	return request({
		url: '/api/services/app/User/GetAll',
		method: 'get',
		params: params
	});
}

// same as getUserAll(params)
export function getUsersByParams(params) {
	return request({
		url: '/api/services/app/User/GetAll',
		method: 'get',
		params: params
	});
}

export function getUser(id) {
	return request({
		url: '/api/services/app/User/Get',
		method: 'get',
		params: { Id: id }
	});
}

export function notifyByEmail(data) {
	return request({
		url: '/api/services/app/User/NotifyByEmail',
		method: 'post',
		data
	});
}

export function logout() {
	return request({
		url: '/user/logout',
		method: 'post'
	});
}

export function getResetPswdLink(email) {
	return request({
		url: '/api/services/app/Account/GetResetPswdLink',
		method: 'get',
		params: { emailAddress: email }
	});
}

export function register(data) {
	return request({
		url: '/api/services/app/Account/Register',
		method: 'post',
		data
	});
}

export function changePassword(data) {
	return request({
		url: '/api/services/app/User/changePassword',
		method: 'post',
		data
	});
}
