
<script>
    import { ref } from 'vue';
    import { onMounted } from 'vue';
    import { initFlowbite } from 'flowbite'

    export default {
        props: {
            dataObject: {
                type: Object,
                required: true
            },
            ownerData: {
                type: Object,
                required: true
            }

        },
        setup(props) {

            onMounted(() => {
                initFlowbite();
            });

            return {};
        },
    };
</script>
<template>

    <div class="mt-2 mb-3 flex place-content-center">
        <!-- <p>
            Dos Pasos: Paga con Yape y Valida
        </p> -->
        <!-- Verificación de Pago en Progreso: {{ dataObject }} {{ ownerData }} -->
    </div>

    <div id="accordion-open" data-accordion="collapse">
        <h2 id="accordion-open-heading-1">
            <button type="button" 
                class="flex items-center justify-between w-full p-4 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" 
                data-accordion-target="#accordion-open-body-1" 
                aria-expanded="true" 
                aria-controls="accordion-open-body-1">
                <span class="flex items-center">
                    Realizar el Pago con Yape
                </span>
                <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                </svg>
            </button>
        </h2>
        <div id="accordion-open-body-1" class="hidden" aria-labelledby="accordion-open-heading-1">
            <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">

                <ol class="list-decimal ml-4">
                    <li>Abre la aplicación Yape en tu teléfono.</li>
                    <li>Selecciona la opción de <b>Yapear</b>.</li>
                    <li>Ingresa el número de teléfono: <b>{{ ownerData['numero'] }}</b> como destinatario del pago.</li>
                    <li>Ingrese el monto que deseas pagar: <b>{{ dataObject['price'] }}</b></li>
                    <li>Confirma la transacción y ¡listo! Tu pago se realizará de manera segura.</li>
                </ol>
            </div>
        </div>
        <!-- 
        <h2 id="accordion-open-heading-2">
            <button type="button"
                class="flex items-center justify-between w-full p-4 font-medium text-left text-gray-500 border border-b-1 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
                <span class="flex items-center">
                    Paso 2: Haz clic en Validar tu Pago en Nuestra App
                </span>
                <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                </svg>
            </button>
        </h2>
        <div id="accordion-open-body-2" class="hidden" aria-labelledby="accordion-open-heading-2">
            <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                <ol class="list-decimal ml-4">
                    <li>En esta pantalla, encontrarás el botón <b>"Validar Pago"</b>. Haz clic en él.</li>
                    <li>Una vez validado, se mostrara un mensaje confirmación de que tu pago ha sido procesado exitosamente.</li>
                </ol>
            </div>
        </div>
         -->
    </div>
</template>