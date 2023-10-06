<script setup >
import { ref, defineAsyncComponent, onBeforeMount } from 'vue';
import { useClientsStore } from '../../services/stores/clients';
import { removeWhatsAppKey } from '../../utils/DataTreament';

const props = defineProps({
	id: {
		type: String,
	},
	phone_number: {
		type: String,
	},
});
const clientsStore = useClientsStore();
const identification = ref('');
const name = ref('');
const email = ref('');
const phone = ref('');
const client = ref({});

const TextInput = defineAsyncComponent(() => import("../../components/inputs/TextInput.vue"));
const MaskedInput = defineAsyncComponent(() => import("../../components/inputs/MaskedInput.vue"));

onBeforeMount(async () => {
	if (props.id) {
		identification.value = props.id;
		client.value = await clientsStore.findOneClientById(identification.value);
		name.value = client.value.name;
		email.value = client.value.email;
		phone.value = removeWhatsAppKey(client.value.phone);
	} else if (props.phone_number) {
		phone.value = props.phone_number;
	}
});

async function save() {
	const response = ref("");
	phone.value = phone.value.replace(/\D/g, '');
	client.value = {
		name: name.value,
		email: email.value,
		phone: "55" + phone.value + "@s.whatsapp.net"
	}
	if (identification.value) {
		response.value = await clientsStore.updateClient(client.value, identification.value);
	} else {
		response.value = await clientsStore.createClient(client.value);
	}

	if (response.value === 201 || response.value === 200) {
		window.close();
	} else {
		alert("Erro ao salvar o cliente");
	}
}

function cancel() {
	window.close();
}

</script>
<template>
	<div class="bg-slate-100 w-full h-full grid p-3">
		<h3 class="mb-4 text-xl font-medium text-gray-900">Criando uma nova tarefa</h3>
		<form @submit.prevent="save" class='grid grid-cols-5 grid-rows-4'>
			<TextInput label="Identificação" type="text" id="id" autoComplete="" v-model='identification'
				class="w-full p-3 col-span-1" :disabled="true" />
			<TextInput label="Nome" type="text" id="name" autoComplete="" v-model='name' class="w-full p-3 col-span-4"
				:required="true" />
			<TextInput label="E-mail" type="email" id="description" autoComplete="" v-model='email'
				class="w-full p-3 col-span-3" :required="true" />
			<MaskedInput label="Celular" type="text" id="resolution_details" autoComplete="" v-model='phone'
				class="w-full p-3 col-span-2" pattern="(##) #####-####" :max="15" :required="true" />
			<button type="button" class="
				col-start-4
				row-start-4
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
			col-start-5
				row-start-4
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