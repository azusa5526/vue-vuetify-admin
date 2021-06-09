const state = {
	message: '',
	status: '',
	isNotice: false
};

const getters = {
	message(state) {
		return state.message;
	},

	status(state) {
		return state.status;
	},

	isNotice(state) {
		return state.isNotice;
	}
};

const mutations = {
	UPDATEMESSAGE(state, payload) {
		state.message = payload.message;
		state.status = payload.status;
		state.isNotice = !state.isNotice;
	}
};

const actions = {
	updateMessage({ commit }, payload) {
		commit('UPDATEMESSAGE', payload);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
