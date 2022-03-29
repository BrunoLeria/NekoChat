<script setup>
    import { ref, computed } from "vue";
    import zxcvbn from "zxcvbn";
    const props = defineProps({
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
        },
        required: {
            type: Boolean,
            default: false
        }
    });
    defineEmits(["update:modelValue"]);

    const showPasswordField = ref(false);
    const passwordScore = computed(() => {
        if (props.modelValue) return 0;
        return zxcvbn(props.modelValue).score + 1;
    });
</script>

<template>
    <div class="py-5">
        <label class="block text-sm font-medium text-gray-700">
            {{ label }}:
        </label>
        <div class="flex content-center">
            <input
                :type="showPasswordField ? 'password' : 'text'"
                :id="id"
                :name="id"
                v-model="modelValue"
                class="rounded-xl py-4 px-4 relative block w-full border border-gray-400 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                :placeholder="label"
                @input="$emit('update:modelValue', $event.target.value)" />
            <button
                class="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors"
                @click.prevent="showPasswordField = !showPasswordField">
                <div v-if="showPasswordField">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </div>
                <div v-else>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                </div>
            </button>
        </div>
        <div class="flex py-1">
            <div
                v-for="(v, i) in 5"
                class="w-1/5 px-1 h-2 rounded-xl transition-colors"
                :class="
                    i < passwordScore
                        ? passwordScore <= 2
                            ? 'bg-red-400'
                            : passwordScore <= 4
                            ? 'bg-yellow-400'
                            : 'bg-green-500'
                        : 'bg-gray-200'
                "></div>
        </div>
    </div>
</template>
