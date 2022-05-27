<script setup>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useTalkStore } from "/src/services/stores/talks";
import { useUsersStore } from "/src/services/stores/users.js";

defineEmits(["update:modelValue"]);
const router = useRouter();
const isLoggedIn = ref(false);
const talkStore = useTalkStore();
const userStore = useUsersStore();

let auth;

onMounted(() => {
	auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			isLoggedIn.value = true;
			return;
		}
		isLoggedIn.value = false;
		router.push({ name: "Login" });
	});
});

const handleSignOut = () => {
	signOut(auth).then(() => {
		if (userStore.user.usu_fk_sts_identification !== 4) {
			userStore.user.usu_fk_sts_identification = 4;
			userStore.updateUser();
		}
		userStore.user = {};
		router.push({ name: "Login" });
	});
};

const updateYourRegister = () => {
	if (userStore.user.usu_name === "") {
		return true;
	}
	return false;
};

const statusColor = computed(() => {
	switch (userStore.user.usu_fk_sts_identification) {
		case 1:
			return "bg-green-400";
		case 2:
			return "bg-red-400";
		case 3:
			return "bg-yellow-400";
		default:
			return "bg-gray-400";
	}
});

const imageSource = computed(() => {
	// if (userStore.user.usu_photo.includes("http")) return userStore.user.usu_photo;
	// else if (userStore.user.usu_photo.includes("data:image/png;base64,")) return userStore.user.usu_photo;
	return "data:image/png;base64," + userStore.user.usu_photo;
});
</script>
<template>
	<!-- Sidebar -->
	<div class="flex-none xl:w-1/6 w-1/8 h-full min-w-min bg-indigo-700 auto-rows-max flex-none flex flex-col z-10">
		<div class="py-5 px-4 w-full bg-indigo-500 hover:bg-indigo-600 ease-in-out duration-500 flex justify-between">
			<h3 class="text-white text-2xl text-left font-bold rounded-xl">NekoChat</h3>
			<div class="flex items-end">
				<img :src="imageSource" v-if="userStore.user.usu_photo" class="inline-block h-10 w-10 rounded-full overflow-hidden" alt="" />
				<span v-else class="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
					<svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
					</svg>
				</span>
				<div class="rounded-full h-3 w-3 fixed" :class="statusColor"></div>
			</div>
		</div>
		<div class="py-5 text-white text-xl flex flex-col flex-1 content-start">
			<div
				class="p-4 flex items hover:bg-indigo-600 ease-in-out duration-500"
				:class="$attrs.modelValue == 'Dashboard' ? 'bg-indigo-600' : ''"
				@click="$emit('update:modelValue', 'Dashboard')">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
				</svg>
				<h4 class="ml-4 text-center">Dashboard</h4>
			</div>
			<div
				class="p-4 flex items hover:bg-indigo-600 ease-in-out duration-500"
				:class="$attrs.modelValue == 'Team' ? 'bg-indigo-600' : ''"
				@click="$emit('update:modelValue', 'Team')">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
				</svg>
				<h4 class="ml-4 text-center">Time</h4>
			</div>
			<div
				v-if="talkStore.selected"
				class="p-4 flex items hover:bg-indigo-600 ease-in-out duration-500"
				:class="$attrs.modelValue == 'Chat' ? 'bg-indigo-600' : ''"
				@click="$emit('update:modelValue', 'Chat')">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
				</svg>
				<h4 class="ml-4 text-center">Chat</h4>
			</div>
			<!-- <div
                class="p-4 flex items hover:bg-indigo-600 ease-in-out duration-500"
                :class="$attrs.modelValue == 'Analytics' ? 'bg-indigo-600' : ''"
                @click="$emit('update:modelValue', 'Analytics')">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h4 class="ml-4 text-center">Relatórios</h4>
            </div> -->
			<div
				class="p-4 flex items hover:bg-indigo-600 ease-in-out duration-500"
				:class="$attrs.modelValue == 'Settings' ? 'bg-indigo-600' : ''"
				@click="$emit('update:modelValue', 'Settings')">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
				<h4 class="ml-4 text-center">Configurações</h4>
			</div>
		</div>
		<div class="py-6 px-4 flex items bg-indigo-700 w-full hover:bg-indigo-600 text-white text-xl ease-in-out duration-500" @click="handleSignOut">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
			</svg>
			<h4 class="mx-4">Sair</h4>
		</div>
	</div>
	<!-- Sidebar -->
</template>
<style></style>
