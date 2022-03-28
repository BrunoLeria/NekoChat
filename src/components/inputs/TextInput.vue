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
        <label
            :for="id"
            class="sr-only">
            {{ label }}
        </label>
        <input
            :id="id"
            :name="fieldName"
            :type="type"
            :autocomplete="autoComplete"
            v-model="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :required="required"
            class="rounded-xl py-4 px-4 relative block w-full border border-gray-400 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            :placeholder="label" />
    </div>
</template>
