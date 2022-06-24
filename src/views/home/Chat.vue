<script setup>
import TextInput from "/src/components/inputs/TextInput.vue";
import Combobox from "/src/components/inputs/Combobox.vue";
import { useTalkStore } from "../../services/stores/talks";
import { useUsersStore } from "../../services/stores/users";
import { useTeamStore } from "../../services/stores/team";
import { ref, onMounted, onUpdated, computed, watch } from "vue";
import Socket from "/src/services/socket.js";

const emit = defineEmits(["update:modelValue"]);
const myMessage = ref("");
const talkStore = useTalkStore();
const userStore = useUsersStore();
const teamStore = useTeamStore();
const usedIdToTransfer = ref("");

const time = (message) => {
	const date = new Date(message.tlk_date_time);
	return date.getMinutes() < 10 ? date.getHours() + ":0" + date.getMinutes() : date.getHours() + ":" + date.getMinutes();
};

onMounted(async () => {
	await talkStore.findOneTalkByChatID().then(() => {
		if (!userStore.user.usu_is_admin && talkStore.activeChat.tlk_fk_usu_identification != userStore.user.usu_identification) {
			talkStore.updateTalkToSignInUser(userStore.user.usu_identification, true);
		}
	});
	document.getElementById("scrollContainer").scrollTo(0, document.getElementById("scrollContainer").scrollHeight);
});

onUpdated(() => {
	document.getElementById("scrollContainer").scrollTo(0, document.getElementById("scrollContainer").scrollHeight);
});

function returnToBot(assumeChat) {
	talkStore.updateTalkToSignInUser(assumeChat, true);
}

function sendMessage() {
	if (myMessage.value != "") {
		talkStore.sendMessage(myMessage.value);
		myMessage.value = "";
	}
}

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
	await talkStore.findOneTalkByChatID().then(() => {
		if (talkStore.activeChat[0].tlk_fk_usu_identification !== userStore.user.usu_identification) {
			talkStore.selected = "";
			emit("update:modelValue", "Dashboard");
		}
	});
});

watch(
	() => usedIdToTransfer.value,
	(newUser) => {
		returnToBot(newUser, true);
	}
);
</script>

<template>
	<div class="bg-neutral-100 p-14 flex flex-wrap justify-between" @keypress.enter="sendMessage()">
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
		<div class="w-full flex items-center">
			<TextInput label="Digite sua mensagem aqui" v-model="myMessage" type="text" id="myMessage" autoComplete="myMessage" class="w-full" />
			<Combobox
				v-if="userStore.user.usu_is_admin"
				:id="'usersComboBox'"
				:idInstead="true"
				class="w-56 h-12 py-2 px-2"
				:alternatives="teamStore.teamOptions"
				:backgroundColor="'bg-yellow-700 hover:bg-yellow-500 '"
				:padding="'p-1'"
				:border="'border border-transparent'"
				:focusRing="'focus:ring-transparent'"
				:focusBorder="'focus:border-transparent'"
				:textColorProp="'text-white'"
				:label="'Usuário para transferir'"
				title="Transferir para outro usuário"
				v-model="usedIdToTransfer"></Combobox>
			<div class="flex pt-5">
				<button
					v-if="userStore.user.usu_is_admin"
					type="button"
					class="
						mx-3
						flex
						justify-center
						items-center
						py-2
						px-2
						border border-transparent
						text-sm
						font-medium
						rounded-full
						text-white
						bg-red-900
						hover:bg-red-700
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
						ease-in-out
						duration-500
						w-12
						h-12
					"
					title="Retornar conversa para o robô"
					@click="returnToBot(1)">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</button>
				<button
					v-if="userStore.user.usu_is_admin"
					type="button"
					class="
						mx-3
						flex
						justify-center
						items-center
						py-2
						px-2
						border border-transparent
						text-sm
						font-medium
						rounded-full
						text-white
						bg-green-900
						hover:bg-green-700
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
						ease-in-out
						duration-500
						w-12
						h-12
					"
					title="Assumir conversa"
					@click="returnToBot(userStore.user.usu_identification)">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
					</svg>
				</button>
				<button
					type="button"
					class="
						mx-3
						flex
						justify-center
						py-2
						px-2
						border border-transparent
						text-sm
						font-medium
						rounded-full
						text-white
						bg-blue-900
						hover:bg-blue-700
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
						ease-in-out
						duration-500
						w-12
						h-12
					"
					title="Enviar mensagem"
					@click="sendMessage()">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
							clip-rule="evenodd" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style></style>
