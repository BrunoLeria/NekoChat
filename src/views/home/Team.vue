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

function createTeam() {
	console.log('create team');
}

</script>
<template>
	<div class="bg-neutral-300 flex flex-col p-14 h-full">
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
			class="bg-white p-8 border-2 border-t-0 border-gray-200 row-span-5 col-span-2 grid grid-cols-2 2xl:grid-cols-3 gap-5 h-full">
			<UserCard v-for="user in users" :key="user.identification" :member="user" :teams='teams' :statuses='statuses' />
		</div>
		<div v-else class='grid h-full'>
			<div
				class="bg-white p-8 border-2 border-t-0 border-gray-200 col-span-2 grid grid-cols-2 grid-rows-4 xl:grid-cols-3 gap-5 overflow-y-scroll">
				<TeamCard v-for="team in teams" :key="team.identification" :team="team" />
			</div>
			<div class='bg-neutral-100 border-t p-5 grid h-20 col-span-2'>
				<button type="button" class="
				justify-self-end
				col-start-2
				xl:col-start-3
                row-end-7
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
                    " title="Adicionar novo time" @click="createTeam">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
						stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>