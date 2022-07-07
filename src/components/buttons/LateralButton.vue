<script setup>
import { defineProps } from "vue";

defineProps({
	title: {
		type: String,
		default: "",
		required: true
	},
	subtitle: {
		type: String,
		default: "",
		required: true
	},
	link: {
		type: String,
		default: "",
		required: true
	},
	icon: {
		type: String,
		default: "",
		required: true
	}
});
</script>

<template>
	<div class="p-4 flex items hover:bg-blue-900 ease-in-out duration-500">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
		</svg>
		<h4 class="ml-4 text-center"></h4>
	</div>
</template>
     