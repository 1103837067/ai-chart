<template>
    <div class="mainView flex flex-col items-center justify-between">
        <headerPart/>
        <mainbody/>
        <footerPart/>
        

    </div>
</template>

<script setup>
    import footerPart from '../components/footerPart/footerPart.vue'
    import mainbody from '../components/mainbody/mainbody.vue'
    import headerPart from '../components/headerPart/headerPart.vue'
</script>

<style>

</style>