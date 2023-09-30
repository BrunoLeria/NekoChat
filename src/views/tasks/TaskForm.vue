<script setup >
import { ref, defineAsyncComponent, computed, onBeforeMount } from 'vue';
import { useUsersStore } from '../../services/stores/users';
import { useClientsStore } from '../../services/stores/clients';
import { useTasksStore } from '../../services/stores/tasks';

const userStore = useUsersStore();
const clientsStore = useClientsStore();
const tasksStore = useTasksStore();

const identification = ref('');
const issue = ref('');
const description = ref('');
const priority_level = ref('');
const is_it_solved = ref(false);
const resolution_details = ref('');
const fk_clients_identification = ref("");
const fk_users_identification = ref("");
const is_feedback = ref(false);
const usersOptions = ref([]);
const clientsOptions = ref([]);
const task = ref({});

const TextInput = defineAsyncComponent(() => import("/src/components/inputs/TextInput.vue"));
const Combobox = defineAsyncComponent(() => import("/src/components/inputs/Combobox.vue"));
const Checkbox = defineAsyncComponent(() => import("/src/components/inputs/Checkbox.vue"));


onBeforeMount(async () => {
	
	if (userStore.user.is_admin) {
		usersOptions.value = await userStore.findAllUsers();
	} else {
		usersOptions.value = [userStore.user]
	}
	clientsOptions.value = await clientsStore.findAllClients();
	identification.value = window.location.pathname.split("/").length === 3 ? window.location.pathname.split("/")[2] : "";
	if(identification.value) {
		task.value = await tasksStore.findOneTaskById(identification.value);
		issue.value = task.value.issue;
		description.value = taks.value.description;
		priority_level.value = taks.value.priority_level;
		is_it_solved.value = taks.value.is_it_solved;
		resolution_details.value = taks.value.resolution_details;
		fk_clients_identification.value = taks.value.fk_clients_identification;
		fk_users_identification.value = taks.value.fk_users_identification;
		is_feedback.value = taks.value.is_feedback;
	}
});

const priorityOptions = [
	{
		identification: 1,
		name: "Baixa"
	},
	{
		identification: 2,
		name: "Média"
	},
	{
		identification: 3,
		name: "Alta"
	}
]

async function save() {
	const response = ref("");

	task.value = {
		issue: issue.value,
		description: description.value,
		priority_level: priority_level.value,
		is_it_solved: is_it_solved.value,
		resolution_details: resolution_details.value,
		fk_clients_identification: fk_clients_identification.value,
		fk_users_identification: fk_users_identification.value,
		is_feedback: is_feedback.value
	}
	
	if (identification.value) {
		response.value = await tasksStore.updateTask(task.value, identification.value);
	} else {
		response.value = await tasksStore.createTask(task.value);
	}
	
	if (response.value === 201 || response.value === 200) {
		window.close();
	} else {
		alert("Erro ao salvar a tarefa");
	}	
}

function cancel() {
	window.close();
}

</script>
<template>
	<div class="bg-slate-100 w-full h-full grid p-3">
		<h3 class="mb-4 text-xl font-medium text-gray-900">Criando uma nova tarefa</h3>
		<form action="" class='grid grid-cols-6 grid-rows-6 items-center justify-center'>
			<TextInput label="Identificação" type="text" id="id" autoComplete="" v-model='identification'
				class="w-full p-3 col-span-1" :disabled="true"/>
			<TextInput label="Nome da tarefa" type="text" id="name" autoComplete="" v-model='issue'
				class="w-full p-3 col-span-3" />
			<Checkbox :id="'isItSolvedCheckBox'" :label="'Está resolvido'" class="justify-between"
				:checkmark-color="'text-green-600'" v-model="is_it_solved" />
			<TextInput label="Descrição" type="text" id="description" autoComplete="" v-model='description'
				class="w-full p-3 col-span-6" />
			<Combobox :id="'usersComboBox'" :idInstead="true" class="grid p-3 col-span-2" :alternatives="usersOptions"
				:padding="'p-1'" :focusRing="'focus:ring-indigo-500'" :focusBorder="'focus:border-indigo-500'"
				:label="'Responsável'" title="Responsável" v-model="fk_users_identification"></Combobox>
			<Combobox :id="'priorityComboBox'" :idInstead="true" class="grid p-3" :alternatives="priorityOptions"
				:padding="'p-1'" :focusRing="'focus:ring-indigo-500'" :focusBorder="'focus:border-indigo-500'"
				:label="'Prioridade'" title="Prioridade" v-model="priority_level">
			</Combobox>
			<Combobox :id="'clientsComboBox'" :idInstead="true" class="grid p-3 col-span-3 " :alternatives="clientsOptions"
				:padding="'p-1'" :focusRing="'focus:ring-indigo-500'" :focusBorder="'focus:border-indigo-500'"
				:label="'Cliente'" title="Cliente" v-model="fk_clients_identification"></Combobox>
			<TextInput label="Detalhes da resolução" type="text" id="resolution_details" autoComplete=""
				v-model='resolution_details' class="w-full p-3 col-span-4" :disabled="!is_it_solved"/>
			<button type="button" class="
				col-start-5
				mx-3
				flex
				justify-center
				items-center
				py-2
				text-sm
				font-medium
				rounded-full
				text-white
				bg-red-900
				hover:bg-red-700
				ease-in-out
				duration-500
				h-fit" title="Encerrar conversa" @click="cancel">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
					stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
				Cancelar
			</button>
			<button type="button" class="
							mx-3
							flex
							justify-center
							items-center
							py-2
							border border-transparent
							text-sm
							font-medium
							rounded-full
							h-fit
							text-white
							bg-green-900
							hover:bg-green-700
							ease-in-out
							duration-500
				" @click="save">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
					stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
				</svg>
				Salvar
			</button>
		</form>
	</div>
</template>