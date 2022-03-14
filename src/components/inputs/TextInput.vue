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
	},
	idField: {
		type: String,
		default: "text",
		required: true
	},
	fieldName: {
		type: String,
		default: ""
	},
	autoComplete: {
		type: String,
		default: ""
	},
	required: {
		type: Boolean,
		default: false
	}
});
</script>

<template>
	<div class="py-5">
		<label :for="idField" class="sr-only">{{ label }}</label>
		<input :id="idField" :name="fieldName" :type="type" :autocomplete="autoComplete" v-model="modelValue" :required="required" class="rounded-xl py-4 px-4 relative block w-full border border-gray-400 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" :placeholder="label" />
	</div>
</template>
