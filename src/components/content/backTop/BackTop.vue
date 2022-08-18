<template>
    <div class="back-top" >
        <img src="../../../assets/img/common/top.png" alt="">
    </div>
</template>

<script>
    export default {
        name: 'BackTop',

        data() {
            return {

            };
        },

        mounted() {

        },

        methods: {
           
        },
    };
</script>

<style scoped>
    .back-top {
        position: fixed;
        right: 10px;
        bottom: 60px;
        z-index: 9;
    }
    .back-top img{
        width: 43px;
        height: 43px;
    }
</style>