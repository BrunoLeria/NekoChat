<script setup>
import { ref, computed } from "vue";
import { useTalkStore } from "../../services/stores/talks";
import ContactCard from "./ContactCard.vue";
import Filter from "./Filter.vue";

const emit = defineEmits(["update:modelValue"]);
const talkStore = useTalkStore();
const search = ref("");
const filter = ref(["onlyMine", "waiting", "open", "closed", "onlyTheirs"]);

const selectTalk = (talk) => {
	talkStore.selected = talk.tlk_chat_id;
	emit("update:modelValue", "Chat");
};

const searchContact = computed(() => {
	return Object.values(talkStore.talks).filter((talk) => {
		if (/^\d+$/.test(search.value.replace(" ", "").replace("-", ""))) {
			return talk.tlk_chat_id.includes(search.value);
		}
		if (talk.tlk_chat_name == undefined) {
			return false;
		}
		return talk.tlk_chat_name.toLowerCase().includes(search.value.toLowerCase());
	});
});
const filteredContact = computed(() => {
	return searchContact.value.filter((talk) => {
		if (filter.value.includes("showAll")) {
			return true;
		}
		if (filter.value.includes("onlyMine") && talk.tlk_user_id == talkStore.user.uid && talk.tlk_fk_cpn_identification == 3) {
			return true;
		}
		if (filter.value.includes("waiting")  && talk.tlk_fk_cpn_identification == 2) {
			return true;
		}
		if (filter.value.includes("open")  && talk.tlk_fk_cpn_identification == 1) {
			return true;
		}
		if (filter.value.includes("closed")  && talk.tlk_fk_cpn_identification == 4) {
			return true;
		}
		if (filter.value.includes("onlyTheirs") && talk.tlk_user_id != talkStore.user.uid  && talk.tlk_fk_cpn_identification == 3) {
			return true;
		}
		return false;
	});
});
</script>

<template>
	<div class="text-white text-xl flex flex-col flex-1 content-start overflow-y-auto">
		<div class="contact-list-header">
			<Filter v-model:search="search" v-model:selected="filter" />
		</div>
		<div class="overflow-y-auto h-full">
			<ContactCard v-for="(talk, index) in searchContact" :key="index" @click="selectTalk(talk)" :talk="talk" />
		</div>
	</div>
</template>