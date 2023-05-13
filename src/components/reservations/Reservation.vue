<script>
// Crear un mapero del objeto client:
// para setearlo bien
// Usar typescript lo valida mejor
export default {
  data() {
    return {
      clientid: '',
      client: {
        'nombre-campo': ''
      }
    }
  },
  mounted() {
    this.loadCliendId();
    this.testingLoadClientData();
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
    },
    testingLoadClientData() {
      const URLFATHER = 'https://script.google.com/macros/s/AKfycbzSyhh6sM_shxp9Jy8qa0aDx-08C7XT-CxOuV_pBGzUovrngM0TfOdhzw94TVIDcnXE/exec';
      const URL = URLFATHER + '?op=list';
      fetch(URL, {method: 'GET'})
      .then(response => response.json())
      .then((data) => {
        console.log('response', data, data[0]['cliente']);
        this.client = data[0];
      });
    }
  },

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
      <h1 class="text-center font-bold">{{ clientid }} {{ client['cliente'] }}</h1>
    </div>
    <div class="w-full">
      <form class="bg-white px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm mb-2" for="username">
            Campo Deportivo
          </label>
          <input class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username" type="text"
            placeholder="Sarita Colonia Hijos de Villa los Reyes" :value="client['nombre-campo']">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm mb-2" for="password">
            Direccion
          </label>
          <input class="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="text" placeholder="Lizardo monetero #843 Ventanilla-Callao" 
              :value="client['direccion']">
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