<script>
export default {
  emits: ['changeCurrentComponent'],
  data() {
    return {
      selectedClass: false
    }
  },
  computed: {
    isCurrentHour() {
      return this.selectedYear == new Date().getHours();
    },
  },
  methods: {
    select: function(event){
      if (event) {
        // 01. Controll number to clicked
        let allowedNumbers = [];
        let selectedButtons = document.querySelectorAll('#button-container button.selected');
        if (selectedButtons.length > 0) {
          for (let index = 0; index < selectedButtons.length; index++) {
            const theNumber = parseInt(selectedButtons[index].getAttribute('aria-label'));
            allowedNumbers.push(theNumber);
          }
          // Adding Minor and Mayor range
          const first = allowedNumbers[0];
          const last = allowedNumbers[allowedNumbers.length - 1];
          allowedNumbers.push(first-1);
          allowedNumbers.push(last+1);
        }
        console.log('allowedNumbers 0', allowedNumbers);

        // 02. apply clicked with filter
        let numberSelected = parseInt(event.target.getAttribute('aria-label'));
        if (allowedNumbers.length === 0 || allowedNumbers.includes(numberSelected) === true) {
          let el = document.querySelector(`button[aria-label="${numberSelected}"]`);
          el.classList.toggle("selected");
        }
        console.log('allowedNumbers 1', allowedNumbers);
      }
    }
  }
}

</script>
<template>
  <div class="px-8 pt-6 pb-8 mb-4">
    <div class="w-full">
      <h1 class="text-center font-bold text-xl mb-6">Seleccione la hora(s) disponible(s) [24horas]</h1>
    </div>
    <div class="flex-auto" id="button-container">
      <button v-for="n in 24" :disabled="(n < new Date().getHours()) ? true : false"
        class="bg-white text-black py-2 px-4 border-black border w-1/5 mr-1 mb-1 border border-gray-400 shadow"
        @click="select($event)"
        :aria-label="n">
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
<style scoped>
  button[disabled]{
    opacity: 0.5;
  }
  .selected{
    background-color: #ccc;
  }
</style>