<template lang="">
	<div class="d-flex align-center justify-center mt-10">
		<v-card width="400" :loading="loading">
			<v-card-item>
				<v-card-title class="text-center">Login</v-card-title>

				<v-card-subtitle class="text-center"
					>Survei NKS PW-IASS Bangkalan</v-card-subtitle
				>
			</v-card-item>

			<v-card-text>
				<v-form @submit.prevent="onSubmit">
					<v-text-field
						v-model="input.login"
						:rules="[
							(value) => {
								if (value) return true;
								return 'You must enter a first name.';
							},
						]"
						label="Login"
					>
					</v-text-field>
					<v-text-field
						v-model="input.password"
						:rules="[
							(value) => {
								if (value) return true;
								return 'You must enter a first name.';
							},
						]"
						label="Password"
						type="password"
					>
					</v-text-field>
					<v-btn class="mt-2" type="submit" block :disable="loading"
						>Login</v-btn
					>
				</v-form>
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
