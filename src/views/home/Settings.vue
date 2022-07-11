<script setup>
import { defineAsyncComponent, ref, watch } from "vue";
import { useAddressStore } from "/src/services/stores/address.js";
import { useUsersStore } from "/src/services/stores/users.js";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const addressStore = useAddressStore();
const userStore = useUsersStore();
const configOthers = userStore.configUser && Object.keys(userStore.configUser).length != 0;
const person = ref(configOthers ? userStore.configUser : userStore.user);
const loading = ref(false);
const sending = ref(false);
const auth = getAuth();

const TextInput = defineAsyncComponent(() => import("/src/components/inputs/TextInput.vue"));
const Combobox = defineAsyncComponent(() => import("/src/components/inputs/Combobox.vue"));
const Checkbox = defineAsyncComponent(() => import("/src/components/inputs/Checkbox.vue"));
const DatePicker = defineAsyncComponent(() => import("/src/components/inputs/DatePicker.vue"));
const PhotoPicker = defineAsyncComponent(() => import("/src/components/inputs/PhotoPicker.vue"));
const PasswordInput = defineAsyncComponent(() => import("/src/components/inputs/PasswordInput.vue"));
const Spinner = defineAsyncComponent(() => import("/src/components/animations/Spinner.vue"));

if (userStore.offices == undefined) userStore.findAllOffices();
userStore.user.usu_state;
if (userStore.user.usu_state != "") findCitiesOptions(userStore.user.usu_state);

function update() {
	sending.value = true;

	userStore.user = person.value;
	userStore
		.updateUser(configOthers)
		.then(() => {
			alert("Dados atualizados com sucesso.");
		})
		.catch(() => {
			alert("Não foi possível atualizar os dados. Verifique se");
		})
		.finally(() => {
			sending.value = false;
		});
}

function findCitiesOptions(newAddress) {
	addressStore.cities = [];
	const found = addressStore.states.find((state) => state.name === newAddress);
	if (found) {
		loading.value = true;
		addressStore.findCitiesWithState(found);
	}
	loading.value = false;
}

function sendEmailPasswordRecovery() {
	const auth = getAuth();
	sendPasswordResetEmail(auth, person.value.usu_email)
		.then(() => {
			alert("E-mail enviado com sucesso. Por favor, verifique sua caixa de entrada.");
		})
		.catch((error) => {
			switch (error.code) {
				case "auth/invalid-email":
					alert("Este email não é válido.");
					break;
				case "auth/user-not-found":
					alert("Este email não está cadastrado.");
					break;
				default:
					alert("Ocorreu um erro ao enviar o email. Contate o suporte sobre o erro: " + error.message);
					break;
			}
		});
}

watch(
	() => person.value.usu_state,
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
							<TextInput
								label="ID"
								type="text"
								id="identification"
								:required="true"
								:disabled="true"
								v-model="person.usu_identification" />
						</div>
						<div class="col-span-3">
							<TextInput label="Nome" type="text" id="name" :required="true" v-model="person.usu_name" />
						</div>
						<div class="col-span-2">
							<TextInput label="E-mail" type="email" id="email" :required="true" :disabled="true" v-model="person.usu_email" />
						</div>
						<div class="col-span-1">
							<DatePicker label="Data de nascimento" id="birthDate" v-model="person.usu_birthday" />
						</div>
						<div class="col-span-1">
							<TextInput label="Telefone" type="phone" id="phone" v-model="person.usu_phone" />
						</div>
						<div class="col-span-1">
							<PhotoPicker label="Foto" id="photo" :text="'Selecionar foto'" v-model="person.usu_photo" />
						</div>
						<div class="col-span-1">
							<Checkbox :id="'isAdminCheckBox'" :label="'Admin'" v-model="person.usu_is_admin" v-if="userStore.user.usu_is_admin" />
						</div>
						<div class="col-span-2 flex items-center">
							<Combobox
								:id="'officeIdentification'"
								class="flex-1"
								:alternatives="userStore.offices"
								:label="'Cargo'"
								:idInstead="true"
								v-model="person.usu_fk_ofc_identification"
								v-if="userStore.user.usu_is_admin"></Combobox>
						</div>
						<div class="col-span-2 flex items-center">
							<button
								type="button"
								class="
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
								"
								@click="sendEmailPasswordRecovery">
								<span class="absolute left-0 inset-y-0 flex items-center pl-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="lock-closed h-5 w-5 text-blue-500 group-hover:text-blue-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
									</svg>
								</span>
								Enviar e-mail de recuperação de senha
							</button>
						</div>
						<div class="col-span-3">
							<TextInput label="Endereço" type="text" id="street" v-model="person.usu_address" />
						</div>
						<div class="col-span-1">
							<TextInput label="Número" type="text" id="number" v-model="person.usu_street_number" />
						</div>
						<div class="col-span-1">
							<TextInput label="CEP" type="text" id="postal_code" v-model="person.usu_postal_code" />
						</div>
						<div class="col-span-1">
							<TextInput label="Complemento" type="text" id="complement" v-model="person.usu_complement" />
						</div>
						<div class="col-span-2">
							<TextInput label="Bairro" type="text" id="neighborhood" v-model="person.usu_neighborhood" />
						</div>
						<div class="col-span-1">
							<Checkbox :id="'foreingCheckBox'" :label="'foreign'" v-model="person.usu_foreign" />
						</div>
						<div class="col-span-1 flex items-center">
							<Combobox
								:id="'statesComboBox'"
								class="flex-1"
								:alternatives="addressStore.states"
								:disabled="person.usu_foreign"
								:label="'Estado'"
								v-model="person.usu_state"></Combobox>
						</div>
						<div class="col-span-2 flex items-center">
							<Combobox
								:id="'cityComboBox'"
								class="w-full"
								:alternatives="addressStore.cities"
								:disabled="person.usu_foreign"
								:label="'Cidade'"
								:loading="loading"
								v-model="person.usu_city"></Combobox>
							<Spinner v-show="loading" />
						</div>
					</div>
				</div>
				<div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
					<button
						type="button"
						class="
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
						"
						:disabled="sending"
						@click="update">
						Salvar
					</button>
				</div>
			</div>
		</form>
	</div>
</template>