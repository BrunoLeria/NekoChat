<script setup>
import { ref } from "vue";
import Checkbox from "../inputs/Checkbox.vue";

const props = defineProps({
	search: {
		type: String,
		default: ""
	},
	selected: {
		type: Array,
		default: []
	}
});

const emit = defineEmits(["update:selected", "update:search"]);
const showFilters = ref(false);
const showAll = ref(true);
const onlyMine = ref(true);
const waiting = ref(true);
const open = ref(true);
const closed = ref(true);
const onlyTheirs = ref(true);

function setSelected(addOrRemove, value) {
	const aux = ref(props.selected);
	if (value == "showAll") {
		showAll.value = addOrRemove;
		onlyMine.value = addOrRemove;
		waiting.value = addOrRemove;
		open.value = addOrRemove;
		closed.value = addOrRemove;
		onlyTheirs.value = addOrRemove;

		if (addOrRemove) {
			aux.value = ["onlyMine", "waiting", "open", "closed", "onlyTheirs"];
		} else {
			aux.value = [];
		}
	} else if (addOrRemove) {
		aux.value.push(value);
		if (aux.value.length == 5) {
			showAll.value = true;
		}
	} else {
		showAll.value = false;
		aux.value = aux.value.filter((item) => item !== value);
	}
	emit("update:selected", aux.value);
}
</script>
<template>
	<div class="overflow-visible">
		<div class="w-full p-5 flex items-center space-x-5">
			<input
				type="text"
				class="w-full rounded-full bg-indigo-400 text-white placeholder:text-white border-white"
				:value="search"
				@input="$emit('update:search', $event.target.value)"
				placeholder="Search" />
			<div @click="showFilters = !showFilters">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
				</svg>
			</div>
		</div>
		<transition name="component-fade" mode="out-in" :duration="{ enter: 500, leave: 500 }">
			<div id="filters" v-show="showFilters" class="p-5 pt-0">
				<div class="w-full h-[10%] flex justify-enter items-center text-white text-2xl font-bold rounded-t-xl min-w-min p-2">
					<h3>Filtros:</h3>
				</div>
				<div
					class="
						bg-indigo-100
						rounded-b-xl
						shadow-lg
						border-gray-200 border-2
						hover:shadow-indigo-500 hover:border-indigo-500
						ease-in-out
						duration-500
						flex flex-col
						items-start
					">
					<Checkbox
						:id="'showAllCheckBox'"
						:label="'Mostrar todos'"
						class="w-full justify-between"
						:checkmark-color="'text-green-600'"
						v-model="showAll"
						@update:modelValue="setSelected(showAll, 'showAll')" />
					<Checkbox
						:id="'onlyMineCheckBox'"
						:label="'Meus chamados'"
						class="w-full justify-between"
						:checkmark-color="'text-blue-600'"
						v-model="onlyMine"
						@update:modelValue="setSelected(onlyMine, 'onlyMine')" />
					<Checkbox
						:id="'waitingCheckBox'"
						:label="'Urgentes'"
						class="w-full justify-between"
						:checkmark-color="'text-red-600'"
						v-model="waiting"
						@update:modelValue="setSelected(waiting, 'waiting')" />
					<Checkbox
						:id="'openCheckBox'"
						:label="'Ativos'"
						class="w-full justify-between"
						:checkmark-color="'text-emerald-600'"
						v-model="open"
						@update:modelValue="setSelected(open, 'open')" />
					<Checkbox
						:id="'closedCheckBox'"
						:label="'Finalizados'"
						class="w-full justify-between"
						:checkmark-color="'text-gray-600'"
						v-model="closed"
						@update:modelValue="setSelected(closed, 'closed')" />
					<Checkbox
						:id="'onlyTheirsCheckBox'"
						:label="'Com outros atendentes'"
						class="w-full justify-between"
						:checkmark-color="'text-yellow-600'"
						v-model="onlyTheirs"
						@update:modelValue="setSelected(onlyTheirs, 'onlyTheirs')" />
				</div>
			</div>
		</transition>
	</div>
</template>