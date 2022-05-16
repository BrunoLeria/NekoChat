<script setup>
import TextInput from "/src/components/inputs/TextInput.vue";
import Sublink from "/src/components/buttons/Sublink.vue";
import logo from "/src/assets/logo.svg";
import { ref } from "vue";
import { useUsersStore } from "/src/services/stores/users.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errMsg = ref("");
const remember = false;
const router = useRouter();

const userStore = useUsersStore();

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
				default:
					errMsg.value = error.message;
					break;
			}
		});
};

const signInWithGoogle = () => {
	const provider = new GoogleAuthProvider();
	signInWithPopup(getAuth(), provider)
		.then((data) => {
			login(data);
		})
		.catch((error) => {
			console.log(error);
		});
};

async function login(data) {
	if (await !userStore.findOneUserByEmail(data.user.email)) {
		userStore.user.usu_name = data.user.displayName;
		userStore.user.usu_email = data.user.email;
		userStore.user.usu_photo = data.user.photoURL;
		await userStore.createUser();
	}
	userStore.user.usu_fk_sts_identification = 1;

	userStore.updateUser();
	router.push({ name: "Home" });
}
</script>

<template>
	<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-md w-full space-y-8">
			<div>
				<img class="mx-auto h-36 w-auto" :src="logo" alt="Workflow" />
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
					<TextInput label="Senha" v-model="password" type="password" id="password" autoComplete="current-password" />
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
						@click="signInWithEmail">
						<span class="absolute left-0 inset-y-0 flex items-center pl-3">
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
					<button
						type="button"
						class="
							group
							my-5
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
							bg-red-600
							hover:bg-red-400
							focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-200
							ease-in-out
							duration-500
						"
						@click="signInWithGoogle">
						<span class="absolute left-0 inset-y-0 flex items-center pl-3">
							<!-- Heroicon name: solid/lock-closed -->
							<svg
								class="lock-closed h-5 w-5 text-red-400 group-hover:text-red-200"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true">
								<path
									d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
							</svg>
						</span>
						Entrar com o Google
					</button>
				</div>
			</form>
		</div>
	</div>
</template>
