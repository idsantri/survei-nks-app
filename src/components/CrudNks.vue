<template lang="">
	<v-card :loading="loading">
		<v-form @submit.prevent="onSubmit">
			<v-card-title> Data NKS </v-card-title>
			<v-card-text>
				<v-row>
					<v-col>
						<v-sheet class="">
							<v-text-field
								label="NKS"
								variant="outlined"
								v-model="input.nama"
							></v-text-field>
							<v-text-field
								label="Tanggal NKS (M)"
								variant="outlined"
								type="date"
								v-model="input.tanggal_nks_m"
							></v-text-field>
							<v-text-field
								label="Tanggal NKS (H)"
								variant="outlined"
								v-model="input.tanggal_nks_h"
							></v-text-field>
							<v-text-field
								label="Tanggal Survei (M)"
								variant="outlined"
								type="date"
								v-model="input.tanggal_survei_m"
							></v-text-field>
							<v-text-field
								label="Tanggal Survei (H)"
								variant="outlined"
								v-model="input.tanggal_survei_h"
							></v-text-field>
						</v-sheet>
					</v-col>
					<v-col>
						<v-sheet class="">
							<v-text-field
								label="Lokasi 1"
								variant="outlined"
								v-model="input.lokasi_1"
							></v-text-field>
							<v-text-field
								label="Lokasi 2"
								variant="outlined"
								v-model="input.lokasi_2"
							></v-text-field>
							<v-text-field
								label="Lokasi 3"
								variant="outlined"
								v-model="input.lokasi_3"
							></v-text-field>
							<v-text-field
								label="Peserta Survei"
								variant="outlined"
								v-model="input.peserta_survei"
							></v-text-field>
							<v-text-field
								label="Keputusan"
								variant="outlined"
								v-model="input.keputusan"
							></v-text-field>
						</v-sheet>
					</v-col>
				</v-row>

				<v-text-field
					label="Catatan"
					variant="outlined"
					v-model="input.catatan"
				></v-text-field>
			</v-card-text>
			<v-card-actions>
				<v-btn
					:disabled="loading || !input.id"
					class="me-auto"
					@click="onDelete"
				>
					Hapus
				</v-btn>
				<v-btn :disabled="loading" type="submit">Simpan</v-btn>
			</v-card-actions>
		</v-form>
	</v-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import apiPost from '@/api/api-post';
import apiUpdate from '@/api/api-update';
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
