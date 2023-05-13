<script>
export default {
  data() {
    return {
      clientid: '',
    }
  },
  computed: {},
  methods: {
    /**
     * Redirect to new View
     */
    redirectToComponent (event) {
      console.log('cickkk', 'set OneDate');
      const nameOfComponent = 'OneDate';
      this.$emit('changeCurrentComponent', nameOfComponent);
    },
    loadCliendId() {
      let queryString = window.location.search;
      let urlParams = new URLSearchParams(queryString);
      let clientid = '';
      if( urlParams.has('clientid') ){
        clientid = urlParams.get('clientid');
        this.clientid = clientid;
      }
    }
  },
  mounted() {
    this.loadCliendId();
  }
}
</script>
<script setup>
import ImageSoccerBall from '../base64images/ImageSoccerBall.vue'
import PriceTable from '../reservations/objects/PriceTable.vue';

</script>
<template>
  <!-- <div v-if="clientid"> -->
  <div>
    <div class="flex place-content-center">
      <ImageSoccerBall />
    </div>
    <div class="w-full">
      <h1 class="text-center font-bold">{{ clientid }}</h1>
    </div>
    <div class="w-full">
      <form class="bg-white px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm mb-2" for="username">
            Campo Deportivo
          </label>
          <input class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username" type="text" placeholder=""
            value="Sarita Colonia Hijos de Villa los Reyes">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm mb-2" for="password">
            Direccion
          </label>
          <input class="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="text" placeholder="" value="Lizardo monetero #843 Ventanilla-Callao">
        </div>
        <div class="mb-6 flex place-content-center">
          <PriceTable />
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-black text-white py-2 px-4 focus:outline-none focus:shadow-outline w-full"
            type="button" @click="redirectToComponent($event)">
            Reservar
          </button>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2023. All rights reserved.
      </p>
    </div>
  </div>
  <!--
  <div v-else class="w-full py-20">
    <p class="text-center text-gray-500 text-xs">
      &copy;2023. All rights reserved.
    </p>
  </div> -->
</template>