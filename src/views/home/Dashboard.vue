<script setup>
import { useTalkStore } from "../../services/stores/talks";
import ChatsPreview from "../../components/ChatsPreview.vue";
import { onMounted, onUpdated } from "vue";

const emit = defineEmits(["update:modelValue"]);
const talkStore = useTalkStore();

const selectTalk = (talk) => {
	talkStore.selected = talk[0].tlk_chat_id;
	emit("update:modelValue", "Chat");
};

onMounted(() => {
	Object.keys(talkStore.talks).forEach((key) => {
		document.getElementById(key).scrollTo(0, document.getElementById(key).scrollHeight);
	});
});

onUpdated(() => {
	Object.keys(talkStore.talks).forEach((key) => {
		document.getElementById(key).scrollTo(0, document.getElementById(key).scrollHeight);
	});
});

function nomedoCliente(talk) {
	const last = talk.length - 1;
	const firstName = talk[last].tlk_chat_name.split(" ")[0];
	return firstName + " - (" + talk[last].tlk_chat_id + ")";
}
</script>
<template>
	<div class="bg-neutral-100 p-14 flex gap-5">
		<div v-for="(talk, index) in talkStore.talks" class="min-w-[33%]" :key="index" @click="selectTalk(talk)">
			<div class="w-full h-[10%] flex justify-center items-center bg-indigo-100 text-indigo-700 text-2xl font-bold rounded-t-xl">
				{{ nomedoCliente(talk) }}
			</div>
			<ChatsPreview
				:id="index"
				class="
					bg-white
					rounded-b-xl
					h-[90%]
					shadow-lg
					border-gray-200 border-2
					hover:shadow-indigo-500 hover:border-indigo-500
					ease-in-out
					duration-500
					overflow-x-auto
				"
				:talk="talk" />
		</div>
	</div>
</template>

<style></style>
