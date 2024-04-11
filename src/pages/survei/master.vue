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
			<v-table density="compact">
				<thead>
					<tr>
						<th class="text-center">Urut</th>
						<th class="ps-8">Subyek</th>
						<th class="text-center">Poin</th>
						<th class="text-center">!</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(m, i) in master" :key="i">
						<td style="width: 80px">
							<v-text-field
								density="compact"
								hide-details
								:loading="loading"
								v-model="m.urut"
								variant="outlined"
								class="input-center pa-0"
							/>
						</td>
						<td>
							<v-text-field
								density="compact"
								hide-details
								:loading="loading"
								v-model="m.subyek"
								variant="outlined"
								class="pa-0"
							/>
						</td>
						<td style="width: 80px">
							<v-text-field
								density="compact"
								hide-details
								:loading="loading"
								v-model="m.poin"
								variant="outlined"
								class="input-center pa-0"
							/>
						</td>
						<td class="text-center" style="width: 200px">
							<v-btn
								class="mx-2 my-1"
								color="orange-darken-2"
								variant="outlined"
								:loading="loading"
								@click="onUpdateItem(m)"
							>
								<v-icon
									icon="mdi-content-save"
									size="25"
								></v-icon>
							</v-btn>
							<v-btn
								class="mx-2 my-1"
								color="red"
								variant="outlined"
								:loading="loading"
								@click="onDeleteItem(m.id)"
							>
								<v-icon icon="mdi-delete" size="25"></v-icon>
							</v-btn>
						</td>
					</tr>
					<tr>
						<td style="width: 80px">
							<v-text-field
								density="compact"
								hide-details
								:loading="loading"
								v-model="newInput.urut"
								variant="outlined"
								class="input-center pa-0"
							/>
						</td>
						<td>
							<v-text-field
								density="compact"
								hide-details
								:loading="loading"
								v-model="newInput.subyek"
								variant="outlined"
								class="pa-0"
								required
							/>
						</td>
						<td style="width: 80px">
							<v-text-field
								density="compact"
								hide-details
								:loading="loading"
								v-model="newInput.poin"
								variant="outlined"
								class="input-center pa-0"
							/>
						</td>
						<td class="text-center" style="width: 200px">
							<v-btn
								class="mx-2 my-1"
								color="orange-darken-2"
								variant="outlined"
								:loading="loading"
								@click="onNewInput"
							>
								<v-icon
									icon="mdi-content-save"
									size="25"
								></v-icon>
							</v-btn>
							<v-btn
								class="mx-2 my-1"
								color="red"
								variant="outlined"
								:loading="loading"
								disabled
							>
								<v-icon icon="mdi-delete" size="25"></v-icon>
							</v-btn>
						</td>
					</tr>
				</tbody>
			</v-table>
		</v-card-item>
	</v-card>
	<!-- <pre>{{ master }}</pre> -->
</template>
<script setup>
import { ref, onMounted } from 'vue';
import apiGet from '@/api/api-get';
import { notifyError } from '@/utils/notify';
import apiPost from '@/api/api-post';
import apiUpdate from '@/api/api-update';
import apiDelete from '@/api/api-delete';

const loading = ref(false);
const master = ref([{}]);
const newInput = ref({});

async function loadData() {
	const data = await apiGet({
		endPoint: 'master',
		loading,
	});
	master.value = data.master;
}

onMounted(async () => {
	await loadData();
});

async function onNewInput() {
	const data = JSON.parse(JSON.stringify(newInput.value));
	// console.log(data);
	if (!data.subyek || !data.poin) {
		notifyError('Subyek dan poin diperlukan!');
		return;
	}

	const post = await apiPost({ endPoint: 'master', loading, data });
	if (post) {
		await loadData();
		newInput.value = {};
	}
}

async function onUpdateItem(master) {
	const data = JSON.parse(JSON.stringify(master));
	// console.log(master);
	// return;
	if (!data.subyek || !data.poin) {
		notifyError('Subyek dan poin diperlukan!');
		return;
	}
	delete data.id;
	await apiUpdate({
		endPoint: `master/${master.id}`,
		loading,
		data,
		confirm: false,
		notify: false,
	});
}

async function onDeleteItem(id) {
	const del = await apiDelete({ endPoint: `master/${id}`, loading });
	if (del) {
		const temp = master.value.filter((obj) => obj.id !== id);
		master.value = temp;
	}
}
</script>
<style lang="scss" scoped></style>
