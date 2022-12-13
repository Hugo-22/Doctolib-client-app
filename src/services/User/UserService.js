import axios from "axios"
import { endpoints } from "../../config/endpoints.js";

axios.defaults.baseURL = 'http://localhost:1337';
axios.defaults.headers.put['Content-Type'] = 'application/json';

export const UserService = {
    update: (id, formData, token) => axios.put(endpoints.users.item(id), formData, {
        headers: {'Authorization': 'Bearer ' + token}
    }),
    findOne: (id, token) => axios.get(endpoints.users.item(id), {
        headers: {'Authorization': 'Bearer ' + token}
    })
}