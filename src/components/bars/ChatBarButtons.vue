<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useTalksStore } from "../../services/stores/talks";
import { useUsersStore } from "../../services/stores/users";
import { useTeamsStore } from "../../services/stores/teams";
import { useClientsStore } from "../../services/stores/clients";
import TextInput from "../../components/inputs/TextInput.vue";
import Combobox from "../../components/inputs/Combobox.vue";
import { removeWhatsAppKey } from "../../utils/DataTreament";
import { useTasksStore } from "../../services/stores/tasks";

const props = defineProps({
	responsable: {
		type: String,
		required: true
	}
});

const myMessage = ref("");
const talkStore = useTalksStore();
const userStore = useUsersStore();
const teamStore = useTeamsStore();
const clientStore = useClientsStore();
const taskStore = useTasksStore();
const usedIdToTransfer = ref("");
const users = ref([]);
const activeChat = talkStore.activeChat?.[0];
const hasClient = computed(() => {
	const activeChatPhone = activeChat?.whatsapp_identification;
	return !!clientStore.clients.find(client => client.phone === activeChatPhone);
});
const clientId = computed(() => {
	const activeChatPhone = activeChat?.whatsapp_identification;
	return clientStore.clients.find(client => client.phone === activeChatPhone)?.identification;
});

function sendMessage() {
	if (myMessage.value != "") {
		talkStore.createTalk(myMessage.value, activeChat.whatsapp_identification, "conversation");
		myMessage.value = "";
	}
}

function newTask() {
	if (taskStore.beginingOfTask.length === 0) {
		alert("Primeiro você precisa selecionar em qual mensagem a tarefa irá começar.");
		return;
	}

	if (!hasClient) {
		alert("Primeiro você precisa cadastrar o cliente.");
		return;
	}

	window.open("task/client/" + clientId.value + "/chat/" + taskStore.beginingOfTask, "Ratting", "width=900, height = 640, left = 480, top = 200, toolbar = 0, status = 0, ");
}

function newClient() {
	const phone_number = removeWhatsAppKey(activeChat.whatsapp_identification);
	window.open("client/task/" + phone_number, "Ratting", "width=700, height = 640, left = 480, top = 200, toolbar = 0, status = 0, ");
}

async function endTask() {
	try {
		if (taskStore.endingOfTask.length === 0) {
			alert("Primeiro você precisa selecionar em qual mensagem a tarefa irá terminar.");
			return;
		}

		if (!hasClient) {
			alert("Primeiro você precisa cadastrar o cliente.");
			return;
		}

		if (confirm("Tem certeza que deseja encerrar a conversa? Caso sim lembre de informar depois o motivo do encerramento.")) {
			const body = {
				fk_tasks_identification: true,
			}
			const response = await talkStore.updateTalksAndEndTask(taskStore.endingOfTask);
			if (response === 200) {
				alert("Tarefa encerrada com sucesso.");
			} else {
				alert("Erro ao encerrar a tarefa.");
			}
		}
	} catch (error) {
		alert("Erro ao encerrar a tarefa: " + error);
		console.log(error)
	}
}

function uploadFile(event) {
	if (event.target.files[0].size > 16777216) {
		alert("Este arquivo é muito grande. O limite é de 16MB.");
		return;
	}
	const reader = new FileReader();
	reader.readAsDataURL(event.target.files[0]);
	reader.onload = () => {
		if (reader.result.includes("data:image")) {
			talkStore.sendImage(reader.result);
		} else if (reader.result.includes("data:video")) {
			talkStore.sendVideo(reader.result);
		} else {
			let extension = event.target.files[0].name.match(/\.[0-9a-z]+$/i);
			let name = event.target.files[0].name.replace(extension, "");
			talkStore.sendDocument(reader.result, extension[0].replace(".", ""), name);
		}
	};
}

async function transferToNewUser() {
	if (usedIdToTransfer.value === "") {
		alert("Selecione um usuário para transferir a conversa.");
		return;
	}

	if (confirm("Tem certeza que deseja transferir a conversa?")) {
		const body = {
			fk_users_identification: usedIdToTransfer.value,
		}
		const response = await talkStore.updateTalkToNewUser(body);
		if (response === 200) {
			alert("Conversa transferida com sucesso.");
		} else {
			alert("Erro ao transferir a conversa.");
		}
	}
}

onBeforeMount(async () => {
	users.value = await userStore.findAllUsers();
	users.value = users.value.filter(user => user.identification !== userStore.user.identification);
});
</script>

<template>
	<div class="w-full grid grid-rows-2 grid-cols-7 xl:grid-cols-12 items-center justify-items-center">
		<TextInput label="Digite sua mensagem aqui" v-model="myMessage" type="text" id="myMessage" autoComplete="myMessage"
			class="row-start-1 col-span-5 xl:col-span-10 w-full" @keypress.enter="sendMessage()" />
		<label for="file-upload" class="
					row-start-1
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
					bg-blue-900
					hover:bg-blue-700
					ease-in-out
					duration-500
					w-10
					h-10
					2xl:w-12
					2xl:h-12
				" title="Anexar arquivo">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"
				stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round"
					d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
			</svg>
			<input id="file-upload" type="file" @change="uploadFile" style="display: none" />
		</label>
		<button type="button" class="
			row-start-1
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
					bg-blue-900
					hover:bg-blue-700
					ease-in-out
					duration-500
					w-10
					h-10
					2xl:w-12
					2xl:h-12
				" title="Enviar mensagem" @click="sendMessage()">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd"
					d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
					clip-rule="evenodd" />
			</svg>
		</button>
		<Combobox v-if="userStore.user.is_admin" :id="'usersComboBox'" :idInstead="true"
			class="grid grid-row-2 row-start-2 col-span-4 w-full" :alternatives="users"
			:backgroundColor="'bg-yellow-700 hover:bg-yellow-500 '" :padding="'p-1 2xl:p-4'"
			:border="'border border-transparent'" :focusRing="'focus:ring-transparent'"
			:focusBorder="'focus:border-transparent'" :textColorProp="'text-white'" :label="'Usuário para transferir'"
			title="Transferir para outro usuário" v-model="usedIdToTransfer"></Combobox>
		<button type="button" class="
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
					bg-blue-900
					hover:bg-blue-700
					ease-in-out
					duration-500
					w-10
					h-10
					2xl:w-12
					2xl:h-12
				" title="Enviar mensagem" @click="transferToNewUser()">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
				class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
			</svg>
		</button>
		<div class='mx-3 col-span-4 '>
			<p>Usuário responsável: {{ props.responsable }}</p>
		</div>
		<button v-if='hasClient' type="button" class="
					col-start-6
					xl:col-start-11
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
					ease-in-out
					duration-500
					w-10
					h-10
					2xl:w-12
					2xl:h-12
				" title="Adicionar nova tarefa" @click="newTask">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
				class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round"
					d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
			</svg>
		</button>
		<button v-else type="button" class="
						col-start-6
						xl:col-start-11
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
						ease-in-out
						duration-500
						w-10
					h-10
					2xl:w-12
					2xl:h-12
					" title="Adicionar novo cliente" @click="newClient">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
				class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round"
					d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
			</svg>
		</button>
		<button type="button" class="
					mx-3
					flex
					justify-centers
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
					ease-in-out
					duration-500
					w-10
					h-10
					2xl:w-12
					2xl:h-12
				" title="Encerrar conversa" @click="endTask">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"
				stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		</button>
	</div>
</template>