<script setup>
import { useTalkStore } from "../../services/stores/talks";
import ChatsPreview from "../../components/ChatsPreview.vue";
const emit = defineEmits(["update:modelValue"]);
const talkStore = useTalkStore();

const selectTalk = (talk) => {
	talkStore.selected = talk[0].tlk_chat_id;
	emit("update:modelValue", "Chat");
};
</script>
<template>
	<div class="bg-neutral-100 p-14 flex gap-5">
		<div
			v-for="(talk, index) in talkStore.talks"
			:key="index"
			class="
				bg-white
				rounded-xl
				h-full
				min-w-[33%]
				shadow-lg
				border-gray-200 border-2
				hover:shadow-indigo-500 hover:border-indigo-500
				ease-in-out
				duration-500
				overflow-x-auto
			"
			@click="selectTalk(talk)">
			<ChatsPreview :talk="talk" />
		</div>
	</div>
</template>

<style></style>
