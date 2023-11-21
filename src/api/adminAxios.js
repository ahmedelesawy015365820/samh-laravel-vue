import axios from "axios";
import Cookies from "js-cookie";
import store from "../state/store";
import router from "../router/index";


const adminApi = axios.create({
    baseURL: `${process.env.VUE_APP_API}`
});

adminApi.interceptors.request.use(
    function (config) {
        config.headers['Authorization'] = "Bearer " + (Cookies.get("token") || '');
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
adminApi.defaults.headers.common['Accept'] = 'application/json';

adminApi.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        // handle error: inform user, go to login, etc
        store.commit('auth/logoutToken');
        return router.push({name: 'login'});
    } else {
        return Promise.reject(error);
    }
});
// end axios
export default adminApi;
