<script setup>
import { ref, defineAsyncComponent, onBeforeMount } from 'vue';

const props = defineProps({
    usersOptions: { type: Array, required: true },
    clientsOptions: { type: Array, required: true },
});

const emit = defineEmits(["update:modelValue"]);
const priorityOptions = ref([
    { identification: 1, name: "Baixa" },
    { identification: 2, name: "Média" },
    { identification: 3, name: "Alta" }
]);
const fk_users_identification = ref("");
const priority_level = ref("");
const fk_clients_identification = ref("");

const Combobox = defineAsyncComponent(() => import("../inputs/Combobox.vue"));

function filter() {
    emit("update:modelValue", {
        fk_users_identification: fk_users_identification.value,
        priority_level: priority_level.value,
        fk_clients_identification: fk_clients_identification.value
    });
}

function cleanFilter() {
    fk_users_identification.value = "";
    priority_level.value = "";
    fk_clients_identification.value = "";
    emit("update:modelValue", {
        fk_users_identification: false,
        priority_level: false,
        fk_clients_identification: false
    });
}

</script>
<template>
    <form @submit.prevent="filter()" class='grid grid-cols-4 items-center justify-items-center'>
        <Combobox :id="'usersComboBox'" :idInstead="true" class="grid px-3 py-1 2xl:p-3" :alternatives="props.usersOptions"
            :padding="'px-3 py-1 2xl:p-3'" :focusRing="'focus:ring-indigo-500'" :focusBorder="'focus:border-indigo-500'"
            :label="'Responsável'" title="Responsável" v-model="fk_users_identification"></Combobox>
        <Combobox :id="'priorityComboBox'" :idInstead="true" class="grid px-3 py-1 2xl:p-3" :alternatives="priorityOptions"
            :padding="'px-3 py-1 2xl:p-3'" :focusRing="'focus:ring-indigo-500'" :focusBorder="'focus:border-indigo-500'"
            :label="'Prioridade'" title="Prioridade" v-model="priority_level">
        </Combobox>
        <Combobox :id="'clientsComboBox'" :idInstead="true" class="grid px-3 py-1 2xl:p-3 "
            :alternatives="props.clientsOptions" :padding="'px-3 py-1 2xl:p-3'" :focusRing="'focus:ring-indigo-500'"
            :focusBorder="'focus:border-indigo-500'" :label="'Cliente'" title="Cliente" v-model="fk_clients_identification">
        </Combobox>
        <div class='grid grid-cols-4 grid-rows-2'>
            <button type="submit" class="
                mx-3
                flex
                justify-center
                items-center
                row-start-2
                py-2
                w-12
                h-12
                border border-transparent
                text-sm
                font-medium
                rounded-full
                text-white
                bg-indigo-900
                hover:bg-indigo-700
                ease-in-out
                duration-500
				">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </button>
            <button type="button" class="
							mx-3
							flex
							justify-center
							items-center
                            row-start-2 
							py-2
                            w-12
                            h-12
							border border-transparent
							text-sm
							font-medium
							rounded-full
							text-white
							bg-red-900
							hover:bg-red-700
							ease-in-out
							duration-500
				" @click='cleanFilter'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </form>
</template>
