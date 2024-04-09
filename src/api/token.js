import auth from '@/stores/auth';

const token = () =>
	auth().getToken && auth().getToken.length > 0
		? auth().getToken
		: 'FAIL TO GET TOKEN';
export default token;
