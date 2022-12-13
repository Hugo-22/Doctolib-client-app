<script setup>
import {onMounted, reactive, ref} from "vue";
import {ProviderService} from "../../services/Provider/ProviderService";
import {useUserStore} from "../../store/UserStore.js";
import {AppointmentService} from "../../services/Appointment/AppointmentService.js";

const { user } = useUserStore()
let providers = reactive({})
let appointments = reactive({})
const loading = ref(true)

onMounted(async () => {
	await getProviders()
	await getAppointments()
	formatDatetime("2022-12-15T15:01:00.000Z")
	loading.value = false
})

const getProviders = async () => {
	const res = await ProviderService.findAll(user.token)

	if (res.status === 200) {
		providers = {...res.data.data}
	}
}

const getAppointments = async () => {
	const res = await AppointmentService.findByCustomer(user.token, user.id)
	if (res.status === 200) {
		appointments = {...res.data.data}
	}
}

const formatDatetime = (datetime) => {
	const date = new Date(datetime)
	return date.getUTCDate() + "/" +
		("0" + (date.getUTCMonth() + 1)).slice(-2) + "/" +
		("0" + date.getUTCFullYear()).slice(-2) + " " +
		("0" + date.getUTCHours()).slice(-2) + ":" +
		("0" + date.getUTCMinutes()).slice(-2)
}



</script>

<template>

	<div>
		<h1 class="mb-4 text-center text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome !</h1>


		<template v-if="!loading">

			<div v-for="provider in providers" class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ provider.attributes.name }}</h5>
				<span class="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"> {{ provider.attributes.category }}</span>
				<router-link :to="{name: 'appointment', params: {providerId: provider.id}}" class="mt-1.5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Prendre RDV
					<svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
				</router-link>
			</div>



			<div class="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
				<div class="flex items-center justify-between mb-4">
					<h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Vos rendez-vous</h5>

				</div>
				<div class="flow-root">
					<ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
						<li class="py-3 sm:py-4" v-for="appointment in appointments">
							<div class="flex items-center space-x-4">
								<div class="flex-1 min-w-0">
									<p class="text-sm font-medium text-gray-900 truncate dark:text-white">
										{{ appointment.attributes.provider.data.attributes.name }}
									</p>
									<span class="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"> {{ appointment.attributes.provider.data.attributes.category }}</span>
								</div>
								<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
									{{ formatDatetime(appointment.attributes.date) }}
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</template>



	</div>

</template>

<style scoped>

</style>