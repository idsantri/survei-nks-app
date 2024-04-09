import useStore from '@/stores/snackbar';
import useConfirm from '@/stores/confirm';

export const notifySuccess = (message) => {
	const store = useStore();
	// Panggil actions untuk menampilkan Snackbar
	store.showSnackbar({ message, type: 'success' });
};

export const notifyError = (message) => {
	const store = useStore();
	// Panggil actions untuk menampilkan Snackbar
	store.showSnackbar({ message, type: 'error' });
};

export const notifyConfirm = (message) => {
	const store = useConfirm();
	store.showConfirm(message);
	return new Promise((resolve) => {
		store.$subscribe(() => resolve(store.getResult ? true : false));
	});
};
