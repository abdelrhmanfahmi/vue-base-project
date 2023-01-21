<template>
    <div class="test-page">
        <h3>{{ marketShow.name }}</h3>
        <br>
        <h3>{{ businessUnitShow.name }}</h3>
    </div>
    <div>
        <div class="tab">
            <button style="pointer-events:none;" v-for="market in markets" :key="market.id" :class="'tablinks data'+market.name" @click="openCity($event, market.name)">{{market.name}}</button>
        </div>

        <div id="GCC" class="tabcontent" style="display: block;">
            <h3>London</h3>
            <p>London is the capital city of England.</p>
        </div>

    </div>
</template>

<script>
    import repository from '../api-services/repository';
    import $ from 'jquery';
    export default{
        name:'test-page',
        data(){
            return {
                markets:[],
                businessUnits:[],
                marketShow:{},
                curMarketIndex:-1,
                curMarketIndexNow:1,
                businessUnitShow:{},
                curBusinessUnitIndex:-1,
                market_id:null,
                business_unit_id:null,
                clusters:[],
                startNow:null,
                flag:false,
                isActive:false,
            }
        },
        mounted(){
            this.getMarkets();
        },
        methods:{
            changeStatus(market){
                if(market === 'GCC'){
                    this.isActive = true;
                    $('.dataGCC').addClass('active');
                    $('.dataKSA').removeClass('active');
                    $('.dataEgypt').removeClass('active');
                }else if(market === 'KSA'){
                    this.isActive = false;
                    $('.dataGCC').removeClass('active');
                    $('.dataKSA').addClass('active');
                    $('.dataEgypt').removeClass('active');
                }else{
                    this.isActive = false;
                    $('.dataGCC').removeClass('active');
                    $('.dataKSA').removeClass('active');
                    $('.dataEgypt').addClass('active');
                }
            },
            openCity(evt, cityName) {
                var i, tabcontent, tablinks;
                tabcontent = document.getElementsByClassName("tabcontent");
                for (i = 0; i < tabcontent.length; i++) {
                    tabcontent[i].style.display = "none";
                }
                tablinks = document.getElementsByClassName("tablinks");
                for (i = 0; i < tablinks.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" active", "");
                }
                document.getElementById(cityName).style.display = "block";
                evt.currentTarget.className += " active";
            },
            sleep(milliseconds){
                return new Promise(resolve => setTimeout(resolve, milliseconds));  
            },
            async getMarkets(){
                const response = await repository.getMarkets();
                this.markets = response.data;
                for(let market of this.markets){
                    this.marketShow = market;
                    this.changeStatus(market.name);
                    await this.getBusinessUnits();
                }
                this.getMarkets();
            },
            async getBusinessUnits(){
                const response = await repository.getBusinessUnits();
                this.businessUnits = response.data;
                if(this.isActive === true){
                    $('.dataGCC').addClass('active');
                }
                for(let businessUnit of this.businessUnits){
                    this.businessUnitShow = businessUnit;
                    await this.sleep(2000);
                }
            },
            
        }
    }
</script>

<style scoped>
.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}

/* Style the buttons inside the tab */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-top: none;
}
</style>
