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
        }
    });
    defineEmits(["update:modelValue"]);
</script>

<template>
    <div class="p-2">
        <label
            for="checkbox"
            class="text-md text-gray-500 px-4">
            {{ label }}
        </label>
        <input
            :id="id"
            :name="id"
            type="checkbox"
            v-model="modelValue"
            @change="$emit('update:modelValue', $event.target.checked)"
            class="h-6 w-6 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
    </div>
</template>
