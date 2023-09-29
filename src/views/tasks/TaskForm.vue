<script setup >
import { ref, defineAsyncComponent, computed } from 'vue';
import { useUsersStore } from '../../services/stores/users';

const userStore = useUsersStore();

const issue = ref('');
const description = ref('');
const priority_level = ref('');
const is_it_solved = ref(false);
const resolution_details = ref('');
const fk_clients_identification = ref("");
const fk_users_identification = ref("");
const is_feedback = ref(false);


const TextInput = defineAsyncComponent(() => import("/src/components/inputs/TextInput.vue"));
const Combobox = defineAsyncComponent(() => import("/src/components/inputs/Combobox.vue"));
const Checkbox = defineAsyncComponent(() => import("/src/components/inputs/Checkbox.vue"));

const usersOptions = computed(async () => {
	if (userStore.user.is_admin) {
		const users = await userStore.findAllUsers();
		console.log(users)
		return users.map(user => user.name)
	} else {
		return [userStore.user.name]
	}
});

const clientsOptions = [
	"Cliente 1",
	"Cliente 2",
	"Cliente 3"
]

const priorityOptions = [
	"Baixa",
	"Média",
	"Alta"
]

</script>
<template>
	<div class="bg-slate-100 w-full h-full grid p-3">
		<h3 class="mb-4 text-xl font-medium text-gray-900">Criando uma nova tarefa</h3>
		<form action="" class='grid grid-cols-6 grid-rows-6'>
			<TextInput label="Problema" type="text" id="myMessage" autoComplete="myMessage" class="w-full p-3 col-span-3" />
			<TextInput label="Descrição" type="text" id="myMessage" autoComplete="myMessage"
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
			<Checkbox :id="'isItSolvedCheckBox'" :label="'Está resolvido'" class="justify-between"
				:checkmark-color="'text-green-600'" v-model="is_it_solved"
				@update:modelValue="setSelected(is_it_solved, 'is_it_solved')" />
			<TextInput label="Detalhes da resolução" type="text" id="myMessage" autoComplete="myMessage"
				class="w-full p-3 col-span-5" />
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