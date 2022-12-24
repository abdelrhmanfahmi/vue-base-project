<template>
    <div v-if="cluster.length > 0 ">
        <div class="cluster-container" v-for="target in cluster" :key="target.id">
            <p class="monthCss">{{month}}</p>&nbsp;&nbsp;&nbsp;
            <input type="text" placeholder="00" @change="checkInputValue" v-if="month === target.month && cluster_id === target.cluster_id" v-model="target.target">
            <input type="text" placeholder="00" @change="checkInputValue" v-else v-model="clusterTarget.target">
        </div>
    </div>
    <div v-else>
        <div class="cluster-container">
            <p class="monthCss">{{month}}</p>&nbsp;&nbsp;&nbsp;
            <input type="text" placeholder="00" @change="checkInputValue" v-model="clusterTarget.target">
        </div>
    </div>
</template>

<script>
    export default{
        name: 'target-component',
        props:['cluster' , 'month' , 'cluster_id'],
        emits:['changed'],
        data(){
            return {
                clusterTarget:{
                    target:'',
                    month:this.month,
                    cluster_id:this.cluster_id,
                    year:''
                }
            }
        },
        mounted(){
            console.log(this.cluster);
        },
        
        methods:{
            checkInputValue(e){
                this.clusterTarget.target = e.target.value;
                
                const d = new Date();
                this.clusterTarget.year = d.getFullYear();
                
                this.$emit('changed' , this.clusterTarget);
            }
        }
    }
</script>

<style scoped>
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