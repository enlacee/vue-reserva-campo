
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
            // const processing = ref(true);
            const message = ref('');
            let intervalId = null;


            const processAjax = () => {
                processing.value = true;

                console.log('this.dataObjects', props.dataObject);
                const {
                    date,
                    'start-time': hour,
                    durationInHours:durationHour,
                    'full-name': yapename,
                    price: yapepayment,
                    googleSheetUrl
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
                        yapepayment,
                        'google-sheet-url': googleSheetUrl
                    };
                    
                    ReservationService.makeTheReservation(params)
                    .then((data) => {
                        if (data.length === 1 && typeof data[0] === 'object' && data[0].ok === true) {
                            message.value = 'success';
                            clearInterval(intervalId); // Detener las solicitudes periódicas
                            processing.value = false;
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

            const startProcessWithDelay = () => {
                setTimeout(() => {
                    processAjax();
                    intervalId = setInterval(() => {
                        processAjax();
                    }, 4000);
                }, 2000);
            };

            onMounted(() => {
                initFlowbite();
                startProcessWithDelay();;
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
            disabled
            :class="['mt-12 w-full text-white font-medium text-sm px-5 py-2.5 text-center', processing ? 'loading' : (message === 'success' ? 'success' : '')]"
            data-tooltip-target="tooltip-click" data-tooltip-trigger="click" type="button" 
            class="mt-12 w-full text-white bg-black font-medium text-sm px-5 py-2.5 text-center">
            {{ processing ? 'Pago Pendiente' : 'Pago Realizado' }} 
        </button>
        <div id="tooltip-click" role="tooltip" 
            class="absolute z-10_ _invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-100 tooltip dark:bg-gray-700">
            Verificando tu pago...
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>

        <div v-if="message" class="mt-4">
            <div v-if="message === 'success'" 
                class="p-4 mb-4 text-sm text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <span class="font-medium">Se registro la reservacion correctamente!</span> .
            </div>

            <!-- <div v-else-if="message === 'error'"  
                class="p-4 mb-4 text-sm text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">-->
                <div class="text-xs">
                <span class="font-medium">Posibles motivos por los que su pago no se está procesando:</span>
                <ul class="mt-1.5 ml-4 list-disc list-inside">
                    <li>Se acaba de realizar la reserva por otro usuario.</li>
                    <li>No se a realizado el pago yape con la cantidad exacta.</li>
                    <!-- <li>Ocurrio un error al procesar, intenta en otro momento.</li> -->
                </ul>
                </div>
            <!-- </div> -->
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
    .success {
        background-color: green !important;
    }

    .loading {
        position: relative;
        cursor: not-allowed;
        opacity: 0.6;
    }

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
    border: 2px solid transparent;
    border-top-color: white;
    border-right-color: white;
    border-radius: 50%;
    animation: spinner 0.8s linear infinite;
}

@keyframes spinner {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>