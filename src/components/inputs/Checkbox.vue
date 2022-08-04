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
	id: {
		type: String,
		default: "text",
		required: true
	},
	revert: {
		type: Boolean,
		default: false
	},
	checkmarkColor: {
		type: String,
		default: "text-indigo-600"
	}
});
defineEmits(["update:modelValue"]);
</script>

<template>
	<div class="p-2 flex items-center h-full min-w-max" :class="revert ? 'flex flex-row-reverse' : ''">
		<label for="checkbox" class="block text-sm font-medium text-gray-700 px-4 inline">{{ label }}:</label>
		<input
			:id="id"
			:name="id"
			type="checkbox"
			v-model="modelValue"
			@change="$emit('update:modelValue', $event.target.checked)"
			class="h-6 w-6 focus:ring-indigo-500 border-gray-300 rounded"
			:class="checkmarkColor" />
	</div>
</template>
