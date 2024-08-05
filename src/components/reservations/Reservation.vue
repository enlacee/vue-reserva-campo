<script>
/**
 * Crear un mapero del objeto client:
 * para setearlo bien
 * Usar typescript lo valida mejor
 *
 **/
import PriceTable from '../reservations/shared/PriceTable.vue';
import { Browser } from '@/utils/helper';

const VITE_APP_AUTHOR_NAME = import.meta.env.VITE_APP_AUTHOR_NAME;
const VITE_APP_AUTHOR_URL = import.meta.env.VITE_APP_AUTHOR_URL;
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE;

export default {
    components: {
        PriceTable
    },
    data() {
        return {
            authorName: VITE_APP_AUTHOR_NAME,
            authorURL: VITE_APP_AUTHOR_URL,
            title: VITE_APP_TITLE
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
    <div class="px-3 pt-3">
        <div v-show="dataLoaded">Cargando...</div>
        <div v-show="!dataLoaded">
            <div class="flex items-center justify-center mt-5 mb-5">
                <!-- <ImageSoccerBall /> -->
                <h1 class="text-center font-bold uppercase text-xl">{{ title }} 🇵🇪</h1>
            </div>

            <!-- <div class="w-full">
                <h1 class="text-center font-bold">{{ ownerData['propietario'] }}</h1>
            </div> -->

            <div class="w-full">
            <form class="bg-white pt-3">
                <div class="mb-3">
                <label class="block text-base font-bold mb-1" for="username">
                    Campo Deportivo
                </label>
                <input class=" appearance-none border border-gray-300 w-full py-2 px-3 text-gray-400 leading-tight"
                    id="username" type="text" disabled readonly
                    placeholder="Sarita Colonia Hijos de Villa los Reyes" :value="ownerData['nombre-campo']">
                </div>
                <div class="mb-3">
                <label class="block text-base font-bold mb-1" for="password">
                    Dirección
                </label>
                <input class=" appearance-none border border-gray-300 w-full py-2 px-3 text-gray-400 mb-1 leading-tight"
                    id="password" type="text" disabled readonly
                    placeholder="Lizardo monetero #843 Ventanilla-Callao"
                    :value="ownerData['direccion']">

                    <div v-if="ownerData['google-map-url']">
                        <a :href="ownerData['google-map-url']" class="text-base text-blue-500">Ver mapa</a>
                    </div>
                </div>
                <div>
                    <!-- pasarle data a esta tabla -->
                    <PriceTable />
                </div>
                <div class="flex items-center justify-between">
                <button class="bg-black text-base uppercase text-white py-3 px-4 focus:outline-none focus:shadow-outline w-full hover:bg-gray-800"
                    type="button" @click="redirectToComponent($event)">
                    Reservar
                </button>
                </div>
            </form>
            <p class="mt-3 text-center text-gray-400 text-xs">
                &copy;2024. All rights reserved. v2[2024-07-20] by <a target="_blank" :href="authorURL">{{ authorName }}</a>
            </p>
            <p class="text-center text-gray-400 text-xs">
                <a :href="authorURL" target="_blank" class="underline">¡Cuenta demo gratis!</a> {{ Browser.getIdFromUrl() }}
            </p>
            </div>
        </div>
    </div>
</template>