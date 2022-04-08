<script setup>
    import { useRouter } from "vue-router";

    const router = useRouter();
    defineProps({
        text: {
            type: String,
            default: "",
            required: true
        },
        link: {
            type: [String, Number, Boolean, Object, Array],
            default: "",
            required: false
        },
        route: {
            type: String,
            default: "",
            required: false
        }
    });
</script>

<template>
    <div class="text-sm">
        <a
            v-if="route"
            class="font-medium text-blue-600 hover:text-blue-500"
            @click="router.push({ name: route })">
            {{ text }}
        </a>
        <a
            v-else
            :href="link"
            class="font-medium text-blue-600 hover:text-blue-500">
            {{ text }}
        </a>
    </div>
</template>
