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
        // this.selectButtonElement(event);


        let selectedHoursNow = this.getSelectedHours();
        console.log('selectedHours', selectedHoursNow);

        // this.selectButtonElementIf(selectedHoursNow);

        // apply logic to select button
        if (selectedHoursNow.length > 0) {
          let clickedNumbers = this.selectButtonElementIf(selectedHoursNow);
          let numberSelected = parseInt(event.target.getAttribute('aria-label'));
          if (clickedNumbers.includes(numberSelected) === true) {
            this.selectButtonElement(event);
          }
        } else {
          this.selectButtonElement(event);
        }

      }
    },
    selectButtonElement(event) {
      let numberSelected = parseInt(event.target.getAttribute('aria-label'));
      document.querySelector(`button[aria-label="${numberSelected}"]`).classList.toggle("selected");
    },
    getSelectedHours() {
      let elements = document.querySelectorAll('#button-container button.selected');
      var ids = [];
      elements.forEach(element => ids.push(parseInt(element.getAttribute('aria-label'))) );

      return ids;
    },
    selectButtonElementIf(items) {
      let fnNumberAllowed = function (items) {
        let allowedNumbersClick = [];
        items.sort(function(a, b) {
          return a - b;
        });

        let first = items[0];
        let last = items[items.length - 1];
        let prevFuture = first - 1;
        let nextFuture = last + 1;
        allowedNumbersClick.push(prevFuture);
        allowedNumbersClick.push(first);
        allowedNumbersClick.push(last);
        allowedNumbersClick.push(nextFuture);

        return allowedNumbersClick;
      };

      let allowedNumbersClick = fnNumberAllowed(items);
      console.log('allowedNumbersClick', allowedNumbersClick);
      return allowedNumbersClick;
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