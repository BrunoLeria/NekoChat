<script setup>
import ChatBarButtons from "../../components/bars/ChatBarButtons.vue";
import { useClientsStore } from "../../services/stores/clients";
import { useTalksStore } from "../../services/stores/talks";
import { useUsersStore } from "../../services/stores/users";
import { Suspense, computed, onMounted, onUpdated, ref } from 'vue';
import Socket from "../../services/socket.js";
import MessageCard from "../../components/cards/MessageCard.vue";

const emit = defineEmits(["update:modelValue"]);
const talkStore = useTalksStore();
const userStore = useUsersStore();
const clientStore = useClientsStore();
const scrollContainer = ref(null);

const user = computed(() => userStore.user.name);
await talkStore.findOneTalkByChatID();

onMounted(() => {
	scrollContainer.value.scrollTo(0, scrollContainer.value.scrollHeight);
});

onUpdated(() => {
	scrollContainer.value.scrollTo(0, scrollContainer.value.scrollHeight);
});

const contactName = computed(() => {
	const client = clientStore.clients.find(client => client.phone === talkStore.activeChat[0].whatsapp_identification);
	if (client) {
		return client.name;
	}
	return formatPhoneNumber(talkStore.activeChat[0].whatsapp_identification);
});

Socket.on("talks", async () => {
	await talkStore.findOneTalkByChatID();
});
</script>

<template>
	<div class="bg-neutral-100 p-6 2xl:p-14 grid grid-cols-10 grid-rows-6 justify-between">
		<div class="flex flex-col my-5 p-5 overflow-y-auto bg-white rounded-xl col-span-10 row-span-5" id="scrollContainer"
			ref="scrollContainer">
			<MessageCard v-for="(message, index) in talkStore.activeChat" :key="index" :message="message"
				:user="message.from_me === true ? user : contactName" :index="index" />
		</div>
		<Suspense>
			<ChatBarButtons class='row-span-1 col-span-10' :responsable='talkStore.activeChat[0].fk_users_identification' />
		</Suspense>
	</div>
</template>

<style></style>
