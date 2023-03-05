<script setup>
import ChatButtons from "/src/components/ChatButtons.vue";
import { useTalkStore } from "../../services/stores/talks";
import { useUsersStore } from "../../services/stores/users";
import { useTeamStore } from "../../services/stores/team";
import { computed, onMounted, onUpdated } from "vue";
import Socket from "/src/services/socket.js";

const emit = defineEmits(["update:modelValue"]);
const talkStore = useTalkStore();
const userStore = useUsersStore();
const teamStore = useTeamStore();

const time = (message) => {
	const date = new Date(message.tlk_date_time);
	return date.getMinutes() < 10 ? date.getHours() + ":0" + date.getMinutes() : date.getHours() + ":" + date.getMinutes();
};

onMounted(async () => {
	await talkStore.findOneTalkByChatID();
	document.getElementById("scrollContainer").scrollTo(0, document.getElementById("scrollContainer").scrollHeight);
});

onUpdated(() => {
	document.getElementById("scrollContainer").scrollTo(0, document.getElementById("scrollContainer").scrollHeight);
});

const userResponsable = computed(() => {
	if(talkStore.activeChat[0].tlk_fk_usu_identification == 1) return "Robô";
	if(talkStore.activeChat[0].tlk_fk_usu_identification == userStore.user.usu_identification) return "Você";
	return teamStore.teamOptions.find((user) => user.id == talkStore.activeChat[0].tlk_fk_usu_identification).name;
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
// Socket.on("returnedToBot", async () => {
// 	if (userStore.user.usu_identification) {
// 		await talkStore.findOneTalkByChatID().then(() => {
// 			if (talkStore.activeChat[0].tlk_fk_usu_identification !== userStore.user.usu_identification) {
// 				talkStore.selected = "";
// 				alert("Usuário responsável pelo chat modificado.");
// 				emit("update:modelValue", "Welcome");
// 			}
// 		});
// 	}
// });
</script>

<template>
	<div class="bg-neutral-100 p-14 flex flex-wrap justify-between">
		<div>
			<p>Usuario responsável: {{userResponsable}}</p>
		</div>
		<div class="flex flex-col p-5 overflow-y-auto w-full h-4/5 bg-white rounded-xl" id="scrollContainer">
			<div
				v-for="(message, index) in talkStore.activeChat"
				:key="index"
				id="mensagens"
				:class="
					message.tlk_from_me === '1'
						? 'bg-indigo-100 p-5 rounded-xl w-fit h-fit my-3 place-self-end'
						: 'bg-blue-100 p-5 rounded-xl w-fit h-fit my-3'
				">
				<div class="flex justify-between">
					<h3 :class="'text-indigo-700 break-words capitalize font-bold'">
						{{ message.tlk_from_me === "1" ? "Robô" : message.tlk_client }}
					</h3>
					<p class="ml-3">
						{{ time(message) }}
					</p>
				</div>
				<div v-if="message.tlk_message.includes('IMAGEM: ')">
					<img :src="getSource(message.tlk_message)" class="w-full h-full max-w-xs max-h-60" />
					<p v-if="getText(message.tlk_message).length > 0" class="my-3 break-all">
						{{ getText(message.tlk_message) }}
					</p>
				</div>
				<div v-else-if="message.tlk_message.includes('DOCUMENTO: ')">
					<a class="my-3 break-all" :href="getSource(message.tlk_message)">
						{{ "DOCUMENTO: " + getText(message.tlk_message) }}
					</a>
				</div>
				<div v-else-if="message.tlk_message.includes('VIDEO: ')">
					<video class="w-full h-full max-w-xs max-h-60" controls>
						<source :src="getSource(message.tlk_message)" type="video/mp4" />
						<source :src="getSource(message.tlk_message)" type="video/ogg" />
						Your browser does not support the video tag.
					</video>
					<p v-if="getText(message.tlk_message).length > 0" class="my-3 break-all">
						{{ getText(message.tlk_message) }}
					</p>
				</div>
				<p v-else class="my-3 break-all">
					{{ message.tlk_message }}
				</p>
			</div>
		</div>
		<ChatButtons />
	</div>
</template>

<style></style>
