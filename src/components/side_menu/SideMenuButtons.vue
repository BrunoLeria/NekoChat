<script setup>
import { signOut, getAuth } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "/src/services/stores/users";

const auth = getAuth();
const userStore = useUsersStore();
const router = useRouter();
const emit = defineEmits(["update:modelValue"]);
const showLoggout = ref(false);
const showConfig = ref(false);
const showTeam = ref(false);

const handleSignOut = () => {
	signOut(auth).then(() => {
		updateStatus(4);
		userStore.user = {};
		router.push({ name: "Login" });
	});
};

function configLoggedUser() {
	userStore.configUser = false;
	emit("update:modelValue", "Settings");
}

function updateStatus(sts_identification) {
	if (sts_identification !== userStore.user.usu_fk_sts_identification) {
		userStore.user.usu_fk_sts_identification = sts_identification;
		userStore.updateUser();
	}
}
</script>
<template>
	<div class="flex justify-between">
		<div
			class="py-7 px-4 flex items bg-indigo-700 hover:bg-indigo-600 text-white text-lg md:text-base"
			@mouseover="showLoggout = true"
			@mouseleave="showLoggout = false"
			@click="handleSignOut">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
			</svg>
			<transition name="slide-fade" :duration="{ enter: 50, leave: 50 }">
				<h4 v-show="showLoggout" class="mx-3 sm:hidden lg:inline">Sair</h4>
			</transition>
		</div>
		<div
			class="py-7 px-4 flex items bg-indigo-700 hover:bg-indigo-600 text-white text-lg md:text-base"
			@mouseover="showConfig = true"
			@mouseleave="showConfig = false"
			@click="configLoggedUser">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
			</svg>
			<transition name="slide-fade" :duration="{ enter: 50, leave: 50 }">
				<h4 v-show="showConfig" class="mx-3 sm:hidden lg:inline">Configurações</h4>
			</transition>
		</div>
		<div
			class="py-7 px-4 flex items bg-indigo-700 hover:bg-indigo-600 text-white text-lg md:text-base"
			@mouseover="showTeam = true"
			@mouseleave="showTeam = false"
			@click="$emit('update:modelValue', 'Team')">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
			</svg>
			<transition name="slide-fade" :duration="{ enter: 50, leave: 50 }">
				<h4 v-show="showTeam" class="mx-3 sm:hidden lg:inline">Equipe</h4>
			</transition>
		</div>
	</div>
</template>