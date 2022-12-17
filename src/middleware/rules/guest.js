import store from '../../store/store';

export default (to , from , next) => {
    let isAuthenticated = store.getters['authenticated'];
    let roles = store.getters['roles'];
    if(isAuthenticated){
        if(roles === 'super-admin'){
            next({path: '/home'});
        }
        if(roles === 'admin'){
            next({path: '/admin'});
        }
    }else{
        next();
    }
}