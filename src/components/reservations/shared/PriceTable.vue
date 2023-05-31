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
    <table class="table-auto">
        <thead>
        <tr>
            <th colspan="2" class="border px-3 py-1 bg-gray-200">Precio por 1 hora</th>
        </tr>
        </thead>
        <tr>
        <td class="border px-3 py-1">Dia(6am-6pm)</td>
        <td class="border px-3 py-1">s/ {{ ownerData['precio-dia'] }}</td>
        </tr>
        <tr>
        <td class="border px-3 py-1">Noche(6pm-12pm)</td>
        <td class="border px-3 py-1">s/ {{ ownerData['precio-noche'] }}</td>
        </tr>
    </table>
</template>