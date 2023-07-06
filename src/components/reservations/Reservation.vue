<script>
/**
 * Crear un mapero del objeto client:
 * para setearlo bien
 * Usar typescript lo valida mejor
 *
 **/
import PriceTable from '../reservations/shared/PriceTable.vue';

const VITE_APP_AUTHOR_NAME = import.meta.env.VITE_APP_AUTHOR_NAME;
const VITE_APP_AUTHOR_URL = import.meta.env.VITE_APP_AUTHOR_URL;

export default {
    components: {
        PriceTable
    },
    data() {
        return {
            authorName: VITE_APP_AUTHOR_NAME,
            authorURL: VITE_APP_AUTHOR_URL
        }
    },
    mounted() {
        this.$store.dispatch('refreshOwnerData');
    },
    methods: {
        redirectToComponent (event) {
            const nameOfComponent = 'OneDate';
            this.$emit('changeCurrentComponent', nameOfComponent);
        }
    },
    computed: {
        ownerData() {
            return this.$store.getters.ownerData;
        },
        dataLoaded() {
            return this.$store.state.isLoading;
        }
    }
}
</script>
<script setup>
  import ImageSoccerBall from '../base64images/ImageSoccerBall.vue'
</script>
<template>
    <div class="px-3 pt-6">
        <div v-show="dataLoaded">Cargando...</div>
        <div v-show="!dataLoaded">
            <div class="flex place-content-center">
                <ImageSoccerBall />
            </div>
            <div class="w-full">
            <h1 class="text-center font-bold">{{ ownerData['propietario'] }}</h1>
            </div>
            <div class="w-full">
            <form class="bg-white pt-3">
                <div class="mb-4">
                <label class="block text-gray-700 text-sm mb-2" for="username">
                    Campo Deportivo
                </label>
                <input class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight"
                    id="username" type="text" readonly
                    placeholder="Sarita Colonia Hijos de Villa los Reyes" :value="ownerData['nombre-campo']">
                </div>
                <div class="mb-4">
                <label class="block text-gray-700 text-sm mb-2" for="password">
                    Dirección
                </label>
                <input class="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
                    id="password" type="text" readonly
                    placeholder="Lizardo monetero #843 Ventanilla-Callao"
                    :value="ownerData['direccion']">

                    <div v-if="ownerData['google-map-url']">
                        <a :href="ownerData['google-map-url']" class="text-sm text-blue-700">Ver mapa</a>
                    </div>
                </div>
                <div class="mb-6 flex place-content-center">
                <!-- pasarle data a esta tabla -->
                <PriceTable />
                </div>
                <div class="flex items-center justify-between">
                <button class="bg-black text-white py-2 px-4 focus:outline-none focus:shadow-outline w-full"
                    type="button" @click="redirectToComponent($event)">
                    Reservar
                </button>
                </div>
            </form>
            <p class="mt-3 text-center text-gray-500 text-xs">
                &copy;2023. All rights reserved. v1.1[2023-06-20] by <a :href="authorURL">{{ authorName }}</a>
            </p>
            <p class="text-center text-gray-500 text-xs">
                <a :href="authorURL" target="_blank" class="text-sm text-blue-700">¡Cuenta demo gratis!</a>
            </p>
            </div>
        </div>
    </div>
</template>