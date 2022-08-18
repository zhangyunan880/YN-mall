<template>
    <div class="check-btn" :class="{check:isChecked}">
        <img src="@/assets/img/cart/tick.svg" >
    </div>
</template>
<script>
    export default {
        name: 'CheckGoodsBtn',
       
        props: {
            isChecked: {
                type: Boolean,
                default:false
            }
        }

    }
</script>

<style scoped>
    .check-btn {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        text-align: center;
        /* background-color: red; */
        border: 2px solid #aaa;

    }

    .check {
        border-color:red;
        background-color: red;
    }
</style>