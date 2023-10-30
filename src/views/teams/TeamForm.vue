<script setup>
import { ref, defineAsyncComponent, onBeforeMount, computed } from 'vue';
import { useTeamsStore } from '../../services/stores/teams';

const props = defineProps({
	id: {
		type: String,
	},
});

const teamStore = useTeamsStore();
const team = ref({});
const identification = ref('');
const name = ref('');
const description = ref('');

const TextInput = defineAsyncComponent(() => import("../../components/inputs/TextInput.vue"));

onBeforeMount(async () => {
	if (props.id) {
		identification.value = props.id;
		team.value = await teamStore.findOneTeamById(identification.value);
		name.value = team.value.name;
		description.value = team.value.description;
	}
});

async function save() {
	if (!confirm("Deseja salvar a tarefa?")) return;

	team.value = {
		name: name.value,
		description: description.value,
	}

	let response;
	try {
		if (identification.value) {
			response = await teamStore.updateTeam(team.value, identification.value);
		} else {
			response = await teamStore.createTeam(team.value);
		}
	} catch (error) {
		console.error("Erro: ", error);
		alert("Erro ao salvar a tarefa");
		return;
	}

	if (response === 201 || response === 200) {
		window.close();
	} else {
		alert("Erro ao salvar a tarefa");
	}
}

const title = computed(() => (props.id ? "Editar time" : "Novo time"));

function cancel() {
	window.close();
}
</script>
<template>
	<div class="bg-slate-100 w-full h-full grid p-3">
		<h3 class="mb-4 text-xl font-medium text-gray-900">{{ title }}</h3>
		<form @submit.prevent="save" class='grid grid-cols-6 grid-rows-6 items-center justify-items-center'>
			<TextInput label="Identificação" type="text" id="id" autoComplete="" v-model='identification' padding='p-4'
				class="w-full p-3 col-span-2" :disabled="true" />
			<TextInput label="Nome" type="text" id="name" autoComplete="" v-model='name' padding='p-4'
				class="w-full p-3 col-span-4" />
			<TextInput label="Descrição" type="text" id="description" autoComplete="" padding='p-4'
				v-model='description' class="w-full p-3 col-span-6" />
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
			<button type="submit" class="
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
				">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
					stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
				</svg>
				Salvar
			</button>
		</form>
	</div>
</template>