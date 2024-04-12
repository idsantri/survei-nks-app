<template lang="">
	<v-card class="ma-6 mx-auto" :loading="loading" max-width="1200">
		<v-card-title
			class="text-orange-darken-4 bg-orange-lighten-4 d-flex align-center"
		>
			<div class="me-auto">Subyek Survei NKS</div>

			<v-btn
				class="mx-2 my-1 text-none"
				color="orange-darken-2"
				variant="outlined"
				@click="addMaster"
			>
				Baru
				<v-icon icon="mdi-plus" size="25"></v-icon>
			</v-btn>
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
		</v-card-title>
		<v-card-item>
			<v-table density="compact" class="table-dense text-orange-darken-4">
				<thead>
					<tr>
						<th class="px-2 text-center">Urut</th>
						<th class="px-2">Subyek</th>
						<th class="px-2 text-center">Poin</th>
						<th class="px-2">Keterangan</th>
						<th class="px-2 text-center">Edit</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(m, i) in master" :key="i">
						<td class="px-2 text-center">
							{{ m.urut }}
						</td>
						<td class="px-2">
							{{ m.subyek }}
						</td>
						<td class="px-2 text-center font-weight-bold">
							{{ m.poin }}
						</td>
						<td class="px-2">
							{{ m.keterangan }}
						</td>
						<td class="px-2 text-center">
							<v-btn
								class="mx-2 my-1"
								color="orange-darken-2"
								variant="outlined"
								:loading="loading"
								@click="editMaster(m)"
							>
								<v-icon icon="mdi-pencil" size="25"></v-icon>
							</v-btn>
						</td>
					</tr>
				</tbody>
			</v-table>
		</v-card-item>
	</v-card>
	<v-dialog v-model="dialogMaster" max-width="600">
		<crud-master
			:data="masterObj"
			@success-submit="loadData"
			@success-delete="loadData"
		/>
	</v-dialog>
	<!-- <pre>{{ master }}</pre> -->
</template>
<script setup>
import { ref, onMounted } from 'vue';
import apiGet from '@/api/api-get';
import CrudMaster from '@/components/CrudMaster.vue';

const loading = ref(false);
const master = ref([{}]);
const newInput = ref({});
const dialogMaster = ref(false);
const masterObj = ref({});

function addMaster() {
	masterObj.value = {};
	dialogMaster.value = true;
}

function editMaster(val) {
	masterObj.value = val;
	dialogMaster.value = true;
}

async function loadData() {
	dialogMaster.value = false;
	const data = await apiGet({
		endPoint: 'master',
		loading,
	});
	master.value = data.master;
}

onMounted(async () => {
	await loadData();
});
</script>
<style lang="scss" scoped></style>
