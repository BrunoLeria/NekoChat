<script setup>
import { ref, watch, computed } from "vue";
import TextInput from "/src/components/inputs/TextInput.vue";
import Combobox from "/src/components/inputs/Combobox.vue";
import Checkbox from "/src/components/inputs/Checkbox.vue";
import DatePicker from "/src/components/inputs/DatePicker.vue";
import PhotoPicker from "/src/components/inputs/PhotoPicker.vue";
import PasswordInput from "/src/components/inputs/PasswordInput.vue";
import Spinner from "/src/components/animations/Spinner.vue";
import { useAddressStore } from "/src/services/stores/address.js";
import { useUsersStore } from "/src/services/stores/users.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import zxcvbn from "zxcvbn";

const addressStore = useAddressStore();
const userStore = useUsersStore();

const person = ref(userStore.user);
let confirmPassword = "";
let loading = ref(false);

function update() {
	loading.value = true;
	if (zxcvbn(person.value.password).score + 1 == 5) {
		alert("Password is too weak");
		return;
	}
	if (person.value.password !== confirmPassword) {
		alert("Passwords do not match");
		return;
	}
	if (userStore.user.usu_password == null) {
		createUserWithEmailAndPassword(auth, email.value, password.value);
	}

	userStore.user = person;
	updateUser();
}

async function updateUser() {
	const url =
		"http://192.168.12.178:3005/updateUser?id=" +
		userStore.user.usu_identification;
	await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userStore.user)
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("Success:", data);
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

watch(
	() => person.value.usu_state,
	(newAddress) => {
		addressStore.cities = [];
		const found = addressStore.states.find(
			(state) => state.name === newAddress
		);
		if (found) {
			loading.value = true;
			const res = fetch(
				`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${found.sigla}/distritos`
			)
				.then((response) => response.json())
				.then((data) =>
					data.forEach((city, index) => {
						let obj = {
							id: index,
							name: city.nome
						};
						addressStore.cities.push(obj);
					})
				)
				.catch((err) => console.log(err))
				.finally(() => {
					loading.value = false;
				});
		}
	}
);
</script>

<template>
	<div
		class="
			bg-neutral-100
			p-14
			flex flex-col flex-wrap
			justify-between
			overflow-y
		">
		<form
			class="space-y-6 border-slate-200 border-2 rounded-xl shadow-xl"
			action="#"
			method="POST">
			<div class="shadow overflow-hidden sm:rounded-md">
				<div class="px-4 py-5 bg-white sm:p-6">
					<div class="grid grid-cols-6 gap-6">
						<div class="col-span-3">
							<TextInput
								label="Nome"
								type="text"
								id="name"
								:required="true"
								v-model="person.usu_name" />
						</div>
						<div class="col-span-3">
							<TextInput
								label="E-mail"
								type="email"
								id="email"
								:required="true"
								v-model="person.usu_email" />
						</div>
						<div class="col-span-1">
							<DatePicker
								label="Data de nascimento"
								id="birthDate"
								v-model="person.usu_birthday" />
						</div>
						<div class="col-span-1">
							<TextInput
								label="Telefone"
								type="phone"
								id="phone"
								v-model="person.usu_phone" />
						</div>
						<div class="col-span-3">
							<PhotoPicker
								label="Foto"
								id="photo"
								:text="'Selecionar foto'"
								v-model="person.usu_photo" />
						</div>
						<div class="col-span-1"></div>
						<div class="col-span-2">
							<PasswordInput
								label="Senha"
								type="password"
								id="password"
								v-model="person.usu_password" />
						</div>
						<div class="col-span-2">
							<TextInput
								label="Confirmar senha"
								type="password"
								id="passwordConfirm"
								v-model="confirmPassword" />
						</div>
						<div class="col-span-3">
							<TextInput
								label="Endereço"
								type="text"
								id="street"
								v-model="person.usu_address" />
						</div>
						<div class="col-span-1">
							<TextInput
								label="Número"
								type="text"
								id="number"
								v-model="person.usu_street_number" />
						</div>
						<div class="col-span-2">
							<TextInput
								label="Complemento"
								type="text"
								id="complement"
								v-model="person.usu_complement" />
						</div>
						<div class="col-span-2">
							<TextInput
								label="Bairro"
								type="text"
								id="neighborhood"
								v-model="person.usu_neighborhood" />
						</div>
						<div class="col-span-1">
							<Checkbox
								:id="'foreingCheckBox'"
								:label="'Estrangeiro'"
								v-model="person.usu_estrangeiro" />
						</div>
						<div class="col-span-1 flex items-center">
							<Combobox
								:id="'statesComboBox'"
								class="flex-1"
								:alternatives="addressStore.states"
								:disabled="person.usu_estrangeiro"
								:label="'Estado'"
								v-model="person.usu_state"></Combobox>
						</div>
						<div class="col-span-2 flex items-center">
							<Combobox
								:id="'cityComboBox'"
								class="w-full"
								:alternatives="addressStore.cities"
								:disabled="person.usu_estrangeiro"
								:label="'Cidade'"
								:loading="loading"
								v-model="person.usu_city"></Combobox>
							<Spinner v-show="loading" />
						</div>
					</div>
				</div>
				<div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
					<button
						type="submit"
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
							focus:outline-none
							focus:ring-2
							focus:ring-offset-2
							focus:ring-indigo-500
						"
						@click="update()">
						Salvar
					</button>
				</div>
			</div>
		</form>
	</div>
</template>

<style></style>
