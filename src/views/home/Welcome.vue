<script setup>
import { useTalkStore } from "../../services/stores/talks";

const emit = defineEmits(["update:modelValue"]);
const talkStore = useTalkStore();
</script>
<template>
	<div class="bg-neutral-100 p-14 flex gap-5"></div>
</template>

<style></style>
