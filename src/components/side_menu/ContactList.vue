<script setup>
import { ref, computed } from 'vue';
import { useTalksStore } from "../../services/stores/talks";
import ContactCard from "../cards/ContactCard.vue";
import Filter from "./Filter.vue";
import { useRouter } from "vue-router";
import _ from "lodash";
import socket from '../../services/socket';

const emit = defineEmits(["update:modelValue"]);
const talkStore = useTalksStore();
const search = ref("");
const router = useRouter();

const selectTalk = async (talk) => {
	talkStore.selected = talk.whatsapp_identification;
	await talkStore.findOneTalkByChatID();
	router.push({ name: "Chat" });
};

const response = ref({});
response.value = await talkStore.fetchContactList();

const contactList = computed(() => {
	return _.orderBy(response.value, ["created_at"], ["desc"]);
});

socket.on("talks", async () => {
	response.value = await talkStore.fetchContactList();
});
</script>

<template>
	<div class="text-white text-xl flex flex-col flex-1 content-start overflow-y-auto">
		<div class="contact-list-header">
			<Filter v-model:search="search" />
		</div>
		<div class="overflow-y-auto h-full">
			<div v-for="(talk, index) in contactList">
				<ContactCard :key="index" @click="selectTalk(talk)" :talk="talk" />
			</div>
		</div>
	</div>
</template>