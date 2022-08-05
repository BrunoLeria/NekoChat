<script setup>
import { useUsersStore } from "/src/services/stores/users";
import { ref, computed } from "vue";

const userStore = useUsersStore();
const changeStatus = ref(false);

const statuses = [
	{ sts_identification: 1, sts_name: "Online", sts_description: "Disponível", sts_color: "rgb(74 222 128)" },
	{ sts_identification: 2, sts_name: "Occupied", sts_description: "Ocupado", sts_color: "rgb(248 113 113)" },
	{ sts_identification: 3, sts_name: "Away", sts_description: "Ausente", sts_color: "rgb(250 204 21)" },
	{ sts_identification: 4, sts_name: "Offline", sts_description: "Desconectado", sts_color: "rgb(156 163 175)" }
];

const statusColor = computed(() => {
	return userStore.user.usu_fk_sts_identification == undefined
		? "rgb(74 222 128)"
		: statuses[userStore.user.usu_fk_sts_identification - 1].sts_color;
});

function updateStatus(sts_identification) {
	if (sts_identification !== userStore.user.usu_fk_sts_identification) {
		userStore.user.usu_fk_sts_identification = sts_identification;
		userStore.updateUser();
	}
}
</script>
<template>
	<div class="py-3 px-4 w-full h-20 bg-indigo-500 hover:bg-indigo-600 ease-in-out duration-500 flex justify-between">
		<div class="flex flex-col">
			<h3 class="text-white text-2xl text-left font-bold rounded-xl">NChat</h3>
			<h3 class="text-white text-xl text-left font-bold rounded-xl w-12">{{ userStore.company.cpn_name }}</h3>
		</div>

		<div class="flex flex-col place-content-start">
			<div class="flex items-end justify-end" syle data-dropdown-toggle="dropdown">
				<button
					id="dropdownDefault"
					@click="changeStatus = !changeStatus"
					@focusout="changeStatus = false"
					title="Mudar status?"
					type="button">
					<img
						v-if="userStore.user.usu_photo"
						:src="userStore.user.usu_photo"
						class="inline-block h-12 w-12 rounded-full overflow-hidden"
						alt="" />
					<span v-else class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
						<svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					</span>
				</button>
				<div class="rounded-full h-4 w-4 fixed" :style="{ backgroundColor: statusColor }"></div>
			</div>
			<transition name="slide-fade" :duration="{ enter: 500, leave: 500 }">
				<div id="dropdown" class="z-10 bg-gray-100 w-36 rounded-lg" v-show="changeStatus">
					<ul>
						<li
							@click="updateStatus(status.sts_identification)"
							class="bg-gray-100 hover:bg-gray-300 p-2 rounded-lg"
							:style="{ color: status.sts_color }"
							aria-labelledby="dropdownDefault"
							v-for="status in statuses">
							{{ status.sts_description }}
						</li>
					</ul>
				</div>
			</transition>
		</div>
	</div>
</template>