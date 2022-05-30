<script setup>
import { useTeamStore } from "../../services/stores/team";
import { useUsersStore } from "/src/services/stores/users.js";
import { ref, onMounted, computed } from "vue";

const teamStore = useTeamStore();
const usersStore = useUsersStore();
const emit = defineEmits(["update:modelValue"]);

const statusColor = (id) => {
	return userStore.statuses[id - 1].sts_color;
};

const officeName = (id) => {
	return usersStore.offices[id - 1].ofc_name;
};

function openUserConfig(id) {
	usersStore.findOneUser(id);
	emit("update:modelValue", "Chat");
}
</script>
<template>
	<div class="bg-neutral-100 p-14 grid grid-cols-3 gap-5 overflow-auto">
		<div
			v-for="member of teamStore.team"
			class="
				bg-white
				rounded-xl
				h-fit
				flex flex-col
				w-full
				shadow-lg
				border-gray-200 border-2
				hover:shadow-indigo-500 hover:border-indigo-500
				ease-in-out
				duration-500
			"
			:key="member.usu_identification">
			<div class="flex p-3 justify-between">
				<div class="flex flex-col p-3">
					<div class="flex">
						<h4 class="font-semibold text-lg">{{ member.usu_name }}</h4>
						<p v-if="member.usu_is_admin" class="mx-6 bg-green-100 text-emerald-700 rounded-full px-2 font-semibold text-base">Admin</p>
					</div>
					<p class="text-gray-500">{{ officeName(member.usu_fk_ofc_identification) }}</p>
				</div>
				<div class="flex items-end justify-end m-4">
					<img :src="member.usu_photo" v-if="member.usu_photo" :alt="member.usu_name + ' avatar'" class="rounded-full h-12 w-12 border-2" />
					<span v-else class="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
						<svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					</span>
					<div class="rounded-full h-3 w-3 fixed" :class="statusColor(member.usu_fk_sts_identification)"></div>
				</div>
			</div>
			<div class="flex">
				<button
					v-if="usersStore.user.usu_is_admin"
					class="
						w-full
						flex
						p-4
						justify-center
						text-gray-500
						rounded-bl-lg
						border-gray-200 border-t-2 border-r
						hover:bg-indigo-500 hover:text-white
						ease-in-out
						duration-500
					">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 mx-2"
						viewBox="0 0 20 20"
						fill="none"
						stroke="currentColor"
						stroke-width="2">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" />
					</svg>
					Configurações
				</button>
				<button
					class="
						w-full
						flex
						p-4
						justify-center
						text-gray-500
						rounded-br-lg
						border-gray-200 border-t-2 border-l
						hover:bg-indigo-500 hover:text-white
						ease-in-out
						duration-500
					">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 mx-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
					</svg>
					Chat
				</button>
			</div>
		</div>
	</div>
</template>