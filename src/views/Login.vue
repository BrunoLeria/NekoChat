<script setup>
    import TextInput from "/src/components/inputs/TextInput.vue";
    import Checkbox from "/src/components/inputs/Checkbox.vue";
    import Sublink from "/src/components/Sublink.vue";
    import logo from "/src/assets/logo.svg";

    let email = "";
    let password = "";
    let remember = false;
</script>

<template>
    <div
        class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img
                    class="mx-auto h-36 w-auto"
                    :src="logo"
                    alt="Workflow" />
                <h2
                    class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Entre com a sua conta
                </h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    Ou
                    <Sublink
                        text="inicie o seu teste grátis de 14 dias."
                        link="#" />
                </p>
            </div>
            <form
                class="mt-8 space-y-6 border-slate-200 border-2 rounded-xl p-5 shadow-xl"
                action="#"
                method="POST">
                <input
                    type="hidden"
                    name="remember"
                    value="true" />
                <div class="rounded-md shadow-sm -space-y-px">
                    <TextInput
                        label="Email"
                        v-model="email"
                        fieldName="email"
                        type="email"
                        id="email"
                        autoComplete="email" />
                    <TextInput
                        label="Senha"
                        v-model="password"
                        fieldName="password"
                        type="password"
                        id="password"
                        autoComplete="current-password" />
                </div>
                <div class="flex items-center justify-between">
                    <Checkbox
                        :id="'remeberCheckbox'"
                        :label="'Lembrar-me'"
                        v-model="remember" />
                    <Sublink
                        text="Esqueceu sua senha?"
                        link="https://tailwindui.com/" />
                </div>

                <div>
                    <button
                        type="button"
                        class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ease-in-out duration-500"
                        @click="login()">
                        <span
                            class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <!-- Heroicon name: solid/lock-closed -->
                            <svg
                                class="lock-closed h-5 w-5 text-blue-500 group-hover:text-blue-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </span>
                        Entrar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            login() {
                this.$router.push({ name: "Home" });
            }
        }
    };
</script>
