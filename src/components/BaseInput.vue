<script setup>
defineProps({
	label: {
		type: String,
		default: "",
		required: true
	},
	modelValue: {
		type: [String, Number, Boolean, Object, Array],
		default: "",
		required: true
	},
	type: {
		type: String,
		default: "text",
		required: true
	}
});
</script>

<template>
	<label>{{ label }}</label>
	<input :placeholder="label" class="field" :value="modelValue" :type="type" @input="$emit('update:modelValue', $event.target.value)" />
</template>


<style>
</style>