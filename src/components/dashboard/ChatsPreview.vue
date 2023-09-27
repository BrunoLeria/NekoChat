<script setup>
import { computed } from "vue";
import { useUsersStore } from "../../services/stores/users";

const usersStore = useUsersStore();
const user = computed(() => usersStore.user.name);

const props = defineProps({
	talk: {
		type: Object,
		default: () => ({})
	}
});

const time = (message) => {
	const date = new Date(message.created_at);
	return date.getMinutes() < 10 ? date.getHours() + ":0" + date.getMinutes() : date.getHours() + ":" + date.getMinutes();
};

function trataMensagem(message) {
	if (message.includes("IMAGEM")) {
		return (
			"{Imagem disponível na conversa completa} \n" +
			message.replace(/IMAGEM:(http|ftp| https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]) TEXTO: /, "")
		);
	}
	if (message.includes("DOCUMENTO")) {
		return (
			"{Documento disponível na conversa completa} \n" +
			message.replace(/DOCUMENTO:(http|ftp| https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]) NOME: /, "")
		);
	}
	if (message.includes("VIDEO")) {
		return (
			"{Vídeo disponível na conversa completa} \n" +
			message.replace(/VIDEO:(http|ftp| https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]) TEXTO: /, "")
		);
	}
	return message;
}

const messages = computed(() => {
	if (props.talk[1] && props.talk[0].created_at > props.talk[1].created_at) return props.talk.reverse();
	return props.talk;
});
</script>

<template>
	<div class="flex flex-col p-5">
		<div
			v-for="(message, index) in messages"
			:key="index"
			id="mensagens"
			:class="
				message.from_me === '1'
					? 'bg-blue-100 p-5 rounded-xl w-fit h-fit my-3 place-self-end'
					: 'bg-indigo-100 p-5 rounded-xl w-fit h-fit my-3'
			">
			<div class="flex justify-between">
				<h3 :class="'text-indigo-700 break-words capitalize font-bold'">
					{{ message.from_me === "1" ? user : "Cliente" }}
				</h3>
				<p class="ml-3">
					{{ time(message) }}
				</p>
			</div>
			<p class="my-3 break-all">
				{{ trataMensagem(message.message) }}
			</p>
		</div>
	</div>
</template>