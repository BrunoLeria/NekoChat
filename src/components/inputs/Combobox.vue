<script setup>
const props = defineProps({
	alternatives: { type: Array, required: false },
	idInstead: { type: Boolean, default: false },
	modelValue: { type: [String, Number, Boolean, Object, Array, File] },
	disabled: Boolean,
	id: String,
	required: Boolean,
	label: String
});

defineEmits(["update:modelValue"]);
</script>

<template>
	<div>
		<label class="block text-sm font-medium text-gray-700">{{ label }}:</label>
		<select
			:id="id"
			:name="id"
			:disabled="disabled"
			:required="required"
			class="
				p-4
				rounded-xl
				relative
				block
				w-full
				border border-gray-400
				placeholder-gray-400
				focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10
				sm:text-sm
			"
			:class="modelValue === '' ? 'text-gray-400' : 'text-gray-900'"
			v-model="modelValue"
			@change="$emit('update:modelValue', $event.target.value)"
			:placeholder="label">
			<option value="" disabled selected>Selecione um(a) {{ label.toLowerCase() }}</option>
			<option
				v-if="alternatives"
				v-for="alternative in alternatives"
				:key="alternative.id"
				:value="idInstead ? alternative.id : alternative.name">
				{{ alternative.name }}
			</option>
		</select>
	</div>
</template>
