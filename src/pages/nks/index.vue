<template>
	<v-card class="mx-auto ma-6" max-width="600" :loading="loading">
		<v-card-actions class="d-flex bg-orange-accent-1 text-orange-darken-4">
			<div class="text-subtitle-1 pl-3 me-auto">Daftar NKS</div>
			<v-btn
				class="mx-2 my-1 text-none"
				color="orange-darken-2"
				variant="outlined"
				@click="loadData"
			>
				<v-icon icon="mdi-sync" size="25"></v-icon>
			</v-btn>
			<v-btn @click="newNks" variant="elevated" color="orange-darken-4">
				Baru
			</v-btn>
		</v-card-actions>

		<v-card-item class="pa-2">
			<div v-if="nks.length == 0">
				<v-alert class="text-red text-center"
					>Tidak ada data untuk ditampilkan. <br />
					Silakan buat data!
				</v-alert>
			</div>
			<v-list
				v-else
				border
				rounded
				class="bg-amber-lighten-5 text-orange-darken-4"
			>
				<v-list-item v-for="(n, index) in nks" :key="index">
					<v-list-item-title>
						{{ n.nama }}

						<span> </span>
					</v-list-item-title>

					<v-list-item-subtitle class="font-italic">
						{{ formatDateFullDay(n.tanggal_nks_m) }}
						|
						{{ bacaHijri(n.tanggal_nks_h) }}
					</v-list-item-subtitle>
					<template v-slot:append>
						<v-btn
							@click="editNks(n)"
							color="orange-darken-4"
							variant=""
							icon="mdi-pencil"
							class="me-3"
						>
						</v-btn>
						<v-btn
							:to="`/nks/${n.id}/survei`"
							icon="mdi-arrow-right-bold-circle"
							variant="outlined"
							color="orange-lighten-2"
							title="Mulai survei"
							class="bg-orange-lighten-4"
						>
							<v-icon
								icon="mdi-arrow-right-bold-circle"
								size="35"
								color="orange-darken-3"
							></v-icon>
						</v-btn>
					</template>
					<v-divider></v-divider>
				</v-list-item>
			</v-list>
		</v-card-item>
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
import { formatDateFullDay } from '@/utils/format-date';
import { bacaHijri } from '@/utils/hijri';

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
	// nks.value = [];
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
