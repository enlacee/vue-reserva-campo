<script setup>
import Home from './components/Home.vue'
import { isMobile } from './utils/validate';

</script>
<template>
  <header>
    <div class="wrapper">
      <div v-if="isMobile() == false" class="web shadow">
        <Home/>
      </div>
      <div v-if="isMobile() == true" class="w-full">
        <Home/>
      </div>
    </div>
  </header>
</template>
<style scoped>
.wrapper{
  display: flex;
  flex-flow: column wrap;
  /*justify-content: center;*/
  align-items: center;
  background-color:#ccc;
  width: 100%;
  height: 100vh;
}

.wrapper > div {
  background-color: white;
  height: 100vh;
  border: 1px solid black;
}
.web{
  /*
    320px — 480px: Mobile devices
    481px — 768px: iPads, Tablets
    769px — 1024px: Small screens, laptops
    1025px — 1200px: Desktops, large screens
  */
  width: 481px;
  max-width: 481px;
}
</style>
