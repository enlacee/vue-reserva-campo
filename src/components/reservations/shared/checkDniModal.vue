<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();

})

let checkFullNameInput = function(event) {
    const $fullName = document.getElementById('full-name');
    if ($fullName.value.length === 0) {
        alert ("Ingrese el nombre completo");
        $fullName.focus();
    } else {
        document.querySelector('#closeButton').click();
    }
}
</script>
<template>
    <div>
        <!-- Hidden the Button to open modal -->
        <div class="flex justify-center p-4 hidden">
            <button id="button" data-modal-toggle="modal" data-modal-target="modal" 
            type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Show modal</button>
        </div>

        <div id="modal"
            tabindex="-1"
            aria-hidden="true"
            class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full max-w-2xl max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                            Antes de reservar y pagar
                        </h3>
                        <button id="closeButton" data-modal-hide="modal" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="p-5 space-y-5">
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-sm text-red-700">
                            Nombre completo del titular de la cuenta <strong>YAPE (unico metodo de pago)</strong></p>
                        <div>
                            <form class="bg-white" action="javascript:void(0);">
                                <!-- <div class="flex flex-wrap">
                                    <div class="w-full_ sm:w-2/3" style="width:69%; padding-right:1%">
                                        <label class="block text-gray-700 text-sm" for="dni">DNI</label>
                                        <input class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight "
                                            id="dni" type="text" pattern="\d" minlength="8" maxlength="8" autofocus/>
                                    </div>
                                    <div class="w-full_ sm:w-1/3" style="width: 30%;">
                                        <label class="block text-gray-700 text-sm">&nbsp;</label>
                                        <button style="padding: 7.5px; 8px"
                                            class="bg-black text-white py-2 px-4 focus:outline-none focus:shadow-outline w-full" type="button">Validar</button>
                                    </div>
                                </div> -->
                                <div class="mt-1">
                                    <input class="uppercase shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="full-name" type="text" placeholder="JUAN CARLOS ROMERO SALAZ"/>
                                </div>
                            </form>

                            <!-- <p class="mt-2 text-xs  text-gray-500">Si el nombre no coincide con la cuenta YAPE, no se hara la reserva automaticamnete. Si tubieras un problema con el pago
                                puedes escribirnos  +519189127 con la captura de pantalla
                            </p> -->
                        </div>

                    </div>
                    <!-- Modal footer -->
                    <div class="flex items-center justify-center p-5 space-x-2 border-t">
                        <button type="button" class="text-white bg-gray-900 hover:bg-gray-900 font-medium text-sm px-5 py-2.5 text-center"
                            @click="checkFullNameInput(event);">Guardar</button>
                        <!-- <button type="button" class="text-gray-500 bg-white hover:bg-gray-100 border border-gray-200 text-sm font-medium px-5 py-2.5">Cancelar</button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>