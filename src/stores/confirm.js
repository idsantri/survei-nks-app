import { defineStore } from 'pinia';

const confirm = defineStore('confirm', {
	state: () => {
		return {
			show: false,
			message: '',
			result: false,
		};
	},
	getters: {
		getResult: (state) => state.result,
	},

	actions: {
		setFalse() {
			this.result = false; // Mengubah nilai result ketika dibatalkan
		},
		showConfirm(message) {
			this.show = true;
			this.message = message;
		},
		hide() {
			this.show = false;
		},
		confirm() {
			this.result = true; // Mengubah nilai result ketika dikonfirmasi
			this.hide();
		},
		cancel() {
			this.result = false; // Mengubah nilai result ketika dibatalkan
			this.hide();
		},
	},
});

export default confirm;
