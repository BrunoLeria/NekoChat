import { defineStore } from "pinia";

export const useAddressStore = defineStore("countryID", {
    state: () => ({
        countries: [],
        states: [
            {
                id: 0,
                sigla: "AC",
                name: "Acre"
            },
            {
                id: 1,
                sigla: "AL",
                name: "Alagoas"
            },
            {
                id: 2,
                sigla: "AP",
                name: "Amapá"
            },
            {
                id: 3,
                sigla: "AM",
                name: "Amazonas"
            },
            {
                id: 4,
                sigla: "BA",
                name: "Bahia"
            },
            {
                id: 5,
                sigla: "CE",
                name: "Ceará"
            },
            {
                id: 6,
                sigla: "DF",
                name: "Distrito Federal"
            },
            {
                id: 7,
                sigla: "ES",
                name: "Espírito Santo"
            },
            {
                id: 8,
                sigla: "GO",
                name: "Goiás"
            },
            {
                id: 9,
                sigla: "MA",
                name: "Maranhão"
            },
            {
                id: 10,
                sigla: "MT",
                name: "Mato Grosso"
            },
            {
                id: 11,
                sigla: "MS",
                name: "Mato Grosso do Sul"
            },
            {
                id: 12,
                sigla: "MG",
                name: "Minas Gerais"
            },
            {
                id: 13,
                sigla: "PA",
                name: "Pará"
            },
            {
                id: 14,
                sigla: "PB",
                name: "Paraíba"
            },
            {
                id: 15,
                sigla: "PR",
                name: "Paraná"
            },
            {
                id: 16,
                sigla: "PE",
                name: "Pernambuco"
            },
            {
                id: 17,
                sigla: "PI",
                name: "Piauí"
            },
            {
                id: 18,
                sigla: "RJ",
                name: "Rio de Janeiro"
            },
            {
                id: 19,
                sigla: "RN",
                name: "Rio Grande do Norte"
            },
            {
                id: 20,
                sigla: "RS",
                name: "Rio Grande do Sul"
            },
            {
                id: 21,
                sigla: "RO",
                name: "Rondônia"
            },
            {
                id: 22,
                sigla: "RR",
                name: "Roraima"
            },
            {
                id: 23,
                sigla: "SC",
                name: "Santa Catarina"
            },
            {
                id: 24,
                sigla: "SP",
                name: "São Paulo"
            },
            {
                id: 25,
                sigla: "SE",
                name: "Sergipe"
            },
            {
                id: 26,
                sigla: "TO",
                name: "Tocantins"
            }
        ],
        cities: []
    })
});
