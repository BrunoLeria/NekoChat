<script setup>
import { computed } from "vue";

const props = defineProps({
	alternatives: { type: Array, required: false },
	idInstead: { type: Boolean, default: false },
	modelValue: { type: [String, Number, Boolean, Object, Array, File] },
	border: { type: String, default: "border border-gray-400" },
	padding: { type: String, default: "p-4" },
	backgroundColor: { type: String, default: "bg-white" },
	focusRing: { type: String, default: "focus:ring-indigo-500" },
	focusBorder: { type: String, default: "focus:border-indigo-500" },
	focusBackground: { type: String, default: "" },
	hoverBackground: { type: String, default: "" },
	textColorProp: { type: String, default: "" },
	disabled: Boolean,
	id: String,
	required: Boolean,
	label: String
});

const textColor = computed(() => {
	return props.modelValue === "" ? "text-gray-400" : "text-gray-900";
});

defineEmits(["update:modelValue"]);
</script>

<template>
	<div>
		<label class="block text-sm font-medium text-gray-700 py-3" v-show="label">{{ label }}:</label>
		<select
			:id="id"
			:name="id"
			:disabled="disabled"
			:required="required"
			class="rounded-xl relative block w-full placeholder-gray-400 focus:outline-none focus:z-10 sm:text-sm ease-in-out duration-500"
			:class="[
				textColorProp ? textColorProp : textColor,
				border,
				padding,
				backgroundColor,
				focusRing,
				focusBorder,
				focusBackground,
				hoverBackground
			]"
			v-model="modelValue"
			@change="$emit('update:modelValue', $event.target.value)"
			:placeholder="label">
			<option v-if="label" value="" disabled selected>Selecione um(a) {{ label.toLowerCase() }}</option>
			<option v-else value="" disabled selected></option>
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
