<script>
// Crear un mapero del objeto client:
// para setearlo bien
// Usar typescript lo valida mejor
import PriceTable from '../reservations/shared/PriceTable.vue';

export default {
  components: {
    PriceTable
  },
  data() {
    return {
      ownerid: '',
      owner: {}
    }
  },
  beforeCreate() {
    // this.$store.commit('initialiseStore');
    // this.loadOwnerData();

  },
  mounted() {
    // this.loadOwnerId();
    this.loadOwnerData();

    // this.owner = this.$store.state.owner;
  },
  methods: {
    /**
     * Redirect to new View
     */
    redirectToComponent (event) {
      console.log('cickkk', 'set OneDate');
      const nameOfComponent = 'OneDate';
      this.$emit('changeCurrentComponent', nameOfComponent);
    },
    loadOwnerId() {
      let queryString = window.location.search;
      let urlParams = new URLSearchParams(queryString);
      let ownerid = '';
      if( urlParams.has('ownerid') ){
        ownerid = urlParams.get('ownerid');
        this.ownerid = ownerid;
      }
    },
    /**
     * Load data from localstore or fetch
     */
    loadOwnerData() {
      const URLFATHER = 'https://script.google.com/macros/s/AKfycbzSyhh6sM_shxp9Jy8qa0aDx-08C7XT-CxOuV_pBGzUovrngM0TfOdhzw94TVIDcnXE/exec';
      const URL = URLFATHER + '?op=list';

      if (localStorage.getItem('owner')) {
        try {
          let theData = JSON.parse(localStorage.getItem('owner'));
          this.setOwnerData(theData);
          this.owner = this.$store.state.owner;
        } catch(e) {
          console.log(e);
          localStorage.removeItem('owner');
        }
      } else {
        try {
          fetch(URL, {method: 'GET'})
            .then(response => response.json())
            .then((data) => {
              console.log('response', data, data[0]);
              let theData = data[0];
              this.setOwnerData(theData);
              this.owner = this.$store.state.owner;

              const parsed = JSON.stringify(theData);
              localStorage.setItem('owner', parsed);
            });
        } catch (err) {
          console.log(err)
        }
      }

    },
    setOwnerData(theData) {
      this.$store.commit('setOwner', theData);
    }
  },

}
</script>
<script setup>
import ImageSoccerBall from '../base64images/ImageSoccerBall.vue'

</script>
<template>
  <!-- <div v-if="ownerid"> -->
  <div>
    <div class="flex place-content-center">
      <ImageSoccerBall />
    </div>
    <div class="w-full">
      <h1 class="text-center font-bold">{{ ownerid }} {{ owner['propietario'] }}</h1>
    </div>
    <div class="w-full">
      <form class="bg-white px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm mb-2" for="username">
            Campo Deportivo
          </label>
          <input class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username" type="text"
            placeholder="Sarita Colonia Hijos de Villa los Reyes" :value="owner['nombre-campo']">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm mb-2" for="password">
            Direccion
          </label>
          <input class="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="text" placeholder="Lizardo monetero #843 Ventanilla-Callao" 
              :value="owner['direccion']">
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