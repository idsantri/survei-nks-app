import api from '.';
import { toArray } from '@/utils/array-object';
import { notifyConfirm, notifyError, notifySuccess } from '@/utils/notify';
import token from './token';

async function deleteData({ endPoint, loading, notify, params }) {
	api.defaults.headers.common['Authorization'] = `Bearer ${token()}`;
	try {
		if (loading && typeof loading.value === 'boolean') loading.value = true;
		const response = await api.delete(endPoint, { params });
		if (notify) notifySuccess(response.data.message);
		return true;
	} catch (error) {
		const message = error?.response?.data?.message;
		if (message) {
			toArray(message).forEach((msg) => notifyError(msg));
		} else {
			console.log(`Error during delete ${endPoint}`, error);
		}
		return false;
	} finally {
		if (loading && typeof loading.value === 'boolean')
			loading.value = false;
	}
}

async function apiDelete({
	endPoint,
	message = '<span style="color:red">Hapus data ini?</span>',
	params,
	loading,
	notify = true,
}) {
	const confirmed = await notifyConfirm(message);
	return confirmed
		? await deleteData({ endPoint, loading, notify, params })
		: false;
}

export default apiDelete;
