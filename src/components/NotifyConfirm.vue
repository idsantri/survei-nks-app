<template>
	<v-dialog v-model="show" width="auto" persistent="">
		<v-card min-width="300" max-width="400" title="Konfirmasi!">
			<v-card-text class="">
				<span v-html="message"></span>
			</v-card-text>
			<template v-slot:actions>
				<v-btn class="ms-auto" text="Tidak" @click="onNo"></v-btn>
				<v-btn class="ms-auto" text="Ya" @click="onYes"></v-btn>
			</template>
		</v-card>
	</v-dialog>
</template>

<script setup>
import useStore from '@/stores/confirm'; // Sesuaikan path sesuai lokasi file
import { toRefs } from 'vue';
const store = useStore();
const { show, message } = toRefs(store);

function onNo() {
	store.cancel();
}

function onYes() {
	store.confirm();
}
</script>
