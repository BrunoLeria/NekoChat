
<template>
	<div id="app">
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
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
</style>