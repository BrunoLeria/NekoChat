<script setup>
import { ref } from "vue";

const props = defineProps({
	message: String
});

const isOpen = ref(false);
</script>
<template>
	<teleport to="body">
		<div class="model">
			<div>
				<h2>Atenção:</h2>
				<p>{{ props.message }}</p>
				<button @click="">Fechar</button>
			</div>
		</div>
	</teleport>
</template>
<style>
.modal {
	position: absolute;
	top: 0;
	left: 0;
	background-color: 0, 0, 0, 0.1;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal > div {
	background-color: white;
	padding: 50px;
	border-radius: 10px;
}
</style>