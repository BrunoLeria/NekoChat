import { defineStore } from "pinia";
import { ref } from "vue";
import _ from "lodash";

export const useFiltersStore = defineStore("filters", () => {
    const selected = ref(["onlyMine", "urgent", "waiting", "open", "closed", "onlyTheirs"]);
    const options = ref([
        {
            id: "showAllCheckBox",
            label: "Mostrar todos",
            name: "showAll",
            checkmarkColor: "text-green-600",
            value: true
        },
        {
            id: "onlyMineCheckBox",
            label: "Meus chamados",
            name: "onlyMine",
            checkmarkColor: "text-blue-600",
            value: true
        },
        {
            id: "urgentCheckBox",
            label: "Urgentes",
            name: "urgent",
            checkmarkColor: "text-red-600",
            value: true
        },
        {
            id: "waitingCheckBox",
            label: "Em espera",
            name: "waiting",
            checkmarkColor: "text-yellow-500",
            value: true
        },
        {
            id: "openCheckBox",
            label: "Ativos",
            name: "open",
            checkmarkColor: "text-emerald-700",
            value: true
        },
        {
            id: "closedCheckBox",
            label: "Finalizados",
            name: "closed",
            checkmarkColor: "text-gray-800",
            value: true
        },
        {
            id: "onlyTheirsCheckBox",
            label: "Com outros atendentes",
            name: "onlyTheirs",
            checkmarkColor: "text-fuchsia-600",
            value: true
        }
    ]);

    function setSelected(addOrRemove, value) {
        if (value == "showAll") {
            options.value.forEach((option) => {
                option.value = addOrRemove;
            });
            if (addOrRemove) {
                selected.value = ["onlyMine", "urgent", "waiting", "open", "closed", "onlyTheirs"];
            } else {
                selected.value = [];
            }
        } else if (addOrRemove) {
            selected.value.push(value);
            if (selected.value.length == options.value.length - 1) {
                options.value[0].value = true;
            }
        } else {
            options.value[0].value = false;
            selected.value = selected.value.filter((item) => item !== value);
        }
    }

    return {
        selected,
        options,
        setSelected
    };
});
