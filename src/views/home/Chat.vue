<script setup>
import ChatBarButtons from "../../components/bars/ChatBarButtons.vue";
import { useTalkStore } from "../../services/stores/talks";
import { useUsersStore } from "../../services/stores/users";
import { useTeamStore } from "../../services/stores/team";
import { computed, onMounted, onUpdated, onBeforeMount } from 'vue';
import Socket from "../../services/socket.js";

const emit = defineEmits(["update:modelValue"]);
const talkStore = useTalkStore();
const userStore = useUsersStore();
const teamStore = useTeamStore();

const user = computed(() => userStore.user.name);

const time = (message) => {
	const date = new Date(message.created_at);
	return date.getMinutes() < 10 ? date.getHours() + ":0" + date.getMinutes() : date.getHours() + ":" + date.getMinutes();
};

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
	if (talkStore.activeChat[0].fk_users_identification == 1) return "Administrador";
	if (talkStore.activeChat[0].fk_users_identification == userStore.user.identification) return "Você";
	return teamStore.teamOptions.find((user) => user.id == talkStore.activeChat[0].fk_users_identification).name;
});

function getSource(message) {
	const source = message.match(/(http|ftp| https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/)[0].replace(" ", "");
	return source;
}

function getText(message) {
	if (message.includes("IMAGEM")) {
		return message.replace(/IMAGEM:(http|ftp| https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]) TEXTO: /, "");
	}
	if (message.includes("DOCUMENTO")) {
		return message.replace(/DOCUMENTO:(http|ftp| https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]) NOME: /, "");
	}
	return message.replace(/VIDEO:(http|ftp| https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]) TEXTO: /, "");
}

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
			<div v-for="(message, index) in talkStore.activeChat" :key="index" id="mensagens" :class="message.from_me === '1'
				? 'bg-indigo-100 p-5 rounded-xl w-fit h-fit my-3 place-self-end'
				: 'bg-blue-100 p-5 rounded-xl w-fit h-fit my-3'
				">
				<div class="flex justify-between">
					<h3 :class="'text-indigo-700 break-words capitalize font-bold'">
						{{ message.from_me === "1" ? user : "Cliente" }}
					</h3>
					<p class="ml-3">
						{{ time(message) }}
					</p>
				</div>
				<div v-if="message.message.includes('IMAGEM: ')">
					<img :src="getSource(message.message)" class="w-full h-full max-w-xs max-h-60" />
					<p v-if="getText(message.message).length > 0" class="my-3 break-all">
						{{ getText(message.message) }}
					</p>
				</div>
				<div v-else-if="message.message.includes('DOCUMENTO: ')">
					<a class="my-3 break-all" :href="getSource(message.message)">
						{{ "DOCUMENTO: " + getText(message.message) }}
					</a>
				</div>
				<div v-else-if="message.message.includes('VIDEO: ')">
					<video class="w-full h-full max-w-xs max-h-60" controls>
						<source :src="getSource(message.message)" type="video/mp4" />
						<source :src="getSource(message.message)" type="video/ogg" />
						Your browser does not support the video tag.
					</video>
					<p v-if="getText(message.message).length > 0" class="my-3 break-all">
						{{ getText(message.message) }}
					</p>
				</div>
				<p v-else class="my-3 break-all">
					{{ message.message }}
				</p>
			</div>
		</div>
		<ChatBarButtons class='row-span-1 col-span-10' :responsable='userResponsable' />
	</div>
</template>

<style></style>
