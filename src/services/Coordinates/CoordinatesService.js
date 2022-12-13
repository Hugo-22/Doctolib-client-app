import axios from "axios"
import { endpoints } from "../../config/endpoints.js";

axios.defaults.baseURL = 'http://localhost:1337';

export const CoordinatesService = {
    get: (street, postCode) => axios.get(endpoints.coords, {
        params: {
            q: street,
            postCode: postCode,
            limit: 1
        }
    })

}