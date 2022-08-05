<script setup>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import SideMenuButtons from "./SideMenuButtons.vue";
import SideMenuHeader from "./SideMenuHeader.vue";

const router = useRouter();
const isLoggedIn = ref(false);
const emit = defineEmits(["update:modelValue"]);

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
</script>
<template>
	<!-- Sidebar -->
	<div class="flex-none xl:w-1/4 w-1/4 h-full min-w-min bg-indigo-700 auto-rows-max flex-none flex flex-col z-10 max-w-[25%]">
		<SideMenuHeader />
		<div class="py-5 text-white text-xl flex flex-col flex-1 content-start"></div>
		<SideMenuButtons @update:modelValue="(newValue) => emit('update:modelValue', newValue)" />
	</div>
	<!-- Sidebar -->
</template>
<style></style>
                         