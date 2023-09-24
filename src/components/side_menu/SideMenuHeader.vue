<script setup>
import { useUsersStore } from "/src/services/stores/users";
import { ref, computed } from "vue";
import { useStatusesStore } from "/src/services/stores/status";

const userStore = useUsersStore();
const statuses = useStatusesStore().statuses;
const changeStatus = ref(false);

const statusColor = computed(() => {
	return userStore.user.fk_statuses_identification == undefined
		? "rgb(74 222 128)"
		: statuses[userStore.user.fk_statuses_identification - 1].color;
});

function updateStatus(identification) {
	if (identification !== userStore.user.fk_statuses_identification) {
		userStore.user.fk_statuses_identification = identification;
		userStore.updateUser();
	}
}
</script>
<template>
	<div class="py-3 px-4 w-full h-20 bg-indigo-500 hover:bg-indigo-600 ease-in-out duration-500 flex justify-between">
		<div class="flex flex-col">
			<h3 class="text-white text-2xl text-left font-bold rounded-xl">NChat</h3>
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
						v-if="userStore.user.photo"
						:src="userStore.user.photo"
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
							@click="updateStatus(status.identification)"
							class="bg-gray-100 hover:bg-gray-300 p-2 rounded-lg"
							:style="{ color: status.color }"
							aria-labelledby="dropdownDefault"
							v-for="status in statuses">
							{{ status.description }}
						</li>
					</ul>
				</div>
			</transition>
		</div>
	</div>
</template>