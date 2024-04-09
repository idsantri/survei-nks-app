import { toArray } from '@/utils/array-object';
import api from '.';
import token from './token';
import { notifyError, notifySuccess } from '@/utils/notify';

async function apiGet({ endPoint, loading, params = null, notify = false }) {
	api.defaults.headers.common['Authorization'] = `Bearer ${token()}`;

	try {
		if (loading && typeof loading.value === 'boolean') loading.value = true;
		const { data } = await api.get(endPoint, { params });
		if (notify) notifySuccess(data.message);
		return data;
	} catch (error) {
		const message = error?.response?.data?.message;
		if (message) {
			toArray(message).forEach((msg) => notifyError(msg));
		} else {
			console.log(`Error during get ${endPoint}`, error);
		}
		return false;
	} finally {
		if (loading && typeof loading.value === 'boolean')
			loading.value = false;
	}
}

export default apiGet;
