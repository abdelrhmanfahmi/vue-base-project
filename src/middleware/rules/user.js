import store from '../../store/store';

export default (to , from , next) => {
    // console.log('user');
    if(store.getters['authenticated']){
        next();
    }else{
        next({name: 'login-page'});
    }
}