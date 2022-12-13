<script setup>
import { reactive } from "vue";
import { RegistrationService } from "../../services/Auth/RegistrationService.js";
import { UserService } from "../../services/User/UserService.js";
import { useRouter } from "vue-router"
import {CoordinatesService} from "../../services/Coordinates/CoordinatesService.js";

const formRegistration = reactive({
	user: {
		username: null,
		email: null,
		password: null,
	},
	customer: {
		street: null,
		city: null,
		postCode: null,
		coordinates: null
	}
})

const router = useRouter();

const handleSubmitForm = async () => {

	try {
		const res = await RegistrationService.register(formRegistration.user)

		if (res.status === 200) {

			const userId = res.data.user.id
			const token = res.data.jwt

			try {
				// le role avec l'id n°3 correspond au rôle Customer
				// TODO: improve hard coded role ID
				const resUpdatedRole = await UserService.update(userId, { role: 3 }, token)
			} catch (e) {
				console.error(e)
			}

			formRegistration.customer.user = userId

			try {

				const street = formRegistration.customer.street + ' ' + formRegistration.customer.city
				const resCoords = await CoordinatesService.get(street, formRegistration.customer.postCode)

				if (resCoords.status === 200) {
					formRegistration.customer.coordinates = resCoords.data.features[0].geometry.coordinates

					const resRegisterCustomer = await RegistrationService.registerCustomer({data: formRegistration.customer}, token)

					if (resRegisterCustomer.status === 200) {
						router.push({ name: 'login' })
					}
				}




			} catch (e) {
				console.error(e)

			}

		}

	} catch (e) {
		console.error(e)
	}
}


</script>

<template>
	<form @submit.prevent="handleSubmitForm" class="p-5">
		<div class="mb-6">
			<label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
			<input v-model="formRegistration.user.username" type="text" id="username"
			       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			       required>
		</div>
		<div class="mb-6">
			<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
			<input v-model="formRegistration.user.email" type="email" id="email"
			       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			       required>
		</div>
		<div class="mb-6">
			<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de
				passe</label>
			<input v-model="formRegistration.user.password" type="password" id="password"
			       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			       required>
		</div>
		<div class="mb-6">
			<label for="street" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adresse</label>
			<input v-model="formRegistration.customer.street" type="text" id="street"
			       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			       required>
		</div>

		<div class="mb-6">
			<label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ville</label>
			<input v-model="formRegistration.customer.city" type="text" id="city"
			       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			       required>
		</div>

		<div class="mb-6">
			<label for="postCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code
				postal</label>
			<input v-model="formRegistration.customer.postCode" type="text" id="postCode"
			       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			       required>
		</div>

		<div class="flex mx-auto max-w-max mb-3">
			<RouterLink to="/"
			            class="text-white italic bg-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
				Déjà un compte ? Se connecter !
			</RouterLink>
		</div>

		<div class="flex mx-auto">
			<button type="submit"
			        class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
				S'inscrire
			</button>
		</div>
	</form>

</template>