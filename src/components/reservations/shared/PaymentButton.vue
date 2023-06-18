
<script>
    import { ref } from 'vue';
    import { onMounted } from 'vue';
    import { initFlowbite } from 'flowbite'
    import ReservationService from '@/services/ReservationService';

    export default {
        props: {
            dataObject: {
                type: Object,
                required: true
            }
        },
        setup(props) {
            const processing = ref(false);
            const message = ref('');

            const processAjax = () => {
                processing.value = true;

                console.log('this.dataObjects', props.dataObject);
                const {
                    date,
                    'start-time': hour,
                    durationInHours:durationHour,
                    'full-name': yapename,
                    price: yapepayment
                } = props.dataObject;

                if (date && hour && durationHour && yapename, yapepayment) {
                    console.log(' === listo para hacer la consulta si existe Disponibilidad para reserva');
                    console.log('date', date);
                    console.log('startHour', hour);
                    console.log('durationInHours', durationHour);
                    console.log('yapeName', yapename);
                    console.log('yapePayment', yapepayment);

                    const params = {
                        date,
                        hour,
                        durationHour,
                        flag: 'try-to-reserve',
                        yapename,
                        yapepayment
                    };
                    ReservationService.makeTheReservation(params)
                    .then((data) => {
                        if (data.length === 1 && typeof data[0] === 'object' && data[0].ok === true) {
                            message.value = 'success';
                        } else {
                            message.value = 'error';
                        }
                        console.log('data', data);
                        // processing.value = false;
                    })
                    .catch((error) => {
                        console.error(error);
                        // processing.value = false;
                        message.value = 'error';
                    });
                }
            };

            onMounted(() => {
                initFlowbite();
            });

            return {
                processAjax, // Hacer el método accesible desde la plantilla u otros componentes
                processing,
                message,
            };
        },
    };
</script>
<template>
    <div>

        <!-- Show tooltip on click -->
        <button
            @click="processAjax"
            :disabled="processing"
            :class="processing ? 'disabled:opacity-75' : ''"
            data-tooltip-target="tooltip-click" data-tooltip-trigger="click" type="button" 
            class="mt-12 w-full text-white bg-black font-medium text-sm px-5 py-2.5 text-center">
            {{ processing ? 'Validando Pago...' : 'Validar Pago' }} 
        </button>
        <div id="tooltip-click" role="tooltip" 
            class="absolute z-10_ _invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-100 tooltip dark:bg-gray-700">
            En caso ya efectuo el pago
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>

        <div v-if="message" class="mt-4">
            <div v-if="message === 'success'" 
                class="p-4 mb-4 text-sm text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <span class="font-medium">Se registro la reservacion correctamente!</span> .
            </div>

            <div v-else-if="message === 'error'" 
                class="p-4 mb-4 text-sm text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span class="font-medium">Ocurrio un error!. </span> Los motivos:
                <ul class="mt-1.5 ml-4 list-disc list-inside">
                    <li>Se acaba de realizar la reserva por otro usuario.</li>
                    <li>No se a realizado el pago yape con la cantidad exacta.</li>
                    <li>Ocurrio un error al procesar, intenta en otro momento.</li>
                </ul>
            </div>
        </div>

        <!-- <div class="mt-4 mb-2 flex place-content-center">
            <span class="mr-2">Estado:</span>
            <span class="text-red-500 font-bold">No Pagado</span>
        </div> -->


    </div>
</template>
<style scoped>
    button{
        background-color: #8A139A !important;
    }
</style>