<script setup>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import SideMenuButtons from "./SideMenuButtons.vue";
import SideMenuHeader from "./SideMenuHeader.vue";
import ContactList from "./ContactList.vue";

const router = useRouter();
const isLoggedIn = ref(false);
const emit = defineEmits(["update:modelValue"]);
const selected = ref("");

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
	<div class="flex-none h-full bg-indigo-700 auto-rows-max flex-none flex flex-col z-10 w-1/4">
		<SideMenuHeader />
		<ContactList :chat="selected" @update:modelValue="(newValue) => emit('update:modelValue', newValue)" />
		<SideMenuButtons @update:modelValue="(newValue) => emit('update:modelValue', newValue)" />
	</div>
	<!-- Sidebar -->
</template>