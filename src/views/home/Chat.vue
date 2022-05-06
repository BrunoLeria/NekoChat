<script setup>
import TextInput from "/src/components/inputs/TextInput.vue";
import { useTalkStore } from "../../services/stores/talks";

const talkStore = useTalkStore();
const talk = talkStore.talks[talkStore.selected];

let myMessage = "";

const time = (message) => {
	const date = new Date(message.tlk_date_time);
	return date.getMinutes() < 10
		? date.getHours() + ":0" + date.getMinutes()
		: date.getHours() + ":" + date.getMinutes();
};
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
				v-for="(message, index) in talk"
				:key="index"
				id="mensagens"
				:class="
					message.tlk_from_me === '0'
						? 'bg-indigo-100 p-5 rounded-xl w-fit h-fit my-3 place-self-end'
						: 'bg-blue-100 p-5 rounded-xl w-fit h-fit my-3'
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
				:modelValue="myMessage"
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
				@click="login()">
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
