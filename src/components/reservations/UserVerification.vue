 
<script>
import UserService from '@/services/UserService';
import { Browser  } from '@/utils/helper';
  
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

        /**
         * Check if exist the user
         * if exist create a session storage for save data
         * 
         * @param userId 
         *
         * @return void
         */
        async checkUserExistence(userId) {

            const SESSION_OWNER_ID = `owner-${userId}`;
            if (sessionStorage.getItem(SESSION_OWNER_ID)) {
                try {
                    let theData = JSON.parse(sessionStorage.getItem(SESSION_OWNER_ID));
                    this.userExists = !!theData;
                } catch(e) {
                    console.log(e);
                    sessionStorage.removeItem(SESSION_OWNER_ID);
                }
            } else {
                this.loading = true;
                try {
                    const userData = await UserService.getById(userId);
                    console.log('userData', userData);
                    this.userExists = !!userData.data; // Si userData no es null o undefined, el usuario existe

                    const parsed = JSON.stringify(userData.data);
                    sessionStorage.setItem(SESSION_OWNER_ID, parsed);
                } catch (error) {
                    console.error('Error al verificar la existencia del usuario:', error);
                } finally {
                    this.loading = false;
                }
            }

            /**
             * redirect to next component
             */
            if (this.userExists === true) {
                console.log("usuario existe " + userId);
                this.redirectToComponent();
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
        const urlParams = new URLSearchParams(queryString);
        this.userId = Browser.getIdFromUrl();

        this.checkUserExistence(this.userId);
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
