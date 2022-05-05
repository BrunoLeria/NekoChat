<script setup>
import { useTalkStore } from "../../services/stores/talks";
import ChatsPreview from "../../components/ChatsPreview.vue";

const talkStore = useTalkStore();
</script>
<template>
	<div
		class="
			bg-neutral-100
			p-14
			grid grid-rows-1 grid-flow-col grid-cols-3
			gap-5
			overflow-auto
		">
		<div
			v-for="(talk, index) in talkStore.talks"
			:key="index"
			class="
				bg-white
				rounded-xl
				h-full
				w-full
				min-w-full
				shadow-lg
				border-gray-200 border-2
				hover:shadow-indigo-500 hover:border-indigo-500
				ease-in-out
				duration-500
			">
			<ChatsPreview :talk="talk" />
		</div>
	</div>
</template>

<style></style>
