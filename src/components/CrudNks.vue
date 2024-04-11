<template lang="">
	<v-card :loading="loading" class="text-orange-darken-4">
		<form @submit.prevent="onSubmit">
			<v-card-title class="py-4"> Data NKS </v-card-title>
			<v-card-text class="py-0">
				<v-text-field
					:rules="[(value) => !!value || 'Harus diisi!']"
					label="NKS*"
					variant="outlined"
					v-model="input.nama"
					hint=""
					required
				/>
				<v-text-field
					class="mt-4"
					label="Tanggal NKS (M)"
					variant="outlined"
					type="date"
					v-model="input.tanggal_nks_m"
					@change="
						isDate(input.tanggal_nks_m)
							? (input.tanggal_nks_h = m2h(input.tanggal_nks_m))
							: ''
					"
					:hint="
						isDate(input.tanggal_nks_m)
							? formatDateFullDay(input.tanggal_nks_m)
							: ''
					"
					persistent-hint
				/>
				<v-text-field
					class="mt-4"
					label="Tanggal NKS (H)"
					variant="outlined"
					v-model="input.tanggal_nks_h"
					:rules="[
						(val) => !!val || 'Harus diisi!',
						(val) => val?.length == 8 || '8 digit angka!',
					]"
					:hint="
						input.tanggal_nks_h?.length
							? bacaHijri(input.tanggal_nks_h)
							: ''
					"
					persistent-hint
				/>
				<v-text-field
					class="mt-4"
					label="Tanggal Survei (M)"
					variant="outlined"
					type="date"
					v-model="input.tanggal_survei_m"
					@change="
						isDate(input.tanggal_survei_m)
							? (input.tanggal_survei_h = m2h(
									input.tanggal_survei_m
							  ))
							: ''
					"
					:hint="
						isDate(input.tanggal_survei_m)
							? formatDateFullDay(input.tanggal_survei_m)
							: ''
					"
					persistent-hint
				/>
				<v-text-field
					class="mt-4"
					label="Tanggal Survei (H)"
					variant="outlined"
					v-model="input.tanggal_survei_h"
					:rules="[
						(val) => !!val || 'Harus diisi!',
						(val) => val?.length == 8 || '8 digit angka!',
					]"
					:hint="
						input.tanggal_survei_h?.length
							? bacaHijri(input.tanggal_survei_h)
							: ''
					"
					persistent-hint
				/>
			</v-card-text>
			<v-card-actions class="pa-4">
				<v-btn
					:disabled="loading || !input.id"
					@click="onDelete"
					variant="elevated"
					:loading="loading"
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
		</form>
	</v-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import apiPost from '@/api/api-post';
import apiUpdate from '@/api/api-update';
import apiDelete from '@/api/api-delete';
import { formatDateFullDay, isDate } from '@/utils/format-date';
import { bacaHijri, m2h } from '@/utils/hijri';
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
			endPoint: `nks/${input.value.id}`,
			loading,
			data,
		});
		if (put) emit('successSubmit');
	} else {
		const post = await apiPost({ endPoint: 'nks', loading, data });
		if (post) emit('successSubmit');
	}
}
async function onDelete() {
	const del = await apiDelete({
		endPoint: `nks/${input.value.id}`,
		loading,
	});
	if (del) emit('successDelete');
}
</script>
<style lang=""></style>
