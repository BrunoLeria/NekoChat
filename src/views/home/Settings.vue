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

    const addressStore = useAddressStore();

    const person = ref({
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthDate: "",
        phone: "",
        photo: "",
        address: {
            street: "",
            number: "",
            complement: "",
            neighborhood: "",
            city: "",
            state: "",
            foreign: false,
            zipCode: ""
        }
    });

    let loading = ref(false);

    watch(
        () => person.value.address.state,
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
        class="bg-neutral-100 p-14 flex flex-col flex-wrap justify-between overflow-y">
        <form
            class="space-y-6 border-slate-200 border-2 rounded-xl shadow-xl"
            action="#"
            method="POST">
            <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-1">
                            <TextInput
                                label="Nome"
                                type="text"
                                id="name"
                                v-model="person.name" />
                        </div>
                        <div class="col-span-2">
                            <TextInput
                                label="Sobrenome"
                                type="text"
                                id="lastName"
                                v-model="person.lastName" />
                        </div>
                        <div class="col-span-3">
                            <TextInput
                                label="E-mail"
                                type="email"
                                id="email"
                                v-model="person.email" />
                        </div>
                        <div class="col-span-1">
                            <DatePicker
                                label="Data de nascimento"
                                id="birthDate"
                                v-model="person.birthDate" />
                        </div>
                        <div class="col-span-1">
                            <TextInput
                                label="Telefone"
                                type="phone"
                                id="phone"
                                v-model="person.phone" />
                        </div>
                        <div class="col-span-2">
                            <PhotoPicker
                                label="Foto"
                                id="photo"
                                :text="'Selecionar foto'"
                                v-model="person.photo" />
                        </div>
                        <div class="col-span-2"></div>
                        <div class="col-span-2">
                            <PasswordInput
                                label="Senha"
                                type="password"
                                id="password"
                                v-model="person.password" />
                        </div>
                        <div class="col-span-2">
                            <TextInput
                                label="Confirmar senha"
                                type="password"
                                id="passwordConfirm"
                                v-model="person.confirmPassword" />
                        </div>
                        <div class="col-span-3">
                            <TextInput
                                label="Endereço"
                                type="text"
                                id="address.street"
                                v-model="person.address.street" />
                        </div>
                        <div class="col-span-1">
                            <TextInput
                                label="Número"
                                type="text"
                                id="address.number"
                                v-model="person.address.number" />
                        </div>
                        <div class="col-span-2">
                            <TextInput
                                label="Complemento"
                                type="text"
                                id="address.complement"
                                v-model="person.address.complement" />
                        </div>
                        <div class="col-span-2">
                            <TextInput
                                label="Bairro"
                                type="text"
                                id="address.neighborhood"
                                v-model="person.address.neighborhood" />
                        </div>
                        <div class="col-span-1">
                            <Checkbox
                                :id="'foreingCheckBox'"
                                :label="'Estrangeiro'"
                                v-model="person.address.foreign" />
                        </div>
                        <div class="col-span-1 flex items-center">
                            <Combobox
                                :id="'statesComboBox'"
                                class="flex-1"
                                :alternatives="addressStore.states"
                                :disabled="person.address.foreign"
                                :label="'Estado'"
                                v-model="person.address.state"></Combobox>
                        </div>
                        <div class="col-span-2 flex items-center">
                            <Combobox
                                :id="'cityComboBox'"
                                class="w-full"
                                :alternatives="addressStore.cities"
                                :disabled="person.address.foreign"
                                :label="'Cidade'"
                                :loading="loading"
                                v-model="person.address.city"></Combobox>
                            <Spinner v-show="loading" />
                        </div>
                    </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Salve
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<style></style>
