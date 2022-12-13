import axios from "axios"
import { endpoints } from "../../config/endpoints.js";

axios.defaults.baseURL = 'http://localhost:1337';
axios.defaults.headers.put['Content-Type'] = 'application/json';

export const AppointmentService = {
    create: (formData, token) => axios.post(endpoints.appointment.collection, formData, {
        headers: {'Authorization': 'Bearer ' + token}
    }),
    findByCustomer: (token, customerId) => axios.get(endpoints.appointment.collection, {
        headers: {'Authorization': 'Bearer ' + token}, params: {filters: {customer: {id: customerId}}, populate: "*"}
    })
}