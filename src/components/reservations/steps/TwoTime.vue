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
      <h1 class="text-center font-bold text-xl mb-6">Seleccione el tiempo (24horas)</h1>
    </div>
    <div class="flex-auto">
      <button v-for="n in 24" :disabled="(n < new Date().getHours()) ? true : false"
        class="bg-white text-black hover:bg-blue py-2 px-4 border-black border w-1/6 mr-1 mb-1"
        :class="(n < new Date().getHours()) ? 'disabled:opacity-75' : ''">
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