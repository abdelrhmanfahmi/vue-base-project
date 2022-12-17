import store from '../../store/store';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster();

export default (to , from , next) => {
    console.log(store.getters['roles']);
    if(store.getters['authenticated'] && store.getters['roles'] === 'admin'){
        next();
    }else{
        toaster.error(`You don't have permission to view admin data` , {position: 'top'});
        next({name: from.name});
    }
}