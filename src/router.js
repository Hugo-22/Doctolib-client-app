import Login from "./components/Auth/Login.vue"
import Registration from "./components/Auth/Registration.vue"
import Home from "./pages/home/Home.vue"
import LoginRedirectGithub from "./components/Auth/LoginRedirectGithub.vue"
import Appointment from "./pages/appointment/Appointment.vue"
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: Login, name: 'login' },
    { path: '/inscription', component: Registration, name: 'registration' },
    { path: '/login/github/redirect', component: LoginRedirectGithub },
    { path: '/accueil', component: Home, name: 'home' },
    { path: '/prendre-rendez-vous/:providerId', component: Appointment, name: 'appointment' },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router