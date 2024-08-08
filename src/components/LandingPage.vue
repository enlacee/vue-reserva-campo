<script setup>
/**
 * vue 3 settings
 * 
 * se autodeclara el componente para usarlo rapidamente al importar
 */
  import AppPage from '@/components/AppPage.vue';
  import { Browser  } from '@/utils/helper';
</script>

<script >
/**
 * vue 2 settings
 */
export default {
  data() {
    return {
      // landingHtml: null,
    };
  },
  mounted() {
    // fetch('/public/index.html')
    //   .then(response => response.text())
    //   .then(data => {
    //     this.landingHtml = data;
    //   });
  },
  computed: {
    showAppComponent() {
      // Verifica si existe un parámetro 'id' en la ruta
      return !!this.$route.query.id;
    },
  },
};
</script>
  
<template>
  <div v-if="showAppComponent == false">
    <!-- <div v-html="landingHtml"></div> -->
    <!-- <iframe src="/public/index.html" frameborder="0" style="width:100%; height:100vh;"></iframe> -->

    <iframe src="/public/index.html" frameborder="0" style="width:100%; height:100vh;"></iframe>
    <footer>
        <div class="demo-button">
            <a :href="Browser.getURLDemo()" class="btn-demo">Probar Demo</a>
        </div>
    </footer>
  </div>

  <div v-if="showAppComponent == true">
     <AppPage></AppPage>
  </div>
</template>
<style scoped>
/* Estilos generales para el pie de página */
footer {
    position: relative;
    width: 100%;
    padding: 20px;
    background-color: #f1f1f1;
    border-top: 1px solid #ddd;
}

/* Estilos para el botón de demo */
.demo-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
}

.btn-demo {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border-radius: 5px;
    text-decoration: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, transform 0.3s;
}

.btn-demo:hover {
    background-color: #0056b3;
    transform: scale(1.05);
}

</style>
  





  