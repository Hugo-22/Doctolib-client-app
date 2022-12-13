import axios from "axios"
import { endpoints } from "../../config/endpoints.js";

axios.defaults.baseURL = 'http://localhost:1337';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const LoginService = {
    login: formData => axios.post(endpoints.auth.login, formData, {params: {populate: '*'}}),
    connectGithub: params =>  axios.get(endpoints.auth.githubConnectCallback, {params})
}