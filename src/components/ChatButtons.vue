<script setup>
import { ref, watch } from "vue";
import { useTalkStore } from "../services/stores/talks";
import { useUsersStore } from "../services/stores/users";
import { useTeamStore } from "../services/stores/team";
import TextInput from "/src/components/inputs/TextInput.vue";
import Combobox from "/src/components/inputs/Combobox.vue";

const myMessage = ref("");
const talkStore = useTalkStore();
const userStore = useUsersStore();
const teamStore = useTeamStore();
const usedIdToTransfer = ref("");

function returnToBot(assumeChat) {
	talkStore.updateTalkToSignInUser(assumeChat, true);
	if (assumeChat == "1") {
		talkStore.updateRobot(true);
	} else {
		if(talkStore.activeChat[0].tlk_fk_usu_identification == 1)talkStore.updateRobot(false);
	}
}

function sendMessage() {
	if (myMessage.value != "") {
		talkStore.sendMessage(myMessage.value);
		myMessage.value = "";
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

watch(
	() => usedIdToTransfer.value,
	(newUser) => {
		returnToBot(parseInt(newUser), true);
	}
);
</script>

<template>
	<div class="w-full flex items-center">
		<TextInput
			label="Digite sua mensagem aqui"
			v-model="myMessage"
			type="text"
			id="myMessage"
			autoComplete="myMessage"
			class="w-full"
			@keypress.enter="sendMessage()" />
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
			<label
				for="file-upload"
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
					ease-in-out
					duration-500
					w-12
					h-12
				"
				title="Anexar arquivo">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
				</svg>
				<input id="file-upload" type="file" @change="uploadFile" style="display: none" />
			</label>
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
</template>