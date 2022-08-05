<script setup>
import SideMenu from "../components/side_menu/SideMenu.vue";
import { ref } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useUsersStore } from "../services/stores/users";
import { useRouter } from "vue-router";

const props = defineProps({
	resource: {
		type: String,
		required: true,
		default: "página"
	},
	redirect: {
		type: String,
		required: false,
		default: "Login"
	}
});
const router = useRouter();
const auth = getAuth();
const userStore = useUsersStore();
const activeComponent = ref("Dashboard");

const handleSignOut = () => {
	signOut(auth).then(() => {
		userStore.user = {};
		router.push({ name: props.redirect });
	});
};
</script>

<template>
	<div class="flex h-full bg-white dark:bg-slate-90">
		<SideMenu v-model="activeComponent" />
		<div class="flex-1 flex flex-col max-w-[85%] h-full">
			<div class="py-6 bg-indigo-100">
				<transition name="slide-fade">
					<h3 class="text-indigo-700 text-2xl text-left ml-4 font-bold rounded-xl">Oops!</h3>
				</transition>
			</div>
			<div class="h-full flex flex-col justify-center items-center">
				<h2 class="text-indigo-500 text-xl text-left ml-4 font-bold rounded-xl m-3">
					A {{ resource }} que você está procurando não está aqui.
				</h2>
				<p @click="handleSignOut" class="text-blue-500 underline">Voltar para a página de Login</p>
			</div>
			<div class="py-10 bg-indigo-100"></div>
		</div>
	</div>
</template>