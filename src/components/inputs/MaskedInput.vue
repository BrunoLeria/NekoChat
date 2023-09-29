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
	id: {
		type: String,
		default: "text",
		required: true
	},
	autoComplete: {
		type: String,
		default: ""
	},
	required: {
		type: Boolean,
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	},
	pattern: {
		type: String,
		default: ""
	},
    max: {
        type: Number,
        default: 0
    }
});
defineEmits(["update:modelValue"]);
</script>

<template>
	<div class="py-5">
		<label class="block text-sm font-medium text-gray-700">{{ label }}:</label>
		<input :id="id" :name="id" :type="type" :autocomplete="autoComplete" :disabled="disabled" v-model="modelValue"
			@input="$emit('update:modelValue', $event.target.value)" :required="required" class="
				rounded-xl
				p-4
				relative
				block
				w-full
				border border-gray-400
				placeholder-gray-400
				text-gray-900
				focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10
				sm:text-sm
			" :class="disabled ? 'bg-gray-200' : 'bg-white'" :placeholder="label" v-mask="pattern" :maxlength="max"/>
	</div>
</template>
