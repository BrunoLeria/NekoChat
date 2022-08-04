<script setup>
import { ref } from "vue";
import Checkbox from "./inputs/Checkbox.vue";

const emit = defineEmits(["update:modelValue"]);

const selected = ref(["onlyMine", "urgent", "active", "finished", "onlyTheirs"]);

const showAll = ref(true);
const onlyMine = ref(true);
const urgent = ref(true);
const active = ref(true);
const finished = ref(true);
const onlyTheirs = ref(true);

function setSelected(addOrRemove, value) {
	if (value == "showAll") {
		showAll.value = addOrRemove;
		onlyMine.value = addOrRemove;
		urgent.value = addOrRemove;
		active.value = addOrRemove;
		finished.value = addOrRemove;
		onlyTheirs.value = addOrRemove;

		if (addOrRemove) {
			selected.value = ["onlyMine", "urgent", "active", "finished", "onlyTheirs"];
		} else {
			selected.value = [];
		}
	} else if (addOrRemove) {
		selected.value.push(value);
		if (selected.value.length == 5) {
			showAll.value = true;
		}
	} else {
		showAll.value = false;
		selected.value = selected.value.filter((item) => item !== value);
	}
	emit("update:modelValue", selected);
}
</script>
<template>
	<div id="filters">
		<div class="w-full h-[10%] flex justify-center items-center bg-indigo-100 text-indigo-700 text-2xl font-bold rounded-t-xl min-w-min">
			<h3>Filtros</h3>
		</div>
		<div
			class="
				bg-white
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
				:checkmark-color="'text-red-600'"
				v-model="showAll"
				@update:modelValue="setSelected(showAll, 'showAll')" />
			<Checkbox
				:id="'onlyMineCheckBox'"
				:label="'Meus chamados'"
				class="w-full justify-between"
				:checkmark-color="'text-red-600'"
				v-model="onlyMine"
				@update:modelValue="setSelected(onlyMine, 'onlyMine')" />
			<Checkbox
				:id="'urgentCheckBox'"
				:label="'Urgentes'"
				class="w-full justify-between"
				:checkmark-color="'text-red-600'"
				v-model="urgent"
				@update:modelValue="setSelected(urgent, 'urgent')" />
			<Checkbox
				:id="'activeCheckBox'"
				:label="'Ativos'"
				class="w-full justify-between"
				:checkmark-color="'text-red-600'"
				v-model="active"
				@update:modelValue="setSelected(active, 'active')" />
			<Checkbox
				:id="'finishedCheckBox'"
				:label="'Finalizados'"
				class="w-full justify-between"
				:checkmark-color="'text-red-600'"
				v-model="finished"
				@update:modelValue="setSelected(finished, 'finished')" />
			<Checkbox
				:id="'onlyTheirsCheckBox'"
				:label="'Com outros atendentes'"
				class="w-full justify-between"
				:checkmark-color="'text-red-600'"
				v-model="onlyTheirs"
				@update:modelValue="setSelected(onlyTheirs, 'onlyTheirs')" />
		</div>
	</div>
</template>


<style>
</style>