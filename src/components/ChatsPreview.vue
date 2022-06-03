<script setup>
import { onMounted, onUpdated } from "vue";
const props = defineProps({
	talk: {
		type: Object,
		default: () => ({})
	}
});

const time = (message) => {
	const date = new Date(message.tlk_date_time);
	return date.getMinutes() < 10 ? date.getHours() + ":0" + date.getMinutes() : date.getHours() + ":" + date.getMinutes();
};

onMounted(() => {
	document.querySelector("#scrollContainer").scrollTo(0, document.querySelector("#scrollContainer").scrollHeight);
});

onUpdated(() => {
	document.querySelector("#scrollContainer").scrollTo(0, document.querySelector("#scrollContainer").scrollHeight);
});
</script>

<template>
	<div class="flex flex-col p-5" id="scrollContainer">
		<div
			v-for="(message, index) in talk"
			:key="index"
			id="mensagens"
			:class="
				message.tlk_from_me === '1'
					? 'bg-blue-100 p-5 rounded-xl w-fit h-fit my-3 place-self-end'
					: 'bg-indigo-100 p-5 rounded-xl w-fit h-fit my-3'
			">
			<div class="flex justify-between">
				<h3 :class="'text-indigo-700 break-words capitalize font-bold'">
					{{ message.tlk_from_me === "1" ? "Robô" : message.tlk_client }}
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
</template>