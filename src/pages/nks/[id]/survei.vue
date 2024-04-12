<template lang="">
	<v-card class="ma-6" :loading="loading">
		<v-card-item class="bg-orange-lighten-4 text-orange-darken-4">
			<div class="d-flex align-center">
				<div class="me-auto font-weight-light" style="font-size: 1.5em">
					NKS
					<span class="font-weight-medium">
						{{ nks.nama }}
					</span>
				</div>
				<v-btn
					class="mx-2 my-1 text-none"
					color="orange-darken-2"
					variant="outlined"
					@click="loadData"
				>
					<v-icon icon="mdi-sync" size="25"></v-icon>
				</v-btn>
				<v-btn
					class="mx-2 my-1 text-none"
					color="orange-darken-2"
					variant="outlined"
					to="/"
				>
					<v-icon icon="mdi-home" size="25"></v-icon>
				</v-btn>

				<v-btn
					class="mx-2 my-1 text-none"
					color="orange-darken-2"
					variant="outlined"
					@click="$router.go(-1)"
				>
					<v-icon icon="mdi-keyboard-backspace" size="25"></v-icon>
				</v-btn>
				<v-menu class="">
					<template v-slot:activator="{ props }">
						<v-btn
							color="orange-darken-3"
							v-bind="props"
							class="text-none text-orange-lighten-5"
							append-icon="mdi-menu-down"
						>
							Edit
						</v-btn>
					</template>
					<v-list class="pa-0" density="compact">
						<v-list-item @click="dialogNks = true">
							<v-list-item class="text-orange-darken-4">
								Edit NKS
							</v-list-item>
						</v-list-item>
						<v-list-item @click="dialogLokasi = true">
							<v-list-item class="text-orange-darken-4">
								Edit Lokasi
							</v-list-item>
						</v-list-item>
						<v-list-item @click="dialogLainnya = true">
							<v-list-item class="text-orange-darken-4">
								Edit Lainya
							</v-list-item>
						</v-list-item>
					</v-list>
				</v-menu>
			</div>
		</v-card-item>
		<v-card-item class="py-0">
			<v-table density="compact">
				<tbody>
					<tr>
						<td>Tanggal NKS</td>
						<td>
							{{ formatDateFullDay(nks.tanggal_nks_m) }} |
							{{ bacaHijri(nks.tanggal_nks_h) }}
						</td>
					</tr>
					<tr>
						<td>Tanggal Survei</td>
						<td>
							{{ formatDateFullDay(nks.tanggal_survei_m) }} |
							{{ bacaHijri(nks.tanggal_survei_h) }}
						</td>
					</tr>
					<tr>
						<td>Lokasi 1</td>
						<td>{{ nks.lokasi_1 }}</td>
					</tr>
					<tr>
						<td>Lokasi 2</td>
						<td>{{ nks.lokasi_2 }}</td>
					</tr>
					<tr>
						<td>Lokasi 3</td>
						<td>{{ nks.lokasi_3 }}</td>
					</tr>
					<tr>
						<td>Peserta Survei</td>
						<td>{{ nks.peserta_survei }}</td>
					</tr>
					<tr>
						<td>Keputusan</td>
						<td>{{ nks.keputusan }}</td>
					</tr>
					<tr>
						<td>Catatan</td>
						<td>
							{{ nks.catatan }}
						</td>
					</tr>
				</tbody>
			</v-table>
		</v-card-item>
		<!-- <pre>{{ nks }}</pre> -->
		<v-card-actions class="d-flex bg-orange-darken-4">
			<div class="text-subtitle-1 pl-3 me-auto text-orange-lighten-5">
				Data Survei
			</div>
			<v-btn
				to="/survei/master"
				color="bg-orange-lighten-5"
				variant="outlined"
				class="text-none font-weight-regular me-2"
				>Master Survei
			</v-btn>
			<v-btn
				@click="resetSurvei"
				color="bg-orange-lighten-5"
				variant="outlined"
				class="text-none font-weight-regular me-2"
				>Reset Survei
			</v-btn>
		</v-card-actions>

		<v-card-item class="pa-4">
			<v-table class="text-orange-darken-4" density="comfortable">
				<thead>
					<tr>
						<th class="px-1 text-left">Subyek</th>
						<th class="px-1 text-center">Poin</th>
						<th
							class="px-1 text-left text-orange-darken-4 bg-orange-lighten-5"
						>
							Calon Lokasi 1
						</th>
						<th
							class="px-1 text-center text-orange-darken-4 bg-orange-lighten-5"
						>
							Nilai
						</th>
						<th
							class="px-1 text-left text-orange-darken-4 bg-orange-lighten-4"
						>
							Calon Lokasi 2
						</th>
						<th
							class="px-1 text-center text-orange-darken-4 bg-orange-lighten-4"
						>
							Nilai
						</th>
						<th
							class="px-1 text-left text-orange-darken-4 bg-orange-lighten-3"
						>
							Calon Lokasi 3
						</th>
						<th
							class="px-1 text-center text-orange-darken-4 bg-orange-lighten-3"
						>
							Nilai
						</th>
						<th class="px-1 text-left">Keterangan</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in survei" :key="item.id">
						<td class="px-1">{{ item.subyek }}</td>
						<td class="px-2 text-center font-weight-bold">
							{{ item.poin }}
						</td>
						<td class="px-1">
							<v-rating
								v-model="item.lokasi_1"
								class=""
								color="orange"
								density="compact"
								@click="
									updateRating(
										item.id,
										'lokasi_1',
										item.lokasi_1
									)
								"
							>
							</v-rating>
						</td>
						<td
							class="px-1 text-center text-orange-darken-4 bg-orange-lighten-5"
						>
							{{ item.poin * item.lokasi_1 }}
						</td>
						<td class="px-1">
							<v-rating
								v-model="item.lokasi_2"
								class=""
								color="orange"
								density="compact"
								@click="
									updateRating(
										item.id,
										'lokasi_2',
										item.lokasi_2
									)
								"
							></v-rating>
						</td>
						<td
							class="px-1 text-center text-orange-darken-4 bg-orange-lighten-4"
						>
							{{ item.poin * item.lokasi_2 }}
						</td>
						<td class="px-1">
							<v-rating
								v-model="item.lokasi_3"
								class=""
								color="orange"
								density="compact"
								@click="
									updateRating(
										item.id,
										'lokasi_3',
										item.lokasi_3
									)
								"
							></v-rating>
						</td>
						<td
							class="px-1 text-center text-orange-darken-4 bg-orange-lighten-3"
						>
							{{ item.poin * item.lokasi_3 }}
						</td>
						<td class="px-1">
							{{ item.keterangan }}
						</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<th class="px-1 text-left"></th>
						<th class="px-1 text-center"></th>
						<th
							class="px-1 text-left text-orange-darken-4 bg-orange-lighten-5"
						>
							Total Poin
						</th>
						<th
							class="px-1 font-weight-black text-subtitle-1 text-center text-orange-darken-4 bg-orange-lighten-5"
						>
							{{ getTotal('lokasi_1') }}
						</th>
						<th
							class="px-1 text-left text-orange-darken-4 bg-orange-lighten-4"
						>
							Total Poin
						</th>
						<th
							class="px-1 font-weight-black text-subtitle-1 text-center text-orange-darken-4 bg-orange-lighten-4"
						>
							{{ getTotal('lokasi_2') }}
						</th>
						<th
							class="px-1 text-left text-orange-darken-4 bg-orange-lighten-3"
						>
							Total Poin
						</th>
						<th
							class="px-1 font-weight-black text-subtitle-1 text-center text-orange-darken-4 bg-orange-lighten-3"
						>
							{{ getTotal('lokasi_3') }}
						</th>
						<th class="px-1 text-center"></th>
					</tr>
				</tfoot>
			</v-table>
		</v-card-item>
	</v-card>
	<v-dialog v-model="dialogNks" max-width="600">
		<crud-nks
			:data="nks"
			@success-submit="loadData"
			@success-delete="onDeleteNks"
		/>
	</v-dialog>
	<v-dialog v-model="dialogLokasi" max-width="600">
		<crud-lokasi
			:data="nks"
			@success-submit="loadData"
			@success-delete="null"
		/>
	</v-dialog>
	<v-dialog v-model="dialogLainnya" max-width="600">
		<crud-lainnya
			:data="nks"
			@success-submit="loadData"
			@success-delete="null"
		/>
	</v-dialog>
	<!-- <pre>{{ survei }}</pre> -->
</template>
<script setup>
import apiDelete from '@/api/api-delete';
import apiGet from '@/api/api-get';
import apiUpdate from '@/api/api-update';
import { formatDateFullDay } from '@/utils/format-date';
import { bacaHijri } from '@/utils/hijri';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CrudNks from '@/components/CrudNks';
import CrudLokasi from '@/components/CrudLokasi.vue';
import CrudLainnya from '@/components/CrudLainnya.vue';

const route = useRoute();
const nksId = route.params.id;
const loading = ref(false);
const nks = ref({});
const survei = ref([]);
const dialogNks = ref(false);
const dialogLokasi = ref(false);
const dialogLainnya = ref(false);
const router = useRouter();

function onDeleteNks() {
	dialogNks.value = false;
	router.go(-1);
}

async function updateRating(id, lokasi, val) {
	const data = { [lokasi]: val };
	// console.log(data);
	const update = await apiUpdate({
		endPoint: `survei/${id}`,
		data,
		loading,
		confirm: false,
		notify: false,
	});

	if (!update) await loadData();
}

async function loadData() {
	dialogNks.value = false;
	dialogLokasi.value = false;
	dialogLainnya.value = false;
	const data = await apiGet({
		endPoint: 'survei',
		params: { nks_id: nksId },
		loading,
	});
	nks.value = data.nks;
	survei.value = data.survei;
}

async function resetSurvei() {
	const reset = await apiDelete({
		endPoint: `nks/${nksId}/reset`,
		message: 'Reset data survei?',
		loading,
	});
	if (reset) {
		await loadData();
	}
}
onMounted(async () => {
	await loadData();
});

const getTotal = (lokasi) =>
	survei.value.length > 0
		? survei.value.reduce(
				(acc, item) =>
					acc + parseInt(item[lokasi]) * parseInt(item.poin),
				0
		  )
		: 0;
</script>
<style lang=""></style>
