import { defineStore } from 'pinia';

const auth = defineStore('auth', {
	state: () => ({
		token: null,
		user: null,
		roles: null,
		permissions: null,
	}),
	getters: {
		getUser: (state) => state.user,
		getToken: (state) => state.token,
		getRoles: (state) => state.roles,
		getPermissions: (state) => state.permissions,
	},
	actions: {
		setUser(payload) {
			// console.log('setUser', payload);
			if (payload.roles) this.roles = payload.roles;
			if (payload.permissions) this.permissions = payload.permissions;
			if (payload.user) this.user = payload.user;
			if (payload.token) this.token = payload.token;
		},

		clearUser() {
			this.roles = null;
			this.permissions = null;
			this.user = null;
			this.token = null;
		},
	},
	persist: {
		storage: sessionStorage,
	},
});

export default auth;
