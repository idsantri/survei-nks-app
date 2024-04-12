<template lang="">
	<v-card :loading="loading" class="text-orange-darken-4">
		<v-form @submit.prevent="onSubmit">
			<v-card-title class="py-4">
				Master Survei

				<span class="text-body-1 font-weight-light font-italic">
					({{ input.id ? 'edit' : 'baru' }})
				</span>
			</v-card-title>
			<v-card-text class="py-0">
				<v-row class="flex-nowrap">
					<v-col cols="6">
						<v-text-field
							density="comfortable"
							class=""
							label="Urut"
							variant="outlined"
							v-model="input.urut"
							hide-details
						/>
					</v-col>

					<v-col cols="6">
						<v-text-field
							density="comfortable"
							class=""
							label="Poin"
							variant="outlined"
							v-model="input.poin"
							hide-details
						/>
					</v-col>
				</v-row>
				<v-textarea
					density="comfortable"
					class="mt-4"
					label="Subyek"
					variant="outlined"
					v-model="input.subyek"
					hide-details
					auto-grow
					rows="1"
				/>
				<v-textarea
					density="comfortable"
					class="mt-4"
					label="Keterangan"
					variant="outlined"
					v-model="input.keterangan"
					hide-details
					auto-grow
					rows="1"
				/>
			</v-card-text>
			<v-card-actions class="pa-4">
				<v-btn
					:disabled="loading || !input.id"
					variant="elevated"
					class="me-auto text-none text-orange-lighten-5"
					color="orange-darken-4"
					@click="onDelete"
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
import apiPost from '@/api/api-post';
import apiDelete from '@/api/api-delete';
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
	if (data.id) {
		delete data.id;
		const put = await apiUpdate({
			endPoint: `master/${input.value.id}`,
			loading,
			data,
		});
		if (put) emit('successSubmit');
	} else {
		const post = await apiPost({ endPoint: 'master', loading, data });
		if (post) emit('successSubmit');
	}
}
async function onDelete() {
	const del = await apiDelete({
		endPoint: `master/${input.value.id}`,
		loading,
	});
	if (del) emit('successDelete');
}
</script>
<style lang=""></style>
