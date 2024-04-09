/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';
import { nextTick } from 'vue';
import auth from '@/stores/auth';
import { notifyError } from '@/utils/notify';
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	extendRoutes: setupLayouts,
});
router.beforeEach((to, from, next) => {
	// console.log(to);
	if (to.fullPath === '/') {
		return next('/nks');
	}

	const authRoutes = ['/register', '/login', '/forgot', '/reset', '/verify'];
	const toAuthRoutes = authRoutes.includes(to.fullPath);
	const isAuthenticate =
		auth().getToken && auth().getToken.length > 0 ? true : false;
	// console.log('route', toAuthRoutes);
	// console.log('auth', isAuthenticate);
	// console.log('from', from);

	if (!toAuthRoutes && !isAuthenticate) {
		return next('/login');
	} else if (toAuthRoutes && isAuthenticate) {
		notifyError('Anda sudah login');
		return next(from.fullPath);
	} else {
		return next();
	}
});

const DEFAULT_TITLE = 'Survei NKS';
router.afterEach((to) => {
	nextTick(() => {
		document.title = to.meta.title
			? `${DEFAULT_TITLE} — ${to.meta.title}`
			: DEFAULT_TITLE;
	});
});
export default router;
