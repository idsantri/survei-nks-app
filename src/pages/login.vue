<template lang="">
	<div class="d-flex align-center justify-center mt-16">
		<v-card
			width="400"
			:loading="loading"
			class="bg-orange-lighten-4 text-orange-darken-4"
			elevation="6"
		>
			<v-card-item>
				<v-card-title class="text-center">Login</v-card-title>

				<v-card-subtitle class="text-center font-weight-medium">
					Survei NKS PW-IASS Bangkalan
				</v-card-subtitle>
			</v-card-item>

			<v-card-text>
				<form @submit.prevent="onSubmit">
					<v-text-field
						v-model="input.login"
						required
						label="Login"
						variant="outlined"
						bg-color="orange-lighten-5"
					>
					</v-text-field>
					<v-text-field
						v-model="input.password"
						required
						label="Password"
						type="password"
						variant="outlined"
						bg-color="orange-lighten-5"
					>
					</v-text-field>
					<v-btn
						class="text-none text-orange-lighten-5"
						color="orange"
						type="submit"
						block
						:disable="loading"
					>
						Login
					</v-btn>
				</form>
			</v-card-text>
		</v-card>
	</div>
</template>
<script setup>
import { ref } from 'vue';
import apiPost from '@/api/api-post';
import useStore from '@/stores/auth';
import { useRouter } from 'vue-router';

const input = ref({});
const loading = ref(false);
const router = useRouter();

async function onSubmit() {
	const data = {
		login: input.value.login,
		password: input.value.password,
	};
	// console.log(data);
	const post = await apiPost({
		endPoint: 'login',
		data,
		loading,
		needNotify: true,
	});

	if (post) {
		useStore().token = post.token;
		useStore().user = post.user;
		router.push('/nks');
	}
}
</script>
<style lang=""></style>
