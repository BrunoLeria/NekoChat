<script setup>
import TextInput from "/src/components/inputs/TextInput.vue";
import PasswordInput from "/src/components/inputs/PasswordInput.vue";
import Sublink from "/src/components/buttons/Sublink.vue";
import logo from "/src/assets/logo.svg";
import { ref } from "vue";
import { useUsersStore } from "/src/services/stores/users.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import zxcvbn from "zxcvbn";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errMsg = ref("");
const router = useRouter();
const userStore = useUsersStore();
const logging = ref(false);

const register = (e) => {
	e.preventDefault();
	logging.value = true;
	if (zxcvbn(password.value).score + 1 < 4) {
		errMsg.value = "A senha deve conter pelo menos 4 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 número.";
		return;
	}
	if (password.value != confirmPassword.value) {
		errMsg.value = "As senhas não conferem.";
		return;
	}
	const auth = getAuth();
	createUserWithEmailAndPassword(auth, email.value, password.value)
		.then((data) => {
			login(data);
		})
		.catch((error) => {
			switch (error.code) {
				case "auth/email-already-in-use":
					errMsg.value = "Este email já está em uso.";
					break;

				case "auth/invalid-email":
					errMsg.value = "Este email não é válido.";
					break;

				case "auth/operation-not-allowed":
					errMsg.value = "Não é possível criar usuários.";
					break;

				case "auth/weak-password":
					errMsg.value = "A senha é muito fraca.";
					break;
				default:
					errMsg.value = error.message;
					break;
			}
		});
};

async function login(data) {
	userStore.user.usu_name = data.user.displayName;
	userStore.user.usu_email = data.user.email;
	userStore.user.usu_photo = data.user.photoURL;
	userStore.user.usu_password = password.value;
	userStore.user.usu_fk_sts_identification = 1;
	userStore.user.usu_fk_ofc_identification = 1;
	userStore.user.usu_fk_cpn_identification = 37;
	await userStore
		.createUser()
		.then(() => {
			router.push({ name: "Home" });
		})
		.catch((error) => {
			errMsg.value = "Ocorreu um erro ao tentar criar um novo usuário. Por favor, contate o nosso suporte:" + error.message;
		})
		.finally(() => {
			logging.value = false;
		});
}
</script>

<template>
	<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-md w-full space-y-8">
			<div>
				<img class="mx-auto h-36 w-auto" :src="logo" alt="Workflow" />
				<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Cadastre a sua conta</h2>
				<p class="mt-2 text-center text-sm text-gray-600">
					Ou
					<Sublink text="Possui uma conta, entre aqui." route="Login" />
				</p>
			</div>
			<form class="mt-8 space-y-6 border-slate-200 border-2 rounded-xl p-5 shadow-xl" action="#" method="POST" @submit="register">
				<input type="hidden" name="remember" value="true" />
				<div class="rounded-md shadow-sm -space-y-px">
					<p class="mt-2 text-center text-sm text-red-600" v-show="errMsg != ''">
						{{ errMsg }}
					</p>
					<TextInput label="Email" v-model="email" type="email" id="email" autoComplete="email" />
					<PasswordInput label="Senha" type="password" id="password" v-model="password" />
					<TextInput label="Confirmar senha" v-model="confirmPassword" type="password" id="confirmPassword" />
				</div>
				<div>
					<button
						type="submit"
						class="
							group
							relative
							w-full
							flex
							justify-center
							py-4
							px-4
							border border-transparent
							text-sm
							font-medium
							rounded-full
							text-white
							bg-blue-900
							hover:bg-blue-700
							focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
							ease-in-out
							duration-500
						"
						:disabled="logging">
						<span class="absolute left-0 inset-y-0 flex items-center pl-3">
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
