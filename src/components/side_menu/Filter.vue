<script setup>
import { ref } from "vue";

const props = defineProps({
	search: {
		type: String,
		default: ""
	}
});
const showFilters = ref(false);
</script>
<template>
	<div class="overflow-visible">
		<div class="w-full p-5 flex items-center space-x-5">
			<input
				type="text"
				class="w-full rounded-full bg-indigo-400 text-white placeholder:text-white border-white"
				:value="search"
				@input="$emit('update:search', $event.target.value)"
				placeholder="Search" />
			<div @click="showFilters = !showFilters">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
				</svg>
			</div>
		</div>
	</div>
</template>