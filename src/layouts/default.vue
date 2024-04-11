<template>
	<v-app>
		<v-layout class="rounded rounded-md">
			<v-app-bar class="bg-orange-accent-1" density="compact">
				<v-app-bar-title>
					<v-btn
						class="text-none px-2"
						color="orange-accent-1"
						to="/nks"
						variant="text"
					>
						<span
							class="text-brown-darken-4 text-subtitle-1 font-weight-medium"
						>
							Survei NKS PW-IASS Bangkalan
						</span>
					</v-btn>
				</v-app-bar-title>

				<template v-slot:append>
					<v-btn
						v-show="isAuthenticate && !isAuthRoutes"
						class="text-none font-weight-regular me-4 text-orange-lighten-5"
						variant="elevated"
						@click="logout"
						color="orange-darken-4"
					>
						<v-icon icon="mdi-logout" />
						Logout
					</v-btn>
				</template>
			</v-app-bar>

			<v-main class="bg-orange-lighten-5">
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
import { notifyConfirm as dialog } from '@/utils/notify';

const router = useRouter();
const route = useRoute();

async function logout() {
	const confirmed = await dialog('Keluar dari aplikasi?');
	if (confirmed) {
		auth().$reset();
		router.push('/login');
	}
	return;
}

const authRoutes = ['/register', '/login', '/forgot', '/reset', '/verify'];
const isAuthRoutes = authRoutes.includes(route.fullPath);
const isAuthenticate =
	auth().getToken && auth().getToken.length > 0 ? true : false;
</script>
