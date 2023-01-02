import api from './api';

export default {
    createSession(){
        return api.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
    },
    login(params){
        return api.post('http://127.0.0.1:8000/api/login' , params);
    },
    logout(){
        return api.get('http://127.0.0.1:8000/api/logout');
    },
    getClusterTarget(){
        return api.get('http://127.0.0.1:8000/api/clusterTargets');
    },
    storeTargets(params){
        return api.post('http://127.0.0.1:8000/api/storeTarget' , params);
    },
    getMarkets(){
        return api.get('http://127.0.0.1:8000/api/markets');
    },
    getBusinessUnits(){
        return api.get('http://127.0.0.1:8000/api/business-units');
    },
    getClusters(market_id , business_unit_id){
        return api.get(`http://127.0.0.1:8000/api/get/clusters/${market_id}/${business_unit_id}`);
    }
}