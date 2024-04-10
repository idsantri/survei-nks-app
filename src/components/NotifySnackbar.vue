<template>
	<v-snackbar v-model="snackbar.show" :timeout="3000" :color="snackbar.type">
		<span class="text-white">
			{{ snackbar.message }}
		</span>
	</v-snackbar>
</template>

<script>
import useStore from '@/stores/snackbar'; // Sesuaikan path sesuai lokasi file

export default {
	setup() {
		const store = useStore();
		return {
			snackbar: store.snackbar,
		};
	},
};
</script>
