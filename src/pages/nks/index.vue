<template>
	<v-card class="mx-auto ma-6" max-width="600" :loading="loading">
		<v-card-actions class="d-flex bg-orange-accent-1 text-orange-darken-4">
			<div class="text-subtitle-1 pl-3 me-auto">Daftar NKS</div>
			<v-btn @click="newNks" variant="elevated" color="orange-darken-4">
				Baru
			</v-btn>
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
										<td>
											{{
												formatDateShort(n.tanggal_nks_m)
											}}
											|
											{{ formatHijri(n.tanggal_nks_h) }}
										</td>
									</tr>
									<tr>
										<td>Tanggal Survei</td>
										<td>
											{{
												formatDateShort(
													n.tanggal_survei_m
												)
											}}
											|
											{{
												formatHijri(n.tanggal_survei_h)
											}}
										</td>
									</tr>
									<tr>
										<td>Keputusan</td>
										<td>{{ n.keputusan }}</td>
									</tr>
								</tbody>
							</v-table>
						</v-card-item>
						<v-card-actions class="d-flex bg-orange-accent-1">
							<v-btn
								class="me-auto text-none"
								@click="editNks(n)"
								variant="outlined"
								color="orange-darken-4"
							>
								Edit
							</v-btn>
							<v-btn
								:to="`/nks/${n.id}/survei`"
								variant="elevated"
								color="orange-darken-4"
								class="text-none text-orange-lighten-5"
							>
								Survei
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>
	</v-card>
	<!-- <pre>{{ nks }}</pre> -->
	<v-dialog v-model="dialogCrud" max-width="600">
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
import { formatDateShort } from '@/utils/format-date';
import { formatHijri } from '@/utils/hijri';

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
