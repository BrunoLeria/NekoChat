<script setup>
const props = defineProps({
	backgroundColor: {
		type: String,
		default: "bg-indigo-700"
	}
});
</script>

<template>
	<div class="flex-none h-full auto-rows-max flex flex-col z-10 w-full" :class="backgroundColor">
		<div class="flex justify-center items-center h-full">
			<div class="fulfilling-bouncing-circle-spinner">
				<div class="circle"></div>
				<div class="orbit"></div>
			</div>
		</div>
	</div>
</template>
<style>
.fulfilling-bouncing-circle-spinner,
.fulfilling-bouncing-circle-spinner * {
	box-sizing: border-box;
}

.fulfilling-bouncing-circle-spinner {
	height: 60px;
	width: 60px;
	position: relative;
	animation: fulfilling-bouncing-circle-spinner-animation infinite 4000ms ease;
}

.fulfilling-bouncing-circle-spinner .orbit {
	height: 60px;
	width: 60px;
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 50%;
	border: calc(60px * 0.03) solid rgb(67 56 202);
	animation: fulfilling-bouncing-circle-spinner-orbit-animation infinite 4000ms ease;
}

.fulfilling-bouncing-circle-spinner .circle {
	height: 60px;
	width: 60px;
	color: rgb(67 56 202);
	display: block;
	border-radius: 50%;
	position: relative;
	border: calc(60px * 0.1) solid rgb(67 56 202);
	animation: fulfilling-bouncing-circle-spinner-circle-animation infinite 4000ms ease;
	transform: rotate(0deg) scale(1);
}

@keyframes fulfilling-bouncing-circle-spinner-animation {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

@keyframes fulfilling-bouncing-circle-spinner-orbit-animation {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1);
	}
	62.5% {
		transform: scale(0.8);
	}
	75% {
		transform: scale(1);
	}
	87.5% {
		transform: scale(0.8);
	}
	100% {
		transform: scale(1);
	}
}

@keyframes fulfilling-bouncing-circle-spinner-circle-animation {
	0% {
		transform: scale(1);
		border-color: transparent;
		border-top-color: inherit;
	}
	16.7% {
		border-color: transparent;
		border-top-color: initial;
		border-right-color: initial;
	}
	33.4% {
		border-color: transparent;
		border-top-color: inherit;
		border-right-color: inherit;
		border-bottom-color: inherit;
	}
	50% {
		border-color: inherit;
		transform: scale(1);
	}
	62.5% {
		border-color: inherit;
		transform: scale(1.4);
	}
	75% {
		border-color: inherit;
		transform: scale(1);
		opacity: 1;
	}
	87.5% {
		border-color: inherit;
		transform: scale(1.4);
	}
	100% {
		border-color: transparent;
		border-top-color: inherit;
		transform: scale(1);
	}
}
</style>