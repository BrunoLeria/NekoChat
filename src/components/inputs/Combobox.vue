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
        },
        options: {
            type: Array,
            default: []
        }
    });
</script>

<template>
    <div class="py-5">
        <label
            :for="idField"
            class="sr-only">
            {{ label }}
        </label>
        <select
            :id="idField"
            :name="fieldName"
            :autocomplete="autoComplete"
            v-model="modelValue"
            :placeholder="label"
            :required="required"
            class="rounded-xl py-4 px-4 relative block w-full border border-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ease-in-out duration-500">
            <option
                value=""
                disabled
                selected
                class="text-gray-400">
                Select your option
            </option>
            <option
                v-for="option in options"
                :value="option">
                {{ option }}
            </option>
        </select>
    </div>
</template>
