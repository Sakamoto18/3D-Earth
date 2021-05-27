<template>
    <div id="app">
        <!-- <cc-map id="map"></cc-map> -->
        <div class="header-box">
            <geo-map></geo-map>
        </div>
        <div class="header-right-box">
            <cc-map></cc-map>
        </div>
        <div class="footer-box">
            <!-- <cc-map></cc-map> -->
        </div>
        <div class="footer-right-box">
            <!-- <cc-map></cc-map> -->
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import ccMap from "./components/cc_map.vue";
import geoMap from "./components/geo_map.vue";
export default {
    name: 'App',
    components: {
        ccMap,
        geoMap  
    },
    data() {
        return {
        };
    },
    methods: {

    }
}
</script>

<style>
#app {
    display: flex;
    /* 田字布局 */
    -webkit-justify-content: space-around;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100vw;
    /* height: 100vh; */
}

#app div {
    height: 50vh;
}

.header-box {
    flex: 1 1 200px;
    border-radius: 7px;
    /* margin: 0px 0px 10px 10px; */
}
.header-right-box {
    flex: 1 1 200px;
    border-radius: 7px;
    /* margin: 0px 10px 10px 0px; */
}
.footer-box {
    flex: 1 1 200px;
    background-color: red;
}
.footer-right-box {
    flex: 1 1 200px;
    background-color: green;
}
</style>
