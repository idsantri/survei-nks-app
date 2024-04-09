<template>
	<v-card class="mx-auto mt-10" max-width="600" :loading="loading">
		<v-card-actions class="d-flex bg-orange">
			<div class="text-subtitle-1 pl-3 me-auto">Daftar NKS</div>
			<v-btn @click="newNks"> Baru </v-btn>
		</v-card-actions>
		<v-expansion-panels>
			<v-expansion-panel v-for="(n, i) in nks" :key="i">
				<v-expansion-panel-title>
					{{ n.nama }}
				</v-expansion-panel-title>
				<v-expansion-panel-text>
					<v-card flat>
						<v-card-item class="pa-0">
							<v-table>
								<tbody>
									<tr>
										<td>Tanggal NKS</td>
										<td>{{ n.tanggal_nks_m }}</td>
									</tr>
									<tr>
										<td>Tanggal Survei</td>
										<td>{{ n.tanggal_survei_m }}</td>
									</tr>
									<tr>
										<td>Lokasi 1</td>
										<td>{{ n.lokasi_1 }}</td>
									</tr>
									<tr>
										<td>Lokasi 2</td>
										<td>{{ n.lokasi_2 }}</td>
									</tr>
									<tr>
										<td>Lokasi 3</td>
										<td>{{ n.lokasi_3 }}</td>
									</tr>
									<tr>
										<td>Peserta Survei</td>
										<td>{{ n.peserta_survei }}</td>
									</tr>
									<tr>
										<td>Keputusan</td>
										<td>{{ n.keputusan }}</td>
									</tr>
									<tr>
										<td>Catatan</td>
										<td>{{ n.catatan }}</td>
									</tr>
								</tbody>
							</v-table>
						</v-card-item>
						<v-card-actions class="d-flex bg-surface-variant">
							<v-btn class="me-auto" @click="editNks(n)">
								Edit
							</v-btn>
							<v-btn :to="`/nks/${n.id}/survei`"> Survei </v-btn>
						</v-card-actions>
					</v-card>
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>
	</v-card>
	<!-- <pre>{{ nks }}</pre> -->
	<v-dialog v-model="dialogCrud" max-width="800">
		<crud-nks
			:data="inputNks"
			@success-submit="loadData"
			@success-delete="loadData"
		/>
	</v-dialog>
</template>

<script setup>
import apiGet from '@/api/api-get';
import { onMounted, ref } from 'vue';
import CrudNks from '@/components/CrudNks';

const loading = ref(false);
const nks = ref([]);
const dialogCrud = ref(false);
const inputNks = ref({});
async function loadData() {
	dialogCrud.value = false;
	const data = await apiGet({
		endPoint: 'nks',
		loading,
	});
	nks.value = data.nks;
}

onMounted(async () => {
	await loadData();
});

function newNks() {
	inputNks.value = {};
	dialogCrud.value = true;
}
function editNks(val) {
	inputNks.value = val;
	dialogCrud.value = true;
	// console.log('n', inputNks.value);
}
</script>
