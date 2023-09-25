<script setup>
import { ref, computed } from "vue";
import { useTalkStore } from "../../services/stores/talks";
import ContactCard from "./ContactCard.vue";
import Filter from "./Filter.vue";

const emit = defineEmits(["update:modelValue"]);
const talkStore = useTalkStore();
const search = ref("");

const selectTalk = async (talk) => {
	emit("update:modelValue", "Loading");
	talkStore.selected = talk.whatsapp_identification;
	await talkStore.findOneTalkByChatID().then(emit("update:modelValue", "Chat"));
};

const searchContact = computed(() => {
	return Object.values(talkStore.talks).filter((talk) => {
		if (/^\d+$/.test(search.value.replace(" ", "").replace("-", ""))) {
			return talk.whatsapp_identification.includes(search.value);
		}
		return talk.whatsapp_identification
	});
});

console.log(searchContact, talkStore.talks);
</script>

<template>
	<div class="text-white text-xl flex flex-col flex-1 content-start overflow-y-auto">
		<div class="contact-list-header">
			<Filter v-model:search="search" />
		</div>
		<div class="overflow-y-auto h-full">
			<div v-for="(talk, index) in searchContact">
				<ContactCard  :key="index" @click="selectTalk(talk)" :talk="talk" />
			</div>
		</div>
	</div>
</template>