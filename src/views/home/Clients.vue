<script setup>
import { ref, onMounted, computed } from "vue";
import ClientCard from "../../components/cards/ClientCard.vue";
import { useClientsStore } from "../../services/stores/clients";

const emit = defineEmits(["update:modelValue"]);
const clientsStore = useClientsStore();
const clients = ref([]);

onMounted(async () => {
    clients.value = await clientsStore.findAllClients();
});

const newTask = () => {
    window.open("client", "Ratting", "width=700, height = 640, left = 480, top = 200, toolbar = 0, status = 0, ");
};

function maskedPhone(phone) {
    const phoneWithoutPrefix = phone.slice(2);
    return phoneWithoutPrefix.replace(/\D/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

</script>

<template>
    <div class="bg-neutral-100 p-14 grid gap-5 grid-rows-6 grid-cols-3 row-span-6">
        <div v-for='client in clients'>
            <ClientCard :key='client.identification' :identification='client.identification' :name='client.name'
                :email='client.email' :phone="maskedPhone(client.phone)" />
        </div>
        <div class='grid col-span-5 row-start-7 justify-items-end'>
            <button type="button" class="
                col-end-5
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
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>

            </button>
        </div>
    </div>
</template>