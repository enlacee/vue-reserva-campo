 
<script>
import UserService from '@/services/UserService';
const VITE_USER_DEMO_ID = import.meta.env.VITE_USER_DEMO_ID;
  
export default {
    data() {
      return {
        loading: false,
        userId: '',
        userExists: false
      };
    },
    mounted() {
    // Llama a la acción para actualizar los datos del propietario
    //   this.refreshOwnerData();
    },
    methods: {
        async checkUserExistence(userId) {
            this.loading = true;
            try {
                // Llamada al servicio para verificar la existencia del usuario
                const userData = await UserService.getById(userId);
                console.log('userData', userData);
                this.userExists = !!userData.data; // Si userData no es null o undefined, el usuario existe
                console.log('this.userExists', this.userExists);
                if (this.userExists === true) { // usuario exite
                    console.log("usuario existe " + userId);
                    this.redirectToComponent();
                }
            } catch (error) {
                console.error('Error al verificar la existencia del usuario:', error);
            } finally {
                this.loading = false;
            }
        },

        /**
         * 
         * @param event change of component
         */
        redirectToComponent (event) {
            const nameOfComponent = 'Reservation';
            this.$emit('changeCurrentComponent', nameOfComponent);
        }
    },
    created() {
        console.log("Componente UserVerification.vue creado!");
        const queryString = window.location.search;

        // Parsear la cadena de consulta para obtener los parámetros
        const urlParams = new URLSearchParams(queryString);

        // Obtener el valor del parámetro 'id'
        this.userId = urlParams.get('id');

        if (typeof this.userId === "string" && this.userId.length === 0 || this.userId === null) {
            // carga usuario demo default
            this.checkUserExistence(VITE_USER_DEMO_ID);
        } else {
            this.checkUserExistence(this.userId);
        }
    },
}
</script>
<template>
    <div class="px-3 pt-3">
        <div v-if="loading">Cargando...</div>

        <div class="w-full" v-if="!loading">
            <h1 class="text-center font-bold">El usuario con ID <span class="underline">{{ userId }}</span> no existe.</h1>

            <div class="flex place-content-center">
                <a href="/" class="text-sm text-blue-700">¡Ir a la pagina de inico!</a>
            </div>
        </div>

    </div>
</template>
