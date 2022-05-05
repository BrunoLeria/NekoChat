<script setup>
const props = defineProps({
	talk: {
		type: Object,
		default: () => ({})
	}
});
</script>

<template>
	<div class="flex flex-col px-5">
		<div
			v-for="(message, index) in talk"
			:key="index"
			id="mensagens"
			:class="
				message.con_from_me
					? 'bg-indigo-100 p-5 rounded-xl w-fit h-fit my-7 place-self-end'
					: 'bg-blue-100 p-5 rounFded-xl w-fit h-fit'
			">
			<div class="flex">
				<h3 :class="'text-indigo-700 break-words capitalize font-bold'">
					{{ message.con_from_me ? message.con_chat_name : "Robô" }}
				</h3>
				<p class="my-3 break-words">
					{{ message }}
				</p>
			</div>
			<p class="my-3 break-words">
				{{ message.con_messagens }}
			</p>
		</div>
	</div>
</template>