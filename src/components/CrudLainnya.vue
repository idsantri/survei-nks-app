<template lang="">
	<v-card :loading="loading" class="text-orange-darken-4">
		<v-form @submit.prevent="onSubmit">
			<v-card-title class="py-4"> Data NKS </v-card-title>
			<v-card-text class="py-0">
				<v-textarea
					class=""
					label="Peserta Survei"
					variant="outlined"
					v-model="input.peserta_survei"
					hide-details
					auto-grow
					rows="1"
				/>
				<v-textarea
					class="mt-4"
					label="Keputusan"
					variant="outlined"
					v-model="input.keputusan"
					hide-details
					auto-grow
					rows="1"
				/>
				<v-textarea
					class="mt-4"
					label="Catatan"
					variant="outlined"
					v-model="input.catatan"
					hide-details
					auto-grow
					rows="1"
				/>
			</v-card-text>
			<v-card-actions class="pa-4">
				<v-btn
					:disabled="true"
					variant="elevated"
					class="me-auto text-none text-orange-lighten-5"
					color="orange-darken-4"
				>
					Hapus
				</v-btn>
				<v-btn
					variant="elevated"
					:disabled="loading"
					type="submit"
					:loading="loading"
					color="orange-accent-1"
					class="text-none text-orange-darken-4"
				>
					Simpan
				</v-btn>
			</v-card-actions>
		</v-form>
	</v-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import apiUpdate from '@/api/api-update';
const props = defineProps({ data: Object });
const emit = defineEmits(['successSubmit', 'successDelete']);

const loading = ref(false);
const input = ref({});
onMounted(() => {
	Object.assign(input.value, props.data);
	// console.log(input.value);
});
async function onSubmit() {
	const data = JSON.parse(JSON.stringify(input.value));
	delete data.id;
	const put = await apiUpdate({
		endPoint: `nks/${input.value.id}`,
		loading,
		data,
	});
	if (put) emit('successSubmit');
}
</script>
<style lang=""></style>
