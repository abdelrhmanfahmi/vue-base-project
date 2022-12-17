import { createStore } from 'vuex';
import repository from '@/api-services/repository';

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        auth: {
            state: {
                user: localStorage.user ? JSON.parse(localStorage.getItem('user')) :  null,
                // permissions: localStorage.user ? (JSON.parse(localStorage.getItem('user'))['date']['permissions']?.map(function (value){
                //     return value.name;
                // })) : null,

                roles: localStorage.user ? (JSON.parse(localStorage.getItem('user'))['data']['user']['roles']) : null,
                isLoading:false
            },

            getters: {
                user: state => state.user,
                // permissions: state => state.permissions,
                roles: state => state.roles,
                isLoading : state => state.isLoading,
                authenticated : state => state.user !== null
            },

            mutations: {
                SET_USER(state, user){
                    state.user = user;
                },
                // SET_PERMISSION(state, permissions){
                //     state.permissions = permissions;
                // },
                SET_ROLE(state, roles){
                    state.roles = roles;
                },
                SET_IS_LOADING(state, flagState){
                    state.isLoading = flagState;
                }
            },

            actions: {
                async login({commit}, user){
                    await repository.createSession();
                    const {data} = await repository.login(user);

                    localStorage.user = await JSON.stringify(data);

                    await commit('SET_USER' , data);
                    // await commit('SET_PERMISSION' , data?.data?.permissions.map(function (value){
                    //     return value.name;
                    // }));
                    
                    await commit('SET_ROLE' , data?.data?.user?.roles);
                    
                },

                async logout({commit}){
                    await repository.logout();
                    await commit('SET_USER' , null);
                    await commit('SET_PERMISSION' , null);

                    await localStorage.removeItem('user');
                },

                async setIsLoading({commit}, flagState){
                    await commit('SET_IS_LOADING' , flagState);
                },

                async setUser({commit} , flagState){
                    await commit('SET_USER' , flagState);
                }
            }
        }
    }
});