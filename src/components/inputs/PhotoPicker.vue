<script setup>
const props = defineProps({
	label: {
		type: String,
		default: "",
		required: true
	},
	modelValue: {
		type: [String, Number, Boolean, Object, Array, File],
		default: "",
		required: true
	},
	id: {
		type: String,
		default: "text",
		required: true
	},
	text: {
		type: String,
		default: "",
		required: true
	},
	required: {
		type: Boolean,
		default: false
	}
});
const emits = defineEmits(["update:modelValue"]);

function uploadImage(event) {
	const reader = new FileReader();
	reader.readAsDataURL(event.target.files[0]);
	reader.onload = () => {
		emits("update:modelValue", reader.result);
	};
}
</script>

<template>
	<label class="block text-sm font-medium text-gray-700">{{ label }}:</label>
	<div class="mt-4 flex items-center">
		<img v-if="modelValue" :src="modelValue" class="inline-block h-16 w-16 rounded-full overflow-hidden" alt="" />
		<span v-else class="inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-100">
			<svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
				<path
					d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
			</svg>
		</span>
		<label
			for="file-upload"
			class="
				flex
				content-center
				ml-5
				bg-white
				w-12
				py-2
				px-3
				border border-gray-300
				rounded-md
				shadow-sm
				text-sm
				leading-4
				font-medium
				text-gray-700
				hover:bg-gray-50
				focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
				file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700
				hover:file:bg-indigo-100
			">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
			</svg>
			<input id="file-upload" type="file" accept="image/*" @change="uploadImage" style="display: none" />
		</label>
	</div>
</template>

<style></style>
