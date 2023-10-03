<script setup>
import { useUsersStore } from "../../services/stores/users";
import { useTasksStore } from "../../services/stores/tasks";
import { ref, onMounted } from "vue";
import TaskCard from "../../components/cards/TaskCard.vue";

const tasksStore = useTasksStore();
const userStore = useUsersStore();
const emit = defineEmits(["update:modelValue"]);
const users = ref([]);
const displayedTasks = ref([]);


onMounted(async () => {
    users.value = await userStore.findAllUsers();
    if (userStore.user.is_admin) {
        displayedTasks.value = await tasksStore.findAllTasks();
    } else {
        // Retrieve tasks for user's team if user is not an admin
        const userTeamId = userStore.user.fk_team_identification;
        const tasks = await tasksStore.findAllTasks();
        const tasksForUserTeam = tasks.filter(task => {
            const taskUserId = task.fk_users_identification;
            const taskUser = users.value.find(user => user.identification === taskUserId);
            const taskUserTeamId = taskUser.fk_team_identification;
            return taskUserTeamId === userTeamId;
        });
        displayedTasks.value = tasksForUserTeam;
    }
});

function nameOfUser(userId) {
    const user = users.value.find(user => user.identification === userId);
    return user.name;
};

const newTask = () => {
    window.open("task", "Ratting", "width=900, height = 640, left = 480, top = 200, toolbar = 0, status = 0, ");
};

</script>

<template>
    <div class="bg-neutral-100 p-14 grid gap-5 grid-rows-6">
        <div v-for='task in displayedTasks' class='grid grid-cols-3 row-span-6'>
            <TaskCard :key='task.identification' :issue='task.issue' :user='nameOfUser(task.fk_users_identification)'
                :user_id='task.fk_users_identification' :client='"Cliente"' :priority_level='task.priority_level'
                :is_it_solved='task.is_it_solved' :identification='task.identification' />
        </div>
        <div class='grid col-span-5 row-start-7 justify-items-end'>
            <button type="button" class="
                col-end-5
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
                    " title="Adicionar nova tarefa" @click="newTask">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>

            </button>
        </div>
    </div>
</template>