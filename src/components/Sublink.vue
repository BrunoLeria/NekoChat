<script setup>
defineProps({
	text: {
		type: String,
		default: "",
		required: true
	},
	link: {
		type: [String, Number, Boolean, Object, Array],
		default: "",
		required: true
	}
});
</script>

<template>
	<div class="text-sm">
		<a :href="link" class="font-medium text-blue-600 hover:text-blue-500"> {{ text }} </a>
	</div>
</template>