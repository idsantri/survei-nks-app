<template>
	<v-app>
		<v-layout class="rounded rounded-md">
			<v-app-bar color="orange" density="compact">
				<v-app-bar-title>Survei NKS</v-app-bar-title>

				<template v-slot:append>
					<v-btn
						v-show="isAuthenticate && !isAuthRoutes"
						class="text-none font-weight-regular bg-red"
						@click="logout"
					>
						<v-icon icon="mdi-logout" />
						Logout
					</v-btn>
				</template>
			</v-app-bar>

			<v-main>
				<router-view />
				<notify-snackbar />
				<notify-confirm />
			</v-main>
		</v-layout>
	</v-app>
</template>

<script setup>
import auth from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';
import NotifySnackbar from '@/components/NotifySnackbar.vue';
import NotifyConfirm from '@/components/NotifyConfirm.vue';

const router = useRouter();
const route = useRoute();
function logout() {
	auth().$reset();
	router.push('/login');
}

const authRoutes = ['/register', '/login', '/forgot', '/reset', '/verify'];
const isAuthRoutes = authRoutes.includes(route.fullPath);
const isAuthenticate =
	auth().getToken && auth().getToken.length > 0 ? true : false;
</script>
