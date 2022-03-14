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
	idField: {
		type: String,
		default: "text",
		required: true
	}
});
</script>

<template>
	<div class="flex items-center">
		<input :id="idField" :name="idField" type="checkbox" v-model="modelValue" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
		<label :for="idField" class="ml-2 block text-sm text-gray-900"> {{ label }} </label>
	</div>
</template>