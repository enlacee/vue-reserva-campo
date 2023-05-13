<script setup>
import PriceTable from '../objects/PriceTable.vue';
import ImageYape from '../../base64images/ImageYape.vue';

</script>
<template>
    <div class="px-8 pt-6 pb-8 mb-4">
        <div class="w-full">
            <h1 class="text-center font-bold text-xl mb-6">Pagar en <span>(2:59)</span></h1>
        </div>
        <div class="w-full">
            <div class="mb-2 flex place-content-center text-xs">
                <PriceTable />
            </div>
        </div>
        <div class="w-full">
            <form class="bg-white">
                <div class="mb-0">
                    <label class="block text-gray-700 text-sm mb-2" for="rent-time">
                    Tiempo alquilado
                    </label>
                    <input class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="rent-time" type="text" placeholder=""
                    value="2 horas">
                </div>
                <div class="mb-0">
                    <label class="block text-gray-700 text-sm mb-2" for="total-to-pay">
                    Total a pagar
                    </label>
                    <input class="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="total-to-pay" type="text" placeholder="" value="s/ 60.00 nuevos soles">
                </div>
                <div class="mb-0 flex place-content-center">
                    <label class="text-xs">
                        Metodo de pago YAPE: (978412712)
                    </label>
                </div>
                <div class="img-yape-container flex place-content-center">
                    <ImageYape />
                </div>
                <div class="mb-2 flex place-content-center">
                    <span class="mr-2">Estado:</span>
                    <span class="text-red-500 font-bold">No Pagado</span>
                </div>
            </form>
        </div>
    </div>
</template>
<style>
.img-yape-container img{
    height: 220px;
}
</style>