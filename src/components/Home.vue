<script>
import Reservation from './reservations/Reservation.vue';
import StepOneDate from './reservations/steps/OneDate.vue';
import StepTwoTime from './reservations/steps/TwoTime.vue';
import StepThreePayment from './reservations/steps/ThreePayment.vue';

export default {
  components: {
    Reservation,
    StepOneDate,
    StepTwoTime,
    StepThreePayment
  },
  data() {
    return {
      currentTab: 'Reservation',
      tabs: ['Reservation', 'StepOneDate', 'StepTwoTime', 'StepThreePayment']
    }
  },
  computed: {},
  methods: {
    setComponentName(nameComponent){
      // Change the current tab selected
      this.currentTab = nameComponent
    }

  }
}
</script>
<script setup>

</script>
<template>
  <button
      v-for="tab in tabs"
      :key="tab"
      :class="['bg-blue-500  px-4 m-1 border-black border-2', { active: currentTab === tab }]"
      @click="currentTab = tab"
    >
    {{ tab }}
  </button>

  <component :is="currentTab" @changeCurrentComponent="setComponentName"></component>

</template>