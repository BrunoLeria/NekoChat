<script setup>
import { provide } from "vue";
import firebaseMessaging from "./services/firebase";

provide("messaging", firebaseMessaging);
</script>
<template>
	<div id="app" class="h-full w-full fixed">
		<router-view v-slot="{ Component }">
			<transition name="component-fade" mode="out-in">
				<component :is="Component"></component>
			</transition>
		</router-view>
	</div>
</template>

<style>
.component-fade-enter-active,
.component-fade-leave-active {
	transition: opacity 0.3s ease;
}
.component-fade-enter, 
.component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
	transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
	transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateX(20px);
	opacity: 0;
}
</style>
