<script setup>
import { defineProps, defineEmits } from "vue";
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<template>
	<div class="py-2">
		<input type="checkbox" class="w-7 h-7" v-model="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
	</div>
</template>