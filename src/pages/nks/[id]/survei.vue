<template lang="">
	<v-card class="ma-6" :loading="loading">
		<v-card-item class="bg-orange-accent-1"> {{ nks }} </v-card-item>
		<v-card-actions class="d-flex bg-orange-darken-4">
			<div class="text-subtitle-1 pl-3 me-auto text-orange-lighten-5">
				Data Survei
			</div>
			<v-btn
				@click="null"
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

		<v-card-item>
			<v-table class="text-orange-darken-4">
				<thead>
					<tr>
						<th class="text-left">Subyek</th>
						<th class="text-center">Poin</th>
						<th
							class="text-left text-orange-darken-4 bg-orange-lighten-5"
						>
							Calon Lokasi 1
						</th>
						<th
							class="text-center text-orange-darken-4 bg-orange-lighten-5"
						>
							Nilai
						</th>
						<th
							class="text-left text-orange-darken-4 bg-orange-lighten-4"
						>
							Calon Lokasi 2
						</th>
						<th
							class="text-center text-orange-darken-4 bg-orange-lighten-4"
						>
							Nilai
						</th>
						<th
							class="text-left text-orange-darken-4 bg-orange-lighten-3"
						>
							Calon Lokasi 3
						</th>
						<th
							class="text-center text-orange-darken-4 bg-orange-lighten-3"
						>
							Nilai
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in survei" :key="item.id">
						<td class="">{{ item.subyek }}</td>
						<td class="text-center">{{ item.poin }}</td>
						<td class="">
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
						<td class="text-center">
							{{ item.poin * item.lokasi_1 }}
						</td>
						<td class="">
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
						<td class="text-center">
							{{ item.poin * item.lokasi_2 }}
						</td>
						<td class="">
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
						<td class="text-center">
							{{ item.poin * item.lokasi_3 }}
						</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<th class="text-left"></th>
						<th class="text-center"></th>
						<th
							class="text-left text-orange-darken-4 bg-orange-lighten-5"
						>
							Total Poin
						</th>
						<th
							class="font-weight-black text-subtitle-1 text-center text-orange-darken-4 bg-orange-lighten-5"
						>
							{{ getTotal('lokasi_1') }}
						</th>
						<th
							class="text-left text-orange-darken-4 bg-orange-lighten-4"
						>
							Total Poin
						</th>
						<th
							class="font-weight-black text-subtitle-1 text-center text-orange-darken-4 bg-orange-lighten-4"
						>
							{{ getTotal('lokasi_2') }}
						</th>
						<th
							class="text-left text-orange-darken-4 bg-orange-lighten-3"
						>
							Total Poin
						</th>
						<th
							class="font-weight-black text-subtitle-1 text-center text-orange-darken-4 bg-orange-lighten-3"
						>
							{{ getTotal('lokasi_3') }}
						</th>
					</tr>
				</tfoot>
			</v-table>
		</v-card-item>
	</v-card>

	<!-- <pre>{{ survei }}</pre> -->
</template>
<script setup>
import apiDelete from '@/api/api-delete';
import apiGet from '@/api/api-get';
import apiUpdate from '@/api/api-update';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const nksId = route.params.id;
const loading = ref(false);
const nks = ref({});
const survei = ref([]);

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
	survei.value.reduce(
		(acc, item) => acc + parseInt(item[lokasi]) * parseInt(item.poin),
		0
	);
</script>
<style lang=""></style>
