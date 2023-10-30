<script setup>
import { defineAsyncComponent, ref, watch, onBeforeMount } from 'vue';
import { useTeamsStore } from '../../services/stores/teams';
import { useUsersStore } from "../../services/stores/users.js";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import router from '../../services/router';

const props = defineProps({
	id: {
		type: String,
	},
});

const teamStore = useTeamsStore();
const userStore = useUsersStore();
const person = ref({});
const sending = ref(false);
const auth = getAuth();
const configOthers = ref(props.id != userStore.user.identification);

const TextInput = defineAsyncComponent(() => import("../../components/inputs/TextInput.vue"));
const Checkbox = defineAsyncComponent(() => import("../../components/inputs/Checkbox.vue"));
const PhotoPicker = defineAsyncComponent(() => import("../../components/inputs/PhotoPicker.vue"));
const Combobox = defineAsyncComponent(() => import("../../components/inputs/Combobox.vue"));

const limitOptions = [
	{
		identification: 1,
	},
	{
		identification: 2,
	},
	{
		identification: 3,
	},
	{
		identification: 5,
	},
	{
		identification: 7,
	},
	{
		identification: 10,
	},
]

onBeforeMount(async () => {
	person.value = !configOthers ? userStore.user : await userStore.findOneUserById(props.id);
	if (configOthers && !userStore.user.is_admin) {
		alert("Você não tem permissão para acessar esta página.");
		router.push({ name: "Home" });
	}
});

async function save() {
	sending.value = true;
	const newUser = {
		identification: person.value.identification,
		name: person.value.name,
		email: person.value.email,
		photo: person.value.photo,
		is_admin: person.value.is_admin,
		fk_team_identification: person.value.fk_team_identification,
		task_limit: person.value.task_limit,
	};

	try {
		const response = await userStore.updateUser(newUser, configOthers);
		if (response === 201 || response === 200) {
			window.close();
		} else {
			alert("Não foi possível atualizar os dados.");
		}
	} catch (error) {
		console.error(error);
		alert("Não foi possível atualizar os dados.");
	} finally {
		sending.value = false;
	}
}

async function sendEmailPasswordRecovery() {
	try {
		await sendPasswordResetEmail(auth, person.value.email);
		alert("E-mail enviado com sucesso. Por favor, verifique sua caixa de entrada.");
		window.close();
	} catch (error) {
		let errorMessage;
		switch (error.code) {
			case "auth/invalid-email":
				errorMessage = "Este email não é válido.";
				break;
			case "auth/user-not-found":
				errorMessage = "Este email não está cadastrado.";
				break;
			default:
				errorMessage = "Ocorreu um erro ao enviar o email. Contate o suporte sobre o erro: " + error.message;
				break;
		}
		alert(errorMessage);
	}
}

watch(
	() => person.value.state,
	(newAddress) => {
		findCitiesOptions(newAddress);
	}
);
</script>
<template>
	<div class="bg-slate-100 w-full h-full grid p-3">
		<h3 class="mb-4 text-xl font-medium text-gray-900">Editar usuário</h3>
		<form @submit.prevent="save" class='grid grid-cols-6 grid-rows-6 items-center justify-items-center'>
			<TextInput label="ID" type="text" id="identification" :required="true" :disabled="true"
				v-model="person.identification" class="w-full p-3 col-span-2" padding='p-4' />
			<TextInput label="Nome" type="text" id="name" :required="true" v-model="person.name"
				class="w-full p-3 col-span-4" padding='p-4' />
			<TextInput label="E-mail" type="email" id="email" :required="true" :disabled="true" v-model="person.email"
				class="w-full p-3 col-span-4" padding='p-4' />
			<PhotoPicker label="Foto" id="photo" :text="'Selecionar foto'" v-model="person.photo"
				class="w-full p-3 col-span-2" />
			<Combobox :id="'teamsComboBox'" :idInstead="true" class="grid p-3 col-span-2" :alternatives="teamStore.teamsOptions"
				:padding="'p-4'" :focusRing="'focus:ring-indigo-500'" :focusBorder="'focus:border-indigo-500'"
				:label="'Time'" title="Time" v-model="person.fk_team_identification"></Combobox>
			<Combobox :id="'limitComboBox'" :idInstead="true" class="grid p-3 col-span-2" :alternatives="limitOptions"
				:padding="'p-4'" :focusRing="'focus:ring-indigo-500'" :focusBorder="'focus:border-indigo-500'"
				:label="'Limite de tarefas'" title="Limite de tarefas" v-model="person.task_limit">
			</Combobox>
			<Checkbox :id="'isAdminCheckBox'" :label="'Admin'" v-model="person.is_admin" v-if="userStore.user.is_admin"
				class="w-full p-3" />
			<button type="button" class="
								    col-span-3
									group
									relative
									w-full
									flex
									justify-center
									py-4
									px-4
									border border-transparent
									text-sm
									font-medium
									rounded-full
									text-white
									bg-blue-900
									hover:bg-blue-700
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
									ease-in-out
									duration-500
								" @click="sendEmailPasswordRecovery">
				<span class="absolute left-0 inset-y-0 flex items-center pl-3">
					<svg xmlns="http://www.w3.org/2000/svg"
						class="lock-closed h-5 w-5 text-blue-500 group-hover:text-blue-400" fill="none" viewBox="0 0 24 24"
						stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
					</svg>
				</span>
				Enviar e-mail de recuperação de senha
			</button>
			<button type="submit" class="
							row-start-6
							col-start-6
							mx-3
							flex
							w-full
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