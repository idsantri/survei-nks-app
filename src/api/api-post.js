import api from '.';
import { toArray } from '@/utils/array-object';
import { notifyError, notifySuccess } from '@/utils/notify';
import token from './token';

async function apiPost({
	endPoint,
	data,
	needResponse = true,
	needNotify = true,
	loading,
}) {
	api.defaults.headers.common['Authorization'] = `Bearer ${token()}`;

	try {
		if (loading && typeof loading.value === 'boolean') loading.value = true;
		const response = await api.post(endPoint, data);
		if (needNotify) notifySuccess(response.data.message);
		if (needResponse) return response.data;
		return true;
	} catch (error) {
		const message = error?.response?.data?.message;
		if (message) {
			toArray(message).forEach((msg) => notifyError(msg));
		} else {
			console.log(`Error during post ${endPoint}`, error);
		}
		return false;
	} finally {
		if (loading && typeof loading.value === 'boolean')
			loading.value = false;
	}
}

export default apiPost;
