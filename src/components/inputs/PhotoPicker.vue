<script setup>
import { computed } from "vue";

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

let base64 = null;
let imageSrc = null;

function removeImage() {
	base64 = null;
	imageSrc = null;
	emits("update:modelValue", null);
}

function urlToBase64(urlStorage) {
	function toDataURL(url, callback) {
		const xhr = new XMLHttpRequest();
		xhr.onload = function () {
			const reader = new FileReader();
			reader.onloadend = function () {
				callback(reader.result);
			};
			reader.readAsDataURL(xhr.response);
		};
		xhr.open("GET", url);
		xhr.responseType = "blob";
		xhr.send();
	}

	toDataURL(urlStorage, function (dataUrl) {
		base64 = dataUrl;
		emits("update:value", {
			base64: dataUrl,
			name: null,
			format: "png"
		});
	});
}

function uploadImage(event) {
	const reader = new FileReader();
	reader.readAsDataURL(event.target.files[0]);
	reader.onload = () => {
		const imageSrc = event.target.files[0];
		emits("update:modelValue", {
			base64: reader.result.replace(/^data:image\/[a-z]+;base64,/, ""),
			name: imageSrc.name,
			format: imageSrc.type.replace("image/", "")
		});
	};
}

const imageSource = computed(() => {
	return Object.keys(props.modelValue).length > 0 ? props.modelValue.base64 : props.modelValue;
});
</script>

<template>
	<label class="block text-sm font-medium text-gray-700">{{ label }}:</label>
	<div class="mt-4 flex items-center">
		<img :src="imageSource" v-if="modelValue" class="inline-block h-16 w-16 rounded-full overflow-hidden" alt="" />
		<span v-else class="inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-100">
			<svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
				<path
					d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
			</svg>
		</span>
		<input
			type="file"
			accept="image/*"
			@change="uploadImage"
			class="
				ml-5
				bg-white
				w-4/5
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
			" />
		<svg v-if="base64" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
	</div>
</template>

<style></style>
