import { defineStore } from 'pinia';

const snackbar = defineStore('snackbar', {
	state: () => ({
		snackbar: {
			show: false,
			message: '',
			type: 'success', // Default type
		},
	}),
	actions: {
		// Menggunakan actions untuk menyembunyikan Snackbar
		hideSnackbar() {
			this.snackbar.show = false;
		},
		// Menggunakan actions untuk menampilkan Snackbar
		showSnackbar({ message, type }) {
			this.snackbar.message = message;
			this.snackbar.type = type;
			this.snackbar.show = true;
		},
	},
});
export default snackbar;
