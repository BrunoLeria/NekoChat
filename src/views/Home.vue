<script setup>
import SideMenu from "../components/SideMenu.vue";
import { shallowRef } from "vue";
import Dashboard from "./home/Dashboard.vue";
import Team from "./home/Team.vue";
import Chat from "./home/Chat.vue";
import Analytics from "./home/Analytics.vue";
import Settings from "./home/Settings.vue";

const components = {
	Dashboard,
	Team,
	Chat,
	Analytics,
	Settings
};

const activeComponent = "Dashboard";
</script>

<template>
	<div>
		<SideMenu v-model="activeComponent" />
		<div class="py-10 w-full bg-indigo-100 absolute top-0"></div>
		<transition name="component-fade" mode="out-in">
			<component :is="components[activeComponent]"></component>
		</transition>
		<div class="py-10 w-full bg-indigo-100 absolute bottom-0"></div>
	</div>
</template>

<style scoped>
a {
	color: #42b983;
}
</style>
