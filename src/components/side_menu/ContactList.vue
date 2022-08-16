<script setup>
import { ref, computed } from "vue";
import { useTalkStore } from "../../services/stores/talks";
import ContactCard from "./ContactCard.vue";

const emit = defineEmits(["update:modelValue"]);
const talkStore = useTalkStore();
const search = ref("");

const selectTalk = async (talk) => {
	emit("update:modelValue", "Loading");
	talkStore.selected = talk.tlk_chat_id;
	await talkStore.findOneTalkByChatID().then(emit("update:modelValue", "Chat"));
};

const searchContact = computed(() => {
	return Object.values(talkStore.talks).filter((talk) => {
		if (/^\d+$/.test(search.value.replace(" ", "").replace("-", ""))) {
			return talk.tlk_chat_id.includes(search.value);
		}
		return talk.tlk_chat_name.toLowerCase().includes(search.value.toLowerCase());
	});
});
</script>

<template>
	<div class="text-white text-xl flex flex-col flex-1 content-start overflow-y-auto">
		<div class="contact-list-header">
			<div class="w-full p-5">
				<input
					type="text"
					class="w-full rounded-full bg-indigo-400 text-white placeholder:text-white border-white"
					v-model="search"
					placeholder="Search" />
			</div>
		</div>
		<div class="overflow-y-auto h-full">
			<ContactCard v-for="(talk, index) in searchContact" :key="index" @click="selectTalk(talk)" :talk="talk" />
		</div>
	</div>
</template>