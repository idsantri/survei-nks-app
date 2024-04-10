import api from '.';
import { toArray } from '@/utils/array-object';
import { notifyConfirm, notifyError, notifySuccess } from '@/utils/notify';
import token from './token';

async function updateData({ endPoint, data, loading, notify, params }) {
	api.defaults.headers.common['Authorization'] = `Bearer ${token()}`;
	try {
		if (loading && typeof loading.value === 'boolean') loading.value = true;
		const response = await api.put(endPoint, data, { params });
		if (notify) notifySuccess(response.data.message);
		return response.data;
	} catch (error) {
		const message = error?.response?.data?.message;
		if (message) {
			toArray(message).forEach((msg) => notifyError(msg));
		} else {
			console.log(`Error during update ${endPoint}`, error);
		}
		return false;
	} finally {
		if (loading && typeof loading.value === 'boolean')
			loading.value = false;
	}
}

async function apiUpdate({
	endPoint,
	data,
	confirm = true,
	message = '<span style="color:red">Update data ini?</span>',
	loading,
	notify = true,
	params,
}) {
	if (confirm) {
		const confirmed = await notifyConfirm(message);
		return confirmed
			? await updateData({ endPoint, data, loading, notify, params })
			: false;
	} else {
		return updateData({ endPoint, data, loading, notify, params });
	}
}

export default apiUpdate;
