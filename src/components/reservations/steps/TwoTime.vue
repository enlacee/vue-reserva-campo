<script>
import checkDniModal from '../shared/checkDniModal.vue';
import { helperFormatDateYYYMMDD  } from '@/utils/validate';
import ReservationService from '@/services/ReservationService';

// helper
import { get24HoursFormatFromNumber  } from '@/utils/helper';

export default {
    emits: ['changeCurrentComponent'],
    components: {
        checkDniModal
    },
    data() {
        return {
            hours: [],
            isLoading: true,
        }
    },
    created() {
        // creando el componente
    },
    mounted() {
        // html ya montado
        this.fetchDataReservations();
    },
    computed: {
        ownerData() {
            return this.$store.getters.ownerData;
        },
        reservationData() {
            return this.$store.getters.reservationData;
        },
        rangeHours() {
            return Array.from({ length: 24 }, (_, index) => index);
        }
    },
    methods: {
        formatHour(hour) {
            return get24HoursFormatFromNumber(hour);
        },
        /**
         * Open modal just to the trigger clicked
         *
         * @return void
         **/
        openModalCheckDniModal: function(){
            document.querySelector('#button').click();
        },
        /**
         * Pre-payment
         *
         * @return void/booleam
         **/
        bookAndPay: function(event){
            // this.$emit('changeCurrentComponent', 'ThreePayment');
            const $fullName = document.getElementById('full-name');
            if ($fullName.value.length > 0) {
                this.$store.commit("setReservationFullName", $fullName.value.toUpperCase()); // save in STORE
                this.$emit('changeCurrentComponent', 'ThreePayment');
                return true;
            }

            if (this.hours.length > 0) {
                this.openModalCheckDniModal();
            } else {
                const $h1 = document.getElementsByTagName('h1')[0];
                $h1.classList.add('text-red-500');
                setTimeout(() => {
                    $h1.classList.remove('text-red-500')
                }, "1000");
            }
        },
        selectHour: function(event){
            if (event) {
                // Apply logic to click the button
                let numbers = this.getNumberSelectedRightNow();
                if (numbers.length > 0) {
                let allowedNumbers = this.getAllowedNumbers(numbers);
                let numberSelected = parseInt(event.target.getAttribute('aria-label'));
                if (allowedNumbers.includes(numberSelected) === true) {
                    this.selectButtonElement(event);
                }
                } else {
                this.selectButtonElement(event);
                }

                // set storage data
                this.setStorageReservationData();
            }
        },
        /**
         * Set reservation data from storage
         * - start-time
         * - end-time
         *
         * @return void
         **/
        setStorageReservationData(){
        let numbersUpdated = this.getNumberSelectedRightNow();
            if (numbersUpdated.length > 0) {
                this.hours = numbersUpdated;

                // set data to store
                let startTime = this.hours[0];
                let endTime = this.hours[this.hours.length - 1] + 1;
                this.$store.commit("setReservationStartTime", startTime);
                this.$store.commit("setReservationEndTime", endTime);
            } else {
                // clear data
                this.hours = [];
                this.$store.commit("setReservationStartTime", null);
                this.$store.commit("setReservationEndTime", null);
            }
        },

        /**
         * @return void
         **/
        selectButtonElement(event) {
            let numberSelected = parseInt(event.target.getAttribute('aria-label'));
            document.querySelector(`button[aria-label="${numberSelected}"]`).classList.toggle("selected");
        },

        /**
         * @return array (int)
         **/
        getNumberSelectedRightNow() {
            let ids = [];
            let elements = document.querySelectorAll('#button-container button.selected');
            elements.forEach(element => ids.push(parseInt(element.getAttribute('aria-label'))));
            return ids;
        },

        /**
         * @return array (int)
         **/
        getAllowedNumbers(numbers) {
            let fnNumberAllowed = function (numbers) {
                let result = [];
                // Sort the number asc
                numbers.sort(function(a, b) {
                    return a - b;
                });

                let first = numbers[0];
                let last = numbers[numbers.length - 1];
                let prevFuture = first - 1;
                let nextFuture = last + 1;
                result.push(prevFuture);
                result.push(first);
                result.push(last);
                result.push(nextFuture);

                return result;
            };
            let result = fnNumberAllowed(numbers);
            return result;
        },

        isDisabledThisHour(number) {
            let disabledFlag = false;
            if (this.reservationData['date']) {
                let today = new Date();
                let dateFormatedYYYMD = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
                dateFormatedYYYMD = helperFormatDateYYYMMDD(dateFormatedYYYMD);
                let currentHour = today.getHours();
                if (this.reservationData['date'] === dateFormatedYYYMD && currentHour >= number) {
                    disabledFlag = true;
                }
            }
            return disabledFlag;
        },

        /**
         * Ajax function
         */
        fetchDataReservations(){
            let that = this;
            let params = { 
                date: this.reservationData['date'],
                googleSheetUrl: this.ownerData['google-sheet-url']
            };

            ReservationService.get(params)
                .then((data) => {
                    function bloque1(data) {
                        return new Promise(resolve => {
                            if (data.length > 0) {
                                data.forEach(element => {
                                    let listaDeHoras = function(horaInicio, numeroDeHoras) {
                                        let horas = []
                                        for (let index = 0; index < numeroDeHoras; index++) {
                                            horas.push(horaInicio + index);
                                        }
                                        return horas;
                                    }
                                    let theHours = listaDeHoras(element['hora-inicio'], element['horas']);

                                    // Desabilitando los botones HORAS YA RESERVADAS
                                    for (let index = 0; index < theHours.length; index++) {
                                        document.getElementById('button-' + theHours[index]).disabled = true;
                                    }
                                });
                            }
                            resolve();
                        });
                    }
                    function bloque2(that) {
                        return new Promise(resolve => {
                            that.isLoading = false
                            resolve();
                        });
                    }
                    bloque1(data)
                        .then(() => bloque2(that))
                        .then(() => {
                            console.log("Ambos bloques completados");
                            // Aquí puedes ejecutar cualquier otro código que necesites después de completar ambos bloques
                        });

                    console.log('data', data);
                })
                .catch((error) => {
                    console.error(error);
                    this.isLoading = false;
                });
        }
    },
}
</script>
<template>
    <div class="px-3 pt-3">
        <div v-show="isLoading">Cargando...</div>
        <div v-show="!isLoading">
            <div class="w-full">
                <h1 class="text-center font-bold text-xl mb-6">Selecciona Horas Disponibles</h1>
            </div>
            <div class="text-center" id="button-container">
                <button v-for="n in rangeHours" :key="n" :disabled="isDisabledThisHour(n)"
                    :id="`button-${n}`"
                    class="bg-white text-black border border-black"
                    :class="`${isDisabledThisHour(n)? 'false' : 'shadow'}`"
                    @click="selectHour($event)"
                    :aria-label="n">
                    <!-- {{ n }} -->
                    {{ formatHour(n) }}
                </button>
            </div>
            <p>&nbsp;</p>

            <div class="flex gap-2">
            <button
                @click="$emit('changeCurrentComponent', 'OneDate')"
                class="flex-grow-0 bg-white text-black py-2 px-4 border-black border-2">
                Atras
            </button>
            <button
                @click="bookAndPay(event)"
                class="flex-grow bg-black text-white py-2 px-4">
                Reservar y Pagar
            </button>
            </div>

            <!-- modal -->
            <checkDniModal/>
        </div>
    </div>
</template>
<style scoped>
#button-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
#button-container > button{
    margin: 5px 0;
    padding: 14px;
}

button[disabled]{
    opacity: 0.1;
}
.selected{
    background-color: #4caf50;
}
</style>