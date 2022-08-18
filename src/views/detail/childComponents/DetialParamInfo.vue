<template>
    <div class="goods-params" v-if="Object.keys(goodsParams).length">
        <div class="rules">
            <table v-for="(table,index) in goodsParams.sizes" :key="index">
                <tr v-for="(tr, index) in table" :key="index">
                    <td v-for="(td,index) in tr" :key="index">{{td}}</td>
                </tr>
            </table>
        </div>
        <div class="params" v-if="Object.keys(goodsParams.infos).length && goodsParams.infos.length">
            <table>
                <tr v-for="(info, index) in goodsParams.infos" :key="index">
                    <td class="key">{{info.key}}</td>
                    <td class="value">{{info.value}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DetialParamInfo',
        props: {
            goodsParams: {
                type: Object,
                default() {
                    return {};
                }
            }
        },

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
    .goods-params {
        width: 100%;
        padding: 8px 8px 20px;
        border-bottom: solid 4px rgba(100, 100, 100, .1);
    }

    .rules table {
        width: 100%;
    }

    .rules table tr td,
    .params table tr td {
        padding: 8px 16px;
        border-bottom: 1px solid rgba(100, 100, 100, .1);
    }

    .params table {
        width: 100%;
    }

    .params table tr .key {
        width: 30%;
    }

    .params table tr .value {
        width: 70%;
        color: var(--color-high-text);
    }
</style>