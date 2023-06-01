<script>
export default {
  emits: ['changeCurrentComponent'],
  data() {
    return {
    }
  },
  computed: {
    isCurrentHour() {
      return this.selectedYear == new Date().getHours();
    },
  }
}

</script>
<template>
  <div class="px-8 pt-6 pb-8 mb-4">
    <div class="w-full">
      <h1 class="text-center font-bold text-xl mb-6">Seleccione la hora(s) disponible(s) [24horas]</h1>
    </div>
    <div class="flex-auto">
      <button v-for="n in 24" :disabled="(n < new Date().getHours()) ? true : false"
        class="bg-white text-black py-2 px-4 border-black border w-1/5 mr-1 mb-1 border border-gray-400 shadow"
        :class="(n < new Date().getHours()) ? 'disabled:opacity-75 cursor-not-allowed' : 'hover:bg-gray-100'">
        {{ n }}
      </button>
    </div>
    <p>&nbsp;</p>
    <div class="flex gap-2">
      <button
        @click="$emit('changeCurrentComponent', 'OneDate')"
        class="flex-grow-0 bg-white text-black py-2 px-4 border-black border-2">
        Atras
      </button>
      <button
        @click="$emit('changeCurrentComponent', 'ThreePayment')"
        class="flex-grow bg-black text-white py-2 px-4">
        Reservar y Pagar
      </button>
    </div>
  </div>
</template>