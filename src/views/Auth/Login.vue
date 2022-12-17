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
    </div>
</template>

<script>
    export default{
        name:'login-page',
        data(){
            return{
                user:{
                    email:null,
                    password:null
                },
                error: null
            }
        },
        methods:{
            async login(){
                this.error = null;

                try{
                    await this.$store.dispatch('login' , this.user);
                    let data = JSON.parse(localStorage.getItem('user'));
                    console.log(data.data.user.roles);

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
            }
        }
    }
</script>

<style scoped>

</style>