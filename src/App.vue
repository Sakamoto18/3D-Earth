<template>
    <div id="app">
        <cc-map id="map"></cc-map>
    </div>
</template>

<script>
/* eslint-disable */
import ccMap from "./components/cc_map.vue";
export default {
    name: 'App',
    components: {
        ccMap   
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
    overflow: hidden;
    border: 1px solid #ccc;
    width: 100vw;
    height: 100vh;
    margin-top: 20px auto;
}
</style>
