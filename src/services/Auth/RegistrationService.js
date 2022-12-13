import axios from "axios"
import { endpoints } from "../../config/endpoints.js";

axios.defaults.baseURL = 'http://localhost:1337';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const RegistrationService = {
    register: formData => axios.post(endpoints.auth.register, formData),
    registerCustomer: (formData, token) => axios.post(endpoints.auth.registerCustomer,  formData, {
        headers: {'Authorization': 'Bearer ' + token}
    })
}