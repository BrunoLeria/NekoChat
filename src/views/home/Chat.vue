<script setup>
import TextInput from "/src/components/inputs/TextInput.vue";
import { useTalkStore } from "../../services/stores/talks";
import { ref } from "vue";

const talkStore = useTalkStore();

const myMessage = ref("");

const time = (message) => {
	const date = new Date(message.tlk_date_time);
	return date.getMinutes() < 10
		? date.getHours() + ":0" + date.getMinutes()
		: date.getHours() + ":" + date.getMinutes();
};

function sendMessage() {
	if (myMessage.value != "") {
		const urlSendMessage =
			"https://api.chat-api.com/instance14140/sendMessage?token=sxefyjuyqkf60mtn";
		const urlRecordMessage = "http://localhost:3005/createTalk";
		fetch(urlSendMessage, {
			body:
				"body=" +
				myMessage.value +
				"&phone=" +
				talkStore.selected.replace("@c.us", ""),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: "post"
		})
			.then((response) => {
				fetch(urlRecordMessage, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						tlk_message: myMessage.value,
						tlk_fk_usu_identification: 1,
						tlk_client:
							talkStore.talks[talkStore.selected][0].tlk_client,
						tlk_chat_id:
							talkStore.talks[talkStore.selected][0].tlk_chat_id,
						tlk_chat_name:
							talkStore.talks[talkStore.selected][0]
								.tlk_chat_name,
						tlk_from_me: true
					})
				})
					.then((response) => response.json())
					.then((data) => {
						console.log("Success:", data);
					})
					.catch((error) => {
						console.error("Error:", error);
					});
			})
			.catch((error) => {
				console.log(error);
			});
	}
}
</script>

<template>
	<div class="bg-neutral-100 p-14 flex flex-wrap justify-between">
		<div
			class="
				flex flex-col
				p-5
				overflow-y-auto
				w-full
				h-4/5
				bg-white
				rounded-xl
			">
			<div
				v-for="(message, index) in talkStore.talks[talkStore.selected]"
				:key="index"
				id="mensagens"
				:class="
					message.tlk_from_me === '0'
						? 'bg-blue-100 p-5 rounded-xl w-fit h-fit my-3'
						: 'bg-indigo-100 p-5 rounded-xl w-fit h-fit my-3 place-self-end'
				">
				<div class="flex justify-between">
					<h3
						:class="'text-indigo-700 break-words capitalize font-bold'">
						{{
							message.tlk_from_me === "0"
								? message.tlk_chat_name
								: "Robô"
						}}
					</h3>
					<p class="ml-3">
						{{ time(message) }}
					</p>
				</div>
				<p class="my-3 break-all">
					{{ message.tlk_message }}
				</p>
			</div>
		</div>
		<div class="w-full flex items-center">
			<TextInput
				label="Digite sua mensagem aqui"
				v-model="myMessage"
				type="text"
				id="myMessage"
				autoComplete="myMessage"
				class="w-full" />
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
					focus:outline-none
					focus:ring-2
					focus:ring-offset-2
					focus:ring-blue-500
					ease-in-out
					duration-500
					w-12
					h-12
				"
				@click="sendMessage()">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-7 w-7"
					viewBox="0 0 20 20"
					fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
						clip-rule="evenodd" />
				</svg>
			</button>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style></style>
