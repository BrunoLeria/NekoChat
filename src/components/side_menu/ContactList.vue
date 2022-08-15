<script setup>
import { ref, computed } from "vue";
import { useTalkStore } from "../../services/stores/talks";
import { useUserStore } from "../../services/stores/users";
import { useFiltersStore } from "../../services/stores/filters";
import ContactCard from "./ContactCard.vue";
import Filter from "./Filter.vue";

const emit = defineEmits(["update:modelValue"]);
const talkStore = useTalkStore();
const usersStore = useUserStore();
const search = ref("");
const filters = useFiltersStore();

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
	const aux = searchContact.value.filter((talk) => {
		if (filters.selected.includes("showAll")) {
			return true;
		}
		if (filters.selected.includes("onlyMine") && talk.tlk_fk_usu_identification == talkStore.user.id) {
			return true;
		}
		if (filters.selected.includes("waiting") && talk.tlk_fk_cpn_identification == 2) {
			return true;
		}
		if (filters.selected.includes("open") && talk.tlk_fk_cpn_identification == 1) {
			return true;
		}
		if (filters.selected.includes("closed") && talk.tlk_fk_cpn_identification == 4) {
			return true;
		}
		if (filters.selected.includes("onlyTheirs") && talk.tlk_user_id != talkStore.user.uid) {
			return true;
		}
		return false;
	});
	console.log(aux);
	return aux;
});
</script>

<template>
	<div class="text-white text-xl flex flex-col flex-1 content-start overflow-y-auto">
		<div class="contact-list-header">
			<Filter v-model:search="search" />
		</div>
		<div class="overflow-y-auto h-full">
			<ContactCard v-for="(talk, index) in filteredContact" :key="index" @click="selectTalk(talk)" :talk="talk" />
		</div>
	</div>
</template>