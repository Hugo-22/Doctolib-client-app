<script setup>
import { onMounted, reactive, ref } from "vue";
import { ProviderService } from "../../services/Provider/ProviderService.js";
import { useRoute } from "vue-router";
import { useUserStore } from "../../store/UserStore.js";
import { AppointmentService } from "../../services/Appointment/AppointmentService.js";

const route = useRoute()
const userStore = useUserStore()
const loading = ref(true)
let formAppointment = reactive({
	date: null
})
let provider = reactive({})

onMounted(async () => {
	await findOneProvider()
	loading.value = false

})

const findOneProvider = async () => {
	const res = await ProviderService.findOne(route.params.providerId, userStore.user.token)

	if (res.status === 200) {
		console.log(res.data)
		provider = {...res.data.data}
	}
}


const handleFormSubmit = async () => {
	console.log(formAppointment.date)
	const res = await AppointmentService.create({data: {
		date: formAppointment.date,
		customer: userStore.user.id,
		provider: +route.params.providerId
	}}, userStore.user.token)

	if (res.status === 200) {

	}

}
</script>

<template>

	<div>
		<div v-if="!loading" class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ provider.attributes.name }}</h5>
			<span class="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"> {{ provider.attributes.category }}</span>

			<form @submit.prevent="handleFormSubmit">
				<label for="date">Choix de l'horaire</label>
				<input type="datetime-local" name="date" id="date" v-model="formAppointment.date">
				<button type="submit" class="ml-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Valider RDV
					<svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
				</button>
			</form>
		</div>
	</div>

</template>