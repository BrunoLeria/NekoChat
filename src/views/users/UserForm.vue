<script setup>
import { defineAsyncComponent, ref, watch, onBeforeMount } from 'vue';
import { useAddressStore } from "../../services/stores/address.js";
import { useUsersStore } from "../../services/stores/users.js";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import router from '../../services/router';

const props = defineProps({
	id: {
		type: String,
	},
});

const userStore = useUsersStore();
const person = ref({});
const sending = ref(false);
const auth = getAuth();

const TextInput = defineAsyncComponent(() => import("../../components/inputs/TextInput.vue"));
const Checkbox = defineAsyncComponent(() => import("../../components/inputs/Checkbox.vue"));
const PhotoPicker = defineAsyncComponent(() => import("../../components/inputs/PhotoPicker.vue"));

onBeforeMount(async () => {
    person.value = props.id == userStore.user.identification ? userStore.user : await userStore.findOneUserById(props.id);
    if(props.id != userStore.user.identification && !userStore.user.is_admin) {
        alert("Você não tem permissão para acessar esta página.");
        router.push({ name: "Home" });
    }
});

async function update() {
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
        await userStore.updateUser(newUser, configOthers);
        if (response === 201 || response === 200) {
            window.close();
        } else {
            alert("Não foi possível atualizar os dados.");
        }
    } catch (error) {
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
	<div class="bg-neutral-100 p-14 flex flex-col flex-wrap justify-between overflow-y">
		<form class="space-y-6 border-slate-200 border-2 rounded-xl shadow-xl" action="#" method="POST">
			<div class="shadow overflow-hidden sm:rounded-md">
				<div class="px-4 py-5 bg-white sm:p-6">
					<div class="grid grid-cols-6 gap-6">
						<div class="col-span-1">
							<TextInput label="ID" type="text" id="identification" :required="true" :disabled="true"
								v-model="person.identification" />
						</div>
						<div class="col-span-3">
							<TextInput label="Nome" type="text" id="name" :required="true" v-model="person.name" />
						</div>
						<div class="col-span-2">
							<TextInput label="E-mail" type="email" id="email" :required="true" :disabled="true"
								v-model="person.email" />
						</div>
						<div class="col-span-1">
							<PhotoPicker label="Foto" id="photo" :text="'Selecionar foto'" v-model="person.photo" />
						</div>
						<div class="col-span-1">
							<Checkbox :id="'isAdminCheckBox'" :label="'Admin'" v-model="person.is_admin"
								v-if="userStore.user.is_admin" />
						</div>
						<div class="col-span-2 flex items-center">
							<button type="button" class="
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
										class="lock-closed h-5 w-5 text-blue-500 group-hover:text-blue-400" fill="none"
										viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
										<path stroke-linecap="round" stroke-linejoin="round"
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
									</svg>
								</span>
								Enviar e-mail de recuperação de senha
							</button>
						</div>
					</div>
				</div>
				<div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
					<button type="button" class="
							inline-flex
							justify-center
							py-2
							px-4
							border border-transparent
							shadow-sm
							text-sm
							font-medium
							rounded-md
							text-white
							bg-indigo-600
							hover:bg-indigo-700
							focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
						" :disabled="sending" @click="update">
						Salvar
					</button>
				</div>
			</div>
		</form>
	</div>
</template>