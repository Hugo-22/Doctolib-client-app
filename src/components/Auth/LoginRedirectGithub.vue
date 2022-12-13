<script setup>
import { useRoute } from 'vue-router'
import { onMounted } from "vue";
import { LoginService } from "../../services/Auth/LoginService.js";

const route = useRoute()

onMounted(async () => {
	const accessTokenGithub = route.query.access_token
	await LoginService.connectGithub({access_token: accessTokenGithub})
	// pour terminer à 100%, il faut ensuite avec le JWT strapi récup les user info
})


</script>

<template>


</template>