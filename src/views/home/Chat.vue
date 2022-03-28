<script setup>
    import TextInput from "/src/components/inputs/TextInput.vue";

    let mensagens = [
        {
            id: 1,
            mensagem: "Olá, tudo bem?",
            usuario: "João",
            data: "01/01/2020"
        },
        {
            id: 2,
            mensagem: "Tudo bem, obrigado!",
            usuario: "Maria",
            data: "01/01/2020"
        }
    ];
    let mensagem = "";
</script>

<template>
    <div class="bg-neutral-100 p-14 flex flex-col flex-wrap justify-between">
        <div class="flex flex-col">
            <div
                id="mensagens"
                class="bg-blue-100 p-5 rounded-xl w-fit h-fit">
                <h3 class="text-indigo-700 break-words capitalize font-bold">
                    Nome pessoa
                </h3>
                <p class="my-3 break-words">
                    Mensagem bem extensiva adad
                    dhuiaddoiajdioajojosjodijsjodjdoiajsodjjdaodajoissoijdoajsoadjaod
                </p>
            </div>
            <div
                id="mensagens"
                class="bg-indigo-100 p-5 rounded-xl w-fit h-fit my-7 place-self-end">
                <h3
                    class="text-indigo-700 break-words capitalize font-bold place-self-end">
                    Nome pessoa
                </h3>
                <p class="my-3 break-words">
                    Mensagem bem extensiva adad
                    dhuiaddoiajdioajojosjodijsjodjdoiajsodjjdaodajoissoijdoajsoadjaod
                </p>
            </div>
        </div>
        <div class="w-full flex items-center">
            <TextInput
                label="Digite sua mensagem aqui"
                :modelValue="mensagem"
                fieldName="mensagem"
                type="text"
                id="mensagem"
                autoComplete="mensagem"
                class="w-full" />
            <button
                type="button"
                class="mx-3 flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-full text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ease-in-out duration-500 w-12 h-12"
                @click="login()">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-7 w-7"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
    export default {};
</script>

<style></style>
