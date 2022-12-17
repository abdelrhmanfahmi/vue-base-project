<template>
    <Navbar />

    <div class="container-fluid m-0 p-0">
        <div class="d-flex">
            <Sidebar />
            <main class="w-100 cssDesignSidebar">
                <router-view />
            </main>
        </div>
    </div>


</template>

<script>
    import Navbar from '@/components/Navbar.vue';
    import Sidebar from '@/components/Sidebar.vue';
    export default{
        name:'wrapper-page',
        components:{
            Navbar,
            Sidebar
        }
    }
</script>

<style>

</style>
