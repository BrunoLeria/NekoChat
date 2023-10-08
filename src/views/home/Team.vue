<script setup>
import { useTeamStore } from "../../services/stores/team";
import { useUsersStore } from "../../services/stores/users";
import { useStatusesStore } from "../../services/stores/status";
import { onBeforeMount, ref } from 'vue';
import UserCard from "../../components/cards/UserCard.vue";
import TeamCard from "../../components/cards/TeamCard.vue";

const teamStore = useTeamStore();
const userStore = useUsersStore();
const emit = defineEmits(["update:modelValue"]);
const statuses = useStatusesStore().statuses;
const users = ref([]);
const teams = teamStore.teams;
const membersView = ref(true);

onBeforeMount(async () => {
	users.value = await userStore.findAllUsers();
});

</script>
<template>
	<div class="bg-neutral-300 flex flex-col p-14">
		<div class='grid grid-cols-2'>
			<div class='flex h-12 border-2 border-gray-200 rounded-tl-2xl hover:border-b-2 hover:shadow-indigo-500 hover:border-indigo-500 shadow-lg ease-in-out duration-500 items-center justify-center'
				:class='membersView ? "bg-white border-b-0" : "bg-neutral-100 border-b-2"' @click='membersView = true'>
				<p>Participantes</p>
			</div>
			<div class='flex h-12 border-2 border-gray-200 rounded-tr-2xl hover:border-b-2 hover:shadow-indigo-500 hover:border-indigo-500 shadow-lgease-in-out duration-500 items-center justify-center'
				:class='!membersView ? "bg-white border-b-0" : "bg-neutral-100 border-b-2"' @click='membersView = false'>
				<p>Equipes</p>
			</div>
		</div>
		<div v-if='membersView'
			class="bg-white p-8 border-2 border-t-0 border-gray-200 row-span-5 col-span-2 grid grid-rows-6 grid-cols-2 xl:grid-cols-3 gap-x-3.5 gap-y-32 h-full">
			<UserCard v-for="user in users" :key="user.identification" :member="user" :teams='teams' :statuses='statuses' />
		</div>
		<div v-else
			class="bg-white p-8 border-2 border-t-0 border-gray-200 row-span-5 col-span-2 grid grid-rows-6 grid-cols-2 xl:grid-cols-3 gap-x-3.5 gap-y-32 h-full ">
			<TeamCard v-for="team in teams" :key="team.identification" :team="team" />
		</div>
	</div>
</template>