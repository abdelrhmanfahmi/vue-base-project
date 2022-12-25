<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <form @submit.prevent="login" method="POST">
                    <div class="col">
                        <label>Email</label>
                        <input type="email" class="form-control" v-model="user.email" name="email">
                    </div>
                    <div class="col">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model="user.password" name="password">
                    </div>

                    <div class="btnStyle">
                        <button class="btn btn-success w-100">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        <br>
        <br>
        <br>
        <div class="row">
            <div class="col-md-6" v-for="cluster in clusters" :key="cluster.id">
                <div class="cluster-header">
                    <h3>{{cluster.name}}</h3>
                </div>
                
                <TargetComponent :cluster="clusterPerMonth1" :month="1" :cluster_id="cluster.id" @changed="checkTargetInput"/>
                <TargetComponent :cluster="clusterPerMonth2" :month="2" :cluster_id="cluster.id" @changed="checkTargetInput" />
                <TargetComponent :cluster="clusterPerMonth3" :month="3" :cluster_id="cluster.id" @changed="checkTargetInput" />
                <TargetComponent :cluster="clusterPerMonth4" :month="4" :cluster_id="cluster.id" @changed="checkTargetInput" />
                <TargetComponent :cluster="clusterPerMonth5" :month="5" :cluster_id="cluster.id" @changed="checkTargetInput" />
                <TargetComponent :cluster="clusterPerMonth6" :month="6"  :cluster_id="cluster.id" @changed="checkTargetInput" />
                <TargetComponent :cluster="clusterPerMonth7" :month="7" :cluster_id="cluster.id" @changed="checkTargetInput" />
                <TargetComponent :cluster="clusterPerMonth8" :month="8" :cluster_id="cluster.id" @changed="checkTargetInput" />
                <TargetComponent :cluster="clusterPerMonth9" :month="9" :cluster_id="cluster.id" @changed="checkTargetInput" />
                <TargetComponent :cluster="clusterPerMonth10" :month="10" :cluster_id="cluster.id" @changed="checkTargetInput" />
                <TargetComponent :cluster="clusterPerMonth11" :month="11" :cluster_id="cluster.id" @changed="checkTargetInput" />
                <TargetComponent :cluster="clusterPerMonth12" :month="12" :cluster_id="cluster.id" @changed="checkTargetInput" />
                
            </div>
        </div>
        <button class="btn btn-success" @click="saveTargets">Save</button>
    </div>
</template>

<script>
import repository from '../../api-services/repository';
import TargetComponent from '../../components/TargetComponent.vue';
// import $ from 'jquery';
    export default{
        name:'login-page',
        data(){
            return{
                user:{
                    email:null,
                    password:null
                },
                error: null,
                clusters:[],
                clusterData:[],
                clusterPerMonth1:[],
                clusterPerMonth2:[],
                clusterPerMonth3:[],
                clusterPerMonth4:[],
                clusterPerMonth5:[],
                clusterPerMonth6:[],
                clusterPerMonth7:[],
                clusterPerMonth8:[],
                clusterPerMonth9:[],
                clusterPerMonth10:[],
                clusterPerMonth11:[],
                clusterPerMonth12:[],
            }
        },
        mounted() {
            this.getClusters();
        },
        components: {
            TargetComponent
        },
        methods:{
            async getClusters(){
                const response = await repository.getClusterTarget();
                this.clusters = response.data.data;
                this.clusters.forEach(item => {
                    item.targets.forEach(item2 => {
                        this.formatHandler(item2 , item.id);
                    })
                })
            },
            formatHandler(data , cluster){
                console.log(data.month);
                if(data.month === 1 && data.cluster_id === cluster){
                    this.clusterPerMonth1.push(data);
                }else if(data.month === 2 && data.cluster_id === cluster){
                    this.clusterPerMonth2.push(data);
                }else if(data.month === 3 && data.cluster_id === cluster){
                    this.clusterPerMonth3.push(data);
                }else if(data.month === 4 && data.cluster_id === cluster){
                    this.clusterPerMonth4.push(data);
                }else if(data.month === 5 && data.cluster_id === cluster){
                    this.clusterPerMonth5.push(data);
                }else if(data.month === 6 && data.cluster_id === cluster){
                    this.clusterPerMonth6.push(data);
                }else if(data.month === 7 && data.cluster_id === cluster){
                    this.clusterPerMonth7.push(data);
                }else if(data.month === 8 && data.cluster_id === cluster){
                    this.clusterPerMonth8.push(data);
                }else if(data.month === 9 && data.cluster_id === cluster){
                    this.clusterPerMonth9.push(data);
                }else if(data.month === 10 && data.cluster_id === cluster){
                    this.clusterPerMonth10.push(data);
                }else if(data.month === 11 && data.cluster_id === cluster){
                    this.clusterPerMonth11.push(data);
                }else{
                    this.clusterPerMonth12.push(data);
                }
                console.log(this.clusterPerMonth1 , this.clusterPerMonth2 , this.clusterPerMonth3 , this.clusterPerMonth4 , this.clusterPerMonth5 , this.clusterPerMonth6 , this.clusterPerMonth7 , this.clusterPerMonth8 , this.clusterPerMonth9 , this.clusterPerMonth10 , this.clusterPerMonth11 , this.clusterPerMonth12);
            },
            async login(){
                this.error = null;
                try{
                    await this.$store.dispatch('login' , this.user);
                    let data = JSON.parse(localStorage.getItem('user'));
                    if(data.data.user.roles === 'super-admin'){
                        await this.$router.push({name : 'home-page'});
                    }
                    if(data.data.user.roles === 'admin'){
                        await this.$router.push({name : 'home-admin'});
                    }
                }catch(e){
                    console.log(e);
                    this.error = e;
                }
            },
            checkTargetInput(e){
                this.clusterData.push(e);
            },
            async saveTargets(){
                let newArray = this.clusterData.filter(o => o.target !== '');
                console.log(newArray);
                const response = await repository.storeTargets(newArray);
                console.log(response);
                // console.log(this.clusterData);
                /*
                    public function store(Request $request)
                    {
                        $role = 'finance';
                        $now = Carbon::now();
                        $month = $now->month;
                        $data = $request->all();
                        for($i = 0 ; $i < count($data) ; $i++){
                            if($role === 'finance'){
                                if($data[$i]['month'] === $month){
                                    Target::updateOrCreate(
                                        [
                                            'month' => $data[$i]['month'],
                                            'cluster_id' => $data[$i]['cluster_id']
                                        ],
                                        [
                                            'month' => $data[$i]['month'],
                                            'target' => $data[$i]['target'],
                                            'year' => $data[$i]['year'],
                                            'cluster_id' => $data[$i]['cluster_id'],
                                        ]
                                    );
                                }else{
                                    return response()->json(['message' => 'You cant store in this month']);
                                }
                            }else{
                                Target::updateOrCreate(
                                    [
                                        'month' => $data[$i]['month'],
                                        'cluster_id' => $data[$i]['cluster_id']
                                    ],
                                    [
                                        'month' => $data[$i]['month'],
                                        'target' => $data[$i]['target'],
                                        'year' => $data[$i]['year'],
                                        'cluster_id' => $data[$i]['cluster_id'],
                                    ]
                                );
                            }
                        }
                        return response()->json(['message' => 'Targets Saved Successfully.']);
                        
                    }
                    }
                */
            }
        }
    }
</script>

<style scoped>
    .cluster-header{
        background-color: goldenrod;
        color: #fff;
        text-align: center;
        padding: 10px;
        border-radius: 5px;
    }
    .cluster-container{
        margin: 10px;
        display: flex;
    }
    .cluster-container .monthCss{
        background-color: gray;
        text-align: center;
        /* padding: 10px; */
        width: 100%;
    }
    .cluster-container input{
        height: fit-content;
        text-align: center;
    }
</style>