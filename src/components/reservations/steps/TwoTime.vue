<script>
import checkDniModal from '../shared/checkDniModal.vue';

export default {
  emits: ['changeCurrentComponent'],
  components: {
    checkDniModal
  },
  data() {
    return {
      hours: [],
      fullNameOfTheClient: '',
    }
  },
  mounted() {

  },
  methods: {
    /**
     * Open modal just to the trigger clicked
     *
     * @return void
     **/
    openModalCheckDniModal: function(){
      document.querySelector('#button').click();
    },
    /**
     * Pre-payment
     *
     * @return void/booleam
     **/
    bookAndPay: function(event){
      const $fullName = document.getElementById('full-name');
      if ($fullName.value.length > 0) {
          this.$store.commit("setReservationFullName", $fullName.value.toUpperCase()); // save in STORE
          this.$emit('changeCurrentComponent', 'ThreePayment');
          return true;
      }

      if (this.hours.length > 0) {
        this.openModalCheckDniModal();
      }
    },
    selectHour: function(event){
      if (event) {
        // Apply logic to click the button
        let numbers = this.getNumberSelectedRightNow();
        if (numbers.length > 0) {
          let allowedNumbers = this.getAllowedNumbers(numbers);
          let numberSelected = parseInt(event.target.getAttribute('aria-label'));
          if (allowedNumbers.includes(numberSelected) === true) {
            this.selectButtonElement(event);
          }
        } else {
          this.selectButtonElement(event);
        }

        // set storage data
        this.setStorageReservationData();
      }
    },
    /**
     * Set reservation data from storage
     * - start-time
     * - end-time
     *
     * @return void
     **/
    setStorageReservationData(){
      let numbersUpdated = this.getNumberSelectedRightNow();
        if (numbersUpdated.length > 0) {
          this.hours = numbersUpdated;

          // set data to store
          let startTime = this.hours[0];
          let endTime = this.hours[this.hours.length - 1] + 1;
          this.$store.commit("setReservationStartTime", startTime);
          this.$store.commit("setReservationEndTime", endTime);
        } else {
          // clear data
          this.hours = [];
          this.$store.commit("setReservationStartTime", null);
          this.$store.commit("setReservationEndTime", null);
        }
    },

    /**
     * @return void
     **/
    selectButtonElement(event) {
      let numberSelected = parseInt(event.target.getAttribute('aria-label'));
      document.querySelector(`button[aria-label="${numberSelected}"]`).classList.toggle("selected");
    },

    /**
     * @return array (int)
     **/
    getNumberSelectedRightNow() {
      let ids = [];
      let elements = document.querySelectorAll('#button-container button.selected');
      elements.forEach(element => ids.push(parseInt(element.getAttribute('aria-label'))));
      return ids;
    },

    /**
     * @return array (int)
     **/
    getAllowedNumbers(numbers) {
      let fnNumberAllowed = function (numbers) {
        let result = [];
        // Sort the number asc
        numbers.sort(function(a, b) {
          return a - b;
        });

        let first = numbers[0];
        let last = numbers[numbers.length - 1];
        let prevFuture = first - 1;
        let nextFuture = last + 1;
        result.push(prevFuture);
        result.push(first);
        result.push(last);
        result.push(nextFuture);

        return result;
      };
      let result = fnNumberAllowed(numbers);
      return result;
    }
  },
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
        @click="selectHour($event)"
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
        @click="bookAndPay(event)"
        class="flex-grow bg-black text-white py-2 px-4">
        Reservar y Pagar
      </button>
    </div>

    <!-- modal -->
    <checkDniModal/>

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