<script setup>
import { useRouter } from "vue-router";
import SideMenu from "../components/side_menu/SideMenu.vue";

const router = useRouter();
</script>

<template>
	<div class="flex h-full bg-white dark:bg-slate-90">
		<SideMenu />
		<div class="flex-1 flex flex-col max-w-[85%] h-full">
			<div class="py-6 bg-indigo-100">
				<transition name="slide-fade">
					<h3 class="text-indigo-700 text-2xl text-left ml-4 font-bold rounded-xl">Uh-Oh!</h3>
				</transition>
			</div>
			<div class="h-full flex flex-col justify-center items-center">
				<h2 class="text-indigo-500 text-xl text-left ml-4 font-bold rounded-xl m-3">
					Parece que está tendo problemas de conexão, por favor de uma respirada e
					<a href="#" @click="$router.go(-1)" class="text-blue-500 underline">clique aqui</a>
					para tentar novamente.
				</h2>
			</div>
			<div class="py-10 bg-indigo-100"></div>
		</div>
	</div>
</template>