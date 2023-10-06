<script setup>
import { ref, computed } from 'vue';
import { useUsersStore } from "../../services/stores/users";
import { useTasksStore } from "../../services/stores/tasks";

const userStore = useUsersStore();
const taskStore = useTasksStore();

const props = defineProps({
    issue: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    client: {
        type: String,
        required: true
    },
    priority_level: {
        type: Number,
        required: true
    },
    is_it_solved: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: Number,
        required: true
    },
    identification: {
        type: Number,
        required: true
    }
});

function openTaskInfo() {
    window.open("task/info/" + props.identification, "Ratting", "width=900, height = 640, left = 480, top = 200, toolbar = 0, status = 0, ");
}

function openEditTask() {
    window.open("task/" + props.identification, "Ratting", "width=900, height = 640, left = 480, top = 200, toolbar = 0, status = 0, ");
}

function deleteTask() {
    taskStore.deleteTask(props.identification);
}

const priority = computed(() => {
    switch (props.priority_level) {
        case 1:
            return "Baixa";
        case 2:
            return "Média";
        case 3:
            return "Alta";
        default:
            return "Prioridade não definida";
    }
});

const colorBorder = computed(() => {
    switch (props.priority_level) {
        case 1:
            return "border-green-500";
        case 2:
            return "border-yellow-500";
        case 3:
            return "border-red-500";
        default:
            return "border-gray-500";
    }
});

const showInfo = ref(false);
const showEdit = ref(false);
const showDelete = ref(false);
const is_solved = ref(false);
</script>

<template>
    <div class="
				bg-white
				rounded-xl
				h-fit
				flex flex-col
				w-full
				shadow-lg border-2
				hover:shadow-indigo-500 hover:border-indigo-500
				ease-in-out
				duration-500
			" :class='colorBorder'>
        <div class="grid grid-cols-5 p-3 m-3 items-center">
            <h4 class="col-span-4 font-semibold text-lg">{{ props.issue }}</h4>
            <p class="col-span-4 text-gray-500">{{ "Responsável: " + props.user }}</p>
            <p class="col-span-4 text-gray-500">{{ "Cliente: " + props.client }}</p>
            <p class="col-span-4 text-gray-500">{{ "Prioridade: " + priority }}</p>
            <p class="col-span-3 text-gray-500">{{ "Está resolvido:" }} </p>
            <input class='col-start-4' type="checkbox" v-model="props.is_it_solved" disabled />
        </div>
        <div class="grid grid-cols-3">
            <button @mouseover="showInfo = true" @mouseleave="showInfo = false" class="
						flex
						p-4
						justify-center
						text-gray-500
						rounded-bl-lg
						border-gray-200 border-t-2 border-r
						hover:bg-indigo-500 hover:text-white
						ease-in-out
						duration-500
					" @click="openTaskInfo">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6" v-show='!showInfo'>
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <p class="text-white" v-show='showInfo'>{{ "Info" }}</p>
            </button>
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
					" @click="openEditTask">
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
					" @click="deleteTask">
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