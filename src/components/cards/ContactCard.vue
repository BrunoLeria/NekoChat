<script setup>
import { computed } from "vue";
import moment from "moment";
import { formatPhoneNumber } from "../../utils/DataTreament";
import { useClientsStore } from "../../services/stores/clients";

const props = defineProps({
	talk: {
		type: Object
	},
	search: {
		type: String
	}
});
const clientStore = useClientsStore();

const contactName = computed(() => {
	const client = clientStore.clients.find(client => client.phone === props.talk.whatsapp_identification);
	if (client) {
		return client.name;
	}
	return formatPhoneNumber(props.talk.whatsapp_identification);
});

const dateTime = computed(() => {
	if (props.talk.created_at.includes(moment().format("YYYY-MM-DD"))) {
		return moment(props.talk.created_at).format("HH:mm");
	}
	if (props.talk.created_at.includes(moment().subtract(1, "days").format("YYYY-MM-DD"))) {
		return "Ontem";
	}
	return moment(props.talk.created_at).format("DD/MM/YYYY");
});

const waiting = computed(() => {
	return props.talk.created_at <= moment().subtract(7, "minutes").format("YYYY-MM-DD HH:mm:ss");
});

const urgent = computed(() => {
	return props.talk.created_at <= moment().subtract(15, "minutes").format("YYYY-MM-DD HH:mm:ss");
});

const show = computed(() => {
	if (!props.search) return true;
	if (props.talk.contactName.toLowerCase().includes(props.search.toLowerCase())) return true;
	if (props.talk.whatsapp_identification.toLowerCase().includes(props.search.toLowerCase())) return true;
	return false;
});
</script>

<template>
	<div class="h-20 border border-indigo-900 flex items-center p-4"
		:class="{ 'bg-yellow-600': waiting, 'bg-red-600': urgent, 'animate-pulse': urgent, 'bg-indigo-400': !urgent }" v-show='show'>
		<div class="contact-list-body-item-avatar">
			<!-- <img :src="contact.avatar" alt="" /> -->
		</div>
		<div class="contact-list-body-item-info w-full">
			<div class="flex w-full items-center justify-between">
				<span>{{ contactName }}</span>
				<span class="text-sm hidden 2xl:block">{{ dateTime }}</span>
			</div>
			<div class="h-4 overflow-hidden text-sm text-ellipsis max-w">
				<p class="w-full">{{ talk.message }}</p>
			</div>
			<span class="text-sm 2xl:hidden">{{ dateTime }}</span>
		</div>
	</div>
</template>

<style>
.max-w {
	max-width: 420px;
}
</style>