<script setup>
import { useTeamStore } from "../../services/stores/team";
import { useUsersStore } from "../../services/stores/users";
import { useStatusesStore } from "../../services/stores/status";
import { onBeforeMount, ref } from 'vue';
import UserCard from "../../components/cards/UserCard.vue";

const teamStore = useTeamStore();
const userStore = useUsersStore();
const emit = defineEmits(["update:modelValue"]);
const statuses = useStatusesStore().statuses;
const users = ref([]);
const teams = useTeamStore().teams;



onBeforeMount(async () => {
	users.value = await userStore.findAllUsers();
});

</script>
<template>
	<div class="bg-neutral-100 p-14 grid grid-cols-3 gap-5">
		<UserCard v-for="user in users" :key="user.identification" :member="user" :teams='teams' :statuses='statuses' />
	</div>
</template>