<script setup>
import ClientCard from "../../components/cards/ClientCard.vue";
import { useClientsStore } from "../../services/stores/clients";
import { formatPhoneNumber } from "../../utils/DataTreament";

const emit = defineEmits(["update:modelValue"]);
const clientsStore = useClientsStore();

const newTask = () => {
    window.open("client", "Ratting", "width=700, height = 640, left = 480, top = 200, toolbar = 0, status = 0, ");
};

function maskedPhone(phone) {
    return formatPhoneNumber(phone);
};

</script>

<template>
    <div class="bg-neutral-300 grid p-14">
        <div class="bg-neutral-100 p-14 grid gap-5 grid-cols-2 xl:grid-cols-3 overflow-y-scroll">
            <div v-for='client in clientsStore.clients'>
                <ClientCard :key='client.identification' :identification='client.identification' :name='client.name'
                    :email='client.email' :phone="maskedPhone(client.phone)" />
            </div>
        </div>
        <div class='bg-neutral-100 p-5 border-t grid'>
            <button type="button" class="
                justify-self-end
				col-start-2
				xl:col-start-3
                mx-3
                flex
                justify-center
					items-center
					py-2
					px-2
					border border-transparent
					text-sm
					font-medium
					rounded-full
					text-white
					bg-green-900
					hover:bg-green-700
					ease-in-out
					duration-500
					w-12
					h-12
                    " title="Adicionar nova tarefa" @click="newTask">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
            </button>
        </div>
    </div>
</template>