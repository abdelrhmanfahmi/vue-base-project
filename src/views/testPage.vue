<template>
    <div class="test-page">
        <h3>{{ marketShow.name }}</h3>
        <br>
        <h3>{{ businessUnitShow.name }}</h3>
    </div>
</template>

<script>
    import repository from '../api-services/repository';
    export default{
        name:'test-page',
        data(){
            return {
                markets:[],
                businessUnits:[],
                marketShow:{},
                curMarketIndex:-1,
                businessUnitShow:{},
                curBusinessUnitIndex:-1,
                market_id:null,
                business_unit_id:null,
                clusters:[]
            }
        },
        mounted(){
            this.getMarkets();
            this.getBusinessUnits();
            this.showPreview();
        },
        methods:{
            async getMarkets(){
                const response = await repository.getMarkets();
                this.markets = response.data;
                localStorage.setItem('MarketsNumbers' , response.data.length);
            },
            async getBusinessUnits(){
                const response = await repository.getBusinessUnits();
                this.businessUnits = response.data;
                localStorage.setItem('businessUnitsNumbers' , response.data.length);
            },
            showPreview(){
                let businessUnitsNumber = localStorage.getItem('businessUnitsNumbers');
                console.log(businessUnitsNumber);

                setInterval(this.showMarkets, businessUnitsNumber*5000);
        
                setTimeout(this.startBusinessUnit, (businessUnitsNumber*5000) - 5000);
                
            },
            showMarkets(){
                ++this.curMarketIndex;
                if (this.curMarketIndex >= this.markets.length) {
                    this.curMarketIndex = 0;
                    // window.location.reload();
                }

                console.log(this.markets[this.curMarketIndex]);
                this.marketShow = this.markets[this.curMarketIndex];
                this.market_id = this.markets[this.curMarketIndex].id;

            },
            async showBusinessUnits(){
                ++this.curBusinessUnitIndex;
                if (this.curBusinessUnitIndex >= this.businessUnits.length) {
                    this.curBusinessUnitIndex = 0;
                }
                console.log(this.businessUnits[this.curBusinessUnitIndex]);
                this.businessUnitShow = this.businessUnits[this.curBusinessUnitIndex];
                this.business_unit_id = this.businessUnits[this.curBusinessUnitIndex].id;
                console.log({'business_unit ':this.business_unit_id});
                console.log({'market_id ':this.market_id});
                const res = await repository.getClusters(this.market_id , this.business_unit_id);
                console.log(res);
            },
            startBusinessUnit(){
                setInterval(this.showBusinessUnits, 5000);
            }
            
        }
    }
</script>

<style scoped>

</style>
