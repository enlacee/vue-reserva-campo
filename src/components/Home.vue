<script>
import Reservation from '@/components/reservations/Reservation.vue';
import OneDate from '@/components/reservations/steps/OneDate.vue';
import TwoTime from '@/components/reservations/steps/TwoTime.vue';
import ThreePayment from '@/components/reservations/steps/ThreePayment.vue';

export default {
  components: {
    Reservation,
    OneDate,
    TwoTime,
    ThreePayment
  },
  data() {
    return {
      currentTab: 'Reservation',
      tabs: ['Reservation', 'OneDate', 'TwoTime', 'ThreePayment']
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
  <!-- <button
      v-for="tab in tabs"
      :key="tab"
      :class="['bg-blue-500  px-4 m-1 border-black border-2', { active: currentTab === tab }]"
      @click="currentTab = tab"
    >
    {{ tab }}
  </button> -->

  <component :is="currentTab" @changeCurrentComponent="setComponentName"></component>
</template>