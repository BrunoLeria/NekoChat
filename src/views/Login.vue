<script setup>
import TextInput from "/src/components/inputs/TextInput.vue";
import Sublink from "/src/components/buttons/Sublink.vue";
import PasswordInput from "../components/inputs/PasswordInput.vue";
import logo from "/src/assets/nekologo.jpeg";
import { ref, onBeforeMount, onMounted } from "vue";
import { useUsersStore } from "/src/services/stores/users.js";
import { useStatusesStore } from "/src/services/stores/status.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errMsg = ref("");
const router = useRouter();
const userStore = useUsersStore();
const statusesStore = useStatusesStore();

onBeforeMount(() => {
	if (userStore.user.email != undefined) {
		router.push({ name: "Home" });
	}
});
onMounted(() => {
	document.title = "NChat - Login";
});

const signInWithEmail = () => {
	if (email.value === "") {
		errMsg.value = "Informe o e-mail";
		return;
	}
	if (password.value === "") {
		errMsg.value = "Informe a senha";
		return;
	}
	const auth = getAuth();
	signInWithEmailAndPassword(auth, email.value, password.value)
		.then((data) => {
			login(data);
		})
		.catch((error) => {
			switch (error.code) {
				case "auth/invalid-email":
					errMsg.value = "E-mail inválido";
					break;
				case "auth/user-not-found":
					errMsg.value = "Usuário não encontrado";
					break;
				case "auth/wrong-password":
					errMsg.value = "Senha incorreta";
					break;
				case "auth/too-many-requests":
					errMsg.value =
						"Muitas tentativas de login. Essa conta foi desativada por motivos de muitas tentativas de login inválidas. Por favor, tente novamente mais tarde ou crie uma nova senha pelo 'Esqueceu a sua senha?' .";
					break;
				default:
					errMsg.value = error.message;
					break;
			}
		});
};

async function login(data) {
	const userFound = await userStore.findOneUserByEmail(data.user.email);

	if (userFound) {
		await statusesStore.findAllStatuses();
		if (userStore.user.fk_statuses_identification !== 1 && userStore.user.fk_statuses_identification != undefined) {
			const newUser = { fk_statuses_identification: 1 };
			userStore.updateUser(newUser);
		}
	}

	if (userStore.user.identification == undefined) {
		errMsg.value = "Usuário não encontrado. Verifique com o suporte se ocorreu algum problema com o servidor.";
	} else {
		router.push({ name: "Home" });
	}
}
</script>

<template>
	<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" @keypress.enter="signInWithEmail()">
		<div class="max-w-md w-full space-y-8">
			<div>
				<img class="mx-auto h-36 w-auto rounded-full" :src="logo" alt="Workflow" />
				<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Entre com a sua conta</h2>
				<p class="mt-2 text-center text-sm text-gray-600">
					Ou
					<Sublink text="Registre-se gratuitamente." route="Register" />
				</p>
			</div>
			<form class="mt-8 space-y-6 border-slate-200 border-2 rounded-xl p-5 shadow-xl" action="#" method="POST">
				<input type="hidden" name="remember" value="true" />
				<div class="rounded-md shadow-sm -space-y-px">
					<p class="mt-2 text-center text-sm text-red-600" v-show="errMsg != ''">
						{{ errMsg }}
					</p>
					<TextInput label="Email" v-model="email" type="email" id="email" autoComplete="email" />
					<PasswordInput label="Senha" v-model="password" type="password" id="password"
						autoComplete="current-password" :password-score-show="false" />
					<div class="flex items-center justify-center">
						<Sublink text="Esqueceu a sua senha?" route="ForgotPassword" />
					</div>
				</div>
				<div>
					<button type="button" class="
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
						" @click="signInWithEmail">
						<span class="absolute left-0 inset-y-0 flex items-center pl-3">
							<!-- Heroicon name: solid/lock-closed -->
							<svg class="lock-closed h-5 w-5 text-blue-500 group-hover:text-blue-400"
								xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
								aria-hidden="true">
								<path fill-rule="evenodd"
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
