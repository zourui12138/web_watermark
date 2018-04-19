<template>
    <VuePerfectScrollbar v-scroll id="app">
        <router-view/>
    </VuePerfectScrollbar>
</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    export default {
        name: 'App',
        components: {VuePerfectScrollbar}
    }
</script>

<style lang="scss">@import './assets/css/app';</style>

<style lang="scss" scoped>
    #app{
        height: calc(100% - 40px);
        padding: 20px;
    }
</style>
