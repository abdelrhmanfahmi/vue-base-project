import axios from 'axios';
import store from '../store/store';
import router from '../router/router';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster();

let instance = axios.create({
    withCredentials: false
});

instance.interceptors.request.use(async request => {
    let user = JSON.parse(localStorage.getItem('user'));
    await store.dispatch('setIsLoading' , true);
    request.headers['Accept'] = 'application/json';
    request.headers['Content-Type'] = ['application/json' , 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' , 'text/csv'];
    request.headers['Authorization'] = user ? 'Bearer ' + user.auth_token : '';
    request.headers['Access-Control-Max-Age'] = '3000';

    return request;
});

instance.interceptors.response.use(
    async response => {
        await store.dispatch('setIsLoading', false);
        return response;
    },
    async error => {
        await store.dispatch('setIsLoading' , false);
        if(error.response?.status === 401){
            localStorage.removeItem('user');
            window.location.reload();
        } else if(error.response?.status === 404){
            await router.push('/' + store.state.settings.currentRoute);
        }

        // await store.dispatch('setErrorModal' , true);
        // await store.dispatch('setErrorMessage' , error.response?.data.message);
        toaster.error(error.response?.data.message , {position: 'top'});
        return Promise.reject(error);
    }
);

export default instance;