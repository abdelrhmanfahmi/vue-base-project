import { createApp } from 'vue';
import App from './App.vue';
import store from './store/store';
import router from './router/router';
import 'bootstrap/dist/css/bootstrap.css';
import Toaster from "@meforma/vue-toaster";

let app = createApp(App);
app.config.globalProperties.$APP_URL = 'http://127.0.0.1:8000/api';

app.use(store).use(router).use(Toaster).mount('#app');
