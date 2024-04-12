import axios from 'axios';
import { notifyError } from '@/utils/notify';

const url =
	process.env.NODE_ENV == 'development'
		? 'http://localhost:8080'
		: 'https://survei-nks.idsantri.my.id';
const api = axios.create({ baseURL: url });
api.defaults.withCredentials = true;

// Tambahkan interceptor untuk menangani kesalahan
api.interceptors.response.use(
	(response) => response,
	(error) => {
		// Tangani kesalahan jaringan atau koneksi di sini
		if (!error.response) {
			// Kesalahan tidak ada respons (seperti jaringan terputus)
			notifyError('Tidak dapat terhubung ke server');
		} else {
			// Teruskan kesalahan lain ke blok catch berikutnya
			return Promise.reject(error);
		}
	}
);

export default api;
