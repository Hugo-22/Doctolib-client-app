import axios from "axios"
import { endpoints } from "../../config/endpoints.js";

axios.defaults.baseURL = 'http://localhost:1337';
axios.defaults.headers.put['Content-Type'] = 'application/json';


export const ProviderService = {
    findAll: (token) =>  axios.get(endpoints.providers.collection, {
        headers: { Authorization: `Bearer ${token}` }
    }),
    findOne: (id, token) => axios.get(endpoints.providers.item(id), {
        headers: { Authorization: `Bearer ${token}` }
    })
}