<script>
export default {
    computed: {
        ownerData() {
            return this.$store.getters.ownerData;
        }
    }
}
</script>
<template>
    <div class="price-box flex justify-between mb-4">
        <div class="bg-gray-200 p-1 rounded-lg flex-1 text-center">
            <p>Día (6am-6pm)</p>
            <p>s/ {{ ownerData['precio-dia'] }}</p>
        </div>
        <div class="bg-gray-200 p-1 rounded-lg flex-1 text-center ml-2">
            <p>Noche (6pm-12pm)</p>
            <p>s/ {{ ownerData['precio-noche'] }}</p>
        </div>
    </div>
</template>
<style scoped>
    .price-box p{
        margin:0.5em;
    }
</style>