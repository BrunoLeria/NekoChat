<script setup>
import { ref } from 'vue';
import router from '../../services/router';
import { useUsersStore } from '../../services/stores/users';
import { useTeamsStore } from '../../services/stores/teams';

const userStore = useUsersStore();
const teamStore = useTeamsStore();
const props = defineProps({
    team: {
        type: Object,
        required: true
    },
});
const showEdit = ref(false);
const showDelete = ref(false);

function openEditTeam() {
    window.open("team/" + props.team.identification , "Ratting", "width=700, height = 480, left = 480, top = 200, toolbar = 0, status = 0, ");	
}
async function deleteTeam() {
    try {
        if (confirm("Tem certeza que deseja deletar essa equipe?")) {
            const response = await teamStore.deleteTeam(props.team.identification);
            if (response === 200) {
                alert("Equipe deletada com sucesso!");
                window.location.reload();
            }
            else {
                alert("Erro ao deletar equipe!");
            }
        }
    } catch (error) {
        alert("Erro ao deletar equipe!");
    }
}
</script>

<template>
    <div class="
				bg-white
				rounded-xl
				h-fit
				flex flex-col
				w-full
				shadow-lg
				border-gray-200 border-2
				hover:shadow-indigo-500 hover:border-indigo-500
				ease-in-out
				duration-500
			">
        <div class="flex p-3 justify-between">
            <div class="flex flex-col p-3">
                <div class="flex">
                    <h4 class="font-semibold text-lg">{{ team.name ? team.name : "Time " + team.identification }}
                    </h4>
                </div>
                <p class="text-gray-500">{{ "Descrição: " + team.description }}</p>
            </div>
        </div>
        <div class="grid grid-cols-2">
            <button @mouseover="showEdit = true" @mouseleave="showEdit = false"
                v-if="userStore.user.is_admin || userStore.user.identification === userId" class="
						flex
						p-4
						justify-center
						text-gray-500
						border-gray-200 border-t-2 border-r
						hover:bg-yellow-500 hover:text-white
						ease-in-out
						duration-500
					" @click="openEditTeam">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6" v-show='!showEdit'>
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                <p class="text-white" v-show='showEdit'>{{ "Editar" }}</p>
            </button>
            <button @mouseover="showDelete = true" @mouseleave="showDelete = false"
                v-if="userStore.user.is_admin || userStore.user.identification === userId" class="
						flex
						p-4
						justify-center
						text-gray-500
						rounded-br-lg
						border-gray-200 border-t-2 border-r
						hover:bg-red-500 hover:text-white
						ease-in-out
						duration-500
					" @click="deleteTeam">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6" v-show='!showDelete'>
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                <p class="text-white" v-show='showDelete'>{{ "Deletar" }}</p>
            </button>
        </div>
    </div>
</template>