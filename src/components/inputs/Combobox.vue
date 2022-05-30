<script setup>
import { ref } from "@vue/runtime-core";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
	alternatives: { type: Array, required: false },
	idInstead: { type: Boolean, default: false },
	disabled: Boolean,
	modelValue: { type: [String, Number, Boolean, Object, Array] },
	id: String,
	required: Boolean,
	label: String
});
const valueOption = ref({});

async function selectedOption(name) {
	valueOption.value = await props.alternatives.find((option) => option.name === name);
	emit("update:modelValue", props.idInstead ? valueOption.id : valueOption.name);
}
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
			@change="selectedOption($event.target.value)"
			:placeholder="label">
			<option value="" disabled selected>Selecione um(a) {{ label.toLowerCase() }}</option>
			<option v-if="alternatives" v-for="alternative in alternatives" :key="alternative.id">
				{{ alternative.name }}
			</option>
		</select>
	</div>
</template>
