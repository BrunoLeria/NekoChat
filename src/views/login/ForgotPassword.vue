<script setup>
import TextInput from "/src/components/inputs/TextInput.vue";
import PasswordInput from "/src/components/inputs/PasswordInput.vue";
import Sublink from "/src/components/buttons/Sublink.vue";
import logo from "/src/assets/logo.svg";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const infoMsg = ref("");
const email = ref("");
const sucess = ref(false);
const router = useRouter();

function sendEmailPasswordRecovery() {
	const auth = getAuth();
	sendPasswordResetEmail(auth, email.value)
		.then(() => {
			sucess.value = true;
			infoMsg.value = "E-mail enviado com sucesso. Por favor, verifique sua caixa de entrada. Redirecionando para tela de login em 5 segundos.";
			setTimeout(() => {
				router.push({ name: "Login" });
			}, 5000);
		})
		.catch((error) => {
			sucess.value = false;
			switch (error.code) {
				case "auth/invalid-email":
					infoMsg.value = "Este email não é válido.";
					break;
				case "auth/user-not-found":
					infoMsg.value = "Este email não está cadastrado.";
					break;
				case "auth/missing-email":
					infoMsg.value = "Por favor, informe seu e-mail.";
					break;
				default:
					infoMsg.value = "Ocorreu um erro ao enviar o email. Contate o suporte sobre o erro: " + error.message;
					break;
			}
		});
}
</script>

<template>
	<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" @keypress.enter="sendEmailPasswordRecovery()">
		<div class="max-w-md w-full space-y-8">
			<div>
				<img class="mx-auto h-36 w-auto" :src="logo" alt="Workflow" />
				<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Esqueceu a sua senha?</h2>
				<p class="mt-2 text-center text-sm text-gray-600">
					Ou
					<Sublink text="Voltar para tela de login" route="Login" />
				</p>
			</div>
			<form class="mt-8 space-y-6 border-slate-200 border-2 rounded-xl p-5 shadow-xl" action="#" method="POST">
				<input type="hidden" name="remember" value="true" />
				<div class="rounded-md shadow-sm -space-y-px">
					<p class="mt-2 text-center text-sm" :class="sucess ? 'text-green-600' : 'text-red-600'" v-show="infoMsg != ''">
						{{ infoMsg }}
					</p>
					<TextInput label="Email" v-model="email" type="email" id="email" autoComplete="email" />
				</div>
				<div>
					<button
						type="button"
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
						@click="sendEmailPasswordRecovery">
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
						Enviar e-mail de recuperação de senha
					</button>
				</div>
			</form>
		</div>
	</div>
</template>
