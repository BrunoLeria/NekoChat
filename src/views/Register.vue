<script setup>
    import TextInput from "/src/components/inputs/TextInput.vue";
    import PasswordInput from "/src/components/inputs/PasswordInput.vue";
    import Sublink from "/src/components/buttons/Sublink.vue";
    import logo from "/src/assets/logo.svg";
    import { ref } from "vue";
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { useRouter } from "vue-router";

    let email = ref("");
    let password = ref("");
    let confirmPassword = ref("");
    const router = useRouter();

    const register = () => {
        if (password.value !== confirmPassword.value) {
            console.log("Passwords do not match");
            alert("Passwords do not match");
            return;
        }
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((data) => {
                console.log("User created");
                console.log(auth.currentUser);
                router.push({ name: "Home" });
            })
            .catch((error) => {
                console.log(error.code);
                alert(error.message);
            });
    };
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
                    Cadastre a sua conta
                </h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    Ou
                    <Sublink
                        text="Possui uma conta, entre aqui."
                        route="Login" />
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
                        type="email"
                        id="email"
                        autoComplete="email" />
                    <PasswordInput
                        label="Senha"
                        type="password"
                        id="password"
                        v-model="password" />
                    <TextInput
                        label="Confirmar senha"
                        v-model="confirmPassword"
                        type="password"
                        id="confirmPassword" />
                </div>
                <div>
                    <button
                        type="button"
                        class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ease-in-out duration-500"
                        @click="register()">
                        <span
                            class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="lock-closed h-5 w-5 text-blue-500 group-hover:text-blue-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>
                        Criar conta
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
