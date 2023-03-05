<script setup>
import { computed } from "vue";
import moment from "moment";

const props = defineProps({
	talk: {
		type: Object
	}
});
const contactName = computed(() => {
	const firstName = props.talk.tlk_chat_name.split(" ")[0];
	return firstName + " - (" + props.talk.chat_id + ")";
});

const dateTime = computed(() => {
	if (props.talk.tlk_date_time.includes(moment().format("YYYY-MM-DD"))) {
		return moment(props.talk.tlk_date_time).format("HH:mm");
	}
	if (props.talk.tlk_date_time.includes(moment().subtract(1, "days").format("YYYY-MM-DD"))) {
		return "Ontem";
	}
	return moment(props.talk.tlk_date_time).format("DD/MM/YYYY");
});

const waiting = computed(() => {
	return props.talk.tlk_fk_ftr_identification == 2 && !urgent;
});

const urgent = computed(() => {
	return (
		props.talk.data_ultima_resposta <= moment().subtract(15, "minutes").format("YYYY-MM-DD HH:mm:ss") &&
		(props.talk.tlk_fk_ftr_identification == 2 || props.talk.tlk_fk_ftr_identification == 3 || props.talk.tlk_fk_usu_identification != 1) &&
		props.talk.tlk_from_me != 1
	);
});
</script>

<template>
	<div
		class="h-20 border border-indigo-900 flex items-center p-4"
		:class="{ 'bg-yellow-600': waiting, 'bg-red-600': urgent, 'animate-pulse': urgent, 'bg-indigo-400': !urgent }">
		<div class="contact-list-body-item-avatar">
			<!-- <img :src="contact.avatar" alt="" /> -->
		</div>
		<div class="contact-list-body-item-info w-full">
			<div class="flex w-full items-center justify-between">
				<span>{{ contactName }}</span>
				<span class="text-sm">{{ dateTime }}</span>
			</div>
			<div class="h-4 overflow-hidden text-sm text-ellipsis max-w">
				<p class="w-full">{{ talk.tlk_message }}</p>
			</div>
		</div>
	</div>
</template>

<style>
.max-w {
	max-width: 420px;
}
</style>