import axios from "axios";
import jsCookie from "js-cookie"
import { user_types } from "../redux/reducers/types/user";
import store from "../redux/store";

const API_URL = "http://localhost:2000";

const axiosInstance = axios.create({
    baseURL: API_URL
})

axiosInstance.interceptors.request.use((config) => {
    config.headers.authorization = jsCookie.get("auth_token") || ""
    return config
})

// axiosInstance.interceptors.response.use(
//     (res) => {
//         return res
//     },
//     (err) => {
//         if(err?.response?.status == 419){
//             jsCookie.remove("auth_token")
            
//             store.dispatch({
//                 type: user_types.LOGOUT_USER
//             })
//         }
//         return err
//     }

// )

export default axiosInstance