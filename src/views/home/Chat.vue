<script setup>
import ChatBarButtons from "../../components/bars/ChatBarButtons.vue";
import { useTalkStore } from "../../services/stores/talks";
import { useUsersStore } from "../../services/stores/users";
import { useTeamStore } from "../../services/stores/team";
import { computed, onMounted, onUpdated, onBeforeMount } from 'vue';
import Socket from "../../services/socket.js";
import MessageCard from "../../components/cards/MessageCard.vue";

const emit = defineEmits(["update:modelValue"]);
const talkStore = useTalkStore();
const userStore = useUsersStore();
const teamStore = useTeamStore();

const user = computed(() => userStore.user.name);

onBeforeMount(async () => {
	await talkStore.findOneTalkByChatID();
});

onMounted(async () => {
	document.getElementById("scrollContainer").scrollTo(0, document.getElementById("scrollContainer").scrollHeight);
});

onUpdated(() => {
	document.getElementById("scrollContainer").scrollTo(0, document.getElementById("scrollContainer").scrollHeight);
});

const userResponsable = computed(() => {
	if (talkStore.activeChat && talkStore.activeChat.length > 0) {
		if (talkStore.activeChat[0].fk_users_identification == 1) return "Administrador";
		if (talkStore.activeChat[0].fk_users_identification == userStore.user.identification) return "Você";
		return teamStore.teamOptions.find((user) => user.id == talkStore.activeChat[0].fk_users_identification).name;
	}
	return "";
});

//WebSocket chenges to the dashboard and the selected talk
Socket.on("returnedToBot", async () => {
	if (userStore.user.identification) {
		await talkStore.findOneTalkByChatID().then(() => {
			if (talkStore.activeChat[0].fk_users_identification !== userStore.user.identification) {
				talkStore.selected = "";
				alert("Usuário responsável pelo chat modificado.");
				emit("update:modelValue", "Welcome");
			}
		});
	}
});
</script>

<template>
	<div class="bg-neutral-100 p-14 grid grid-cols-10 grid-rows-6 justify-between">
		<div class="flex flex-col my-5 p-5 overflow-y-auto  bg-white rounded-xl col-span-10 row-span-5"
			id="scrollContainer">
			<div v-for="(message, index) in talkStore.activeChat">
				<MessageCard :key="index" :message="message" :user="message.from_me === '1' ? user : 'Cliente'"
					:index="index" />
			</div>
		</div>
		<ChatBarButtons class='row-span-1 col-span-10' :responsable='userResponsable' />
	</div>
</template>

<style></style>
