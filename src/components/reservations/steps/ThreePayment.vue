<script>
import PaymentButton from '../shared/PaymentButton.vue';
import PaymentAccordion from '../shared/PaymentAccordion.vue';

// helper
import { get24HoursFormatFromNumber  } from '@/utils/helper';

export default {
  components: {
    PaymentButton,
    PaymentAccordion
},
  data() {
    return {}
  },
  mounted() {
    this.countdown('clock', 4, 0);
  },
  methods: {
    countdown: function (element, minutes, seconds) {
        // set time for the particular countdown
        var time = minutes*60 + seconds;
        var interval = setInterval(function() {
            var el = document.getElementById(element);
            // if the time is 0 then end the counter
            if (time <= 0) {
                alert("se acabo su tiempo!"); // redirect to home
                clearInterval(interval);
                // window.location.href = '/';
                return;
            }
            var minutes = Math.floor( time / 60 );
            if (minutes < 10) minutes = "0" + minutes;
            var seconds = time % 60;
            if (seconds < 10) seconds = "0" + seconds;
            var text = minutes + ':' + seconds;
            el.innerHTML = text;
            time--;
        }, 1000);
    },
    calculateReservationCost(startTime, durationInHour){
        const rateBefore18 = this.ownerData['precio-dia'];
        const rateAfter18 = this.ownerData['precio-noche'];

        // Convert StartTime and durationInHour to numeric values
        let start = parseInt(startTime, 10);
        let durationNum = parseInt(durationInHour, 10);

        // Calc the total cost of the reservation
        let totalCost = 0;
        let remainingHours = durationNum;

        while(remainingHours > 0) {
            if (start >= 0 && start < 18) {
                const hoursUntil18 = Math.min(remainingHours, 18 - start);
                totalCost += hoursUntil18 * rateBefore18;
                remainingHours -= hoursUntil18;
                start += hoursUntil18;
            }

            if (start >= 18 && start < 24) {
                const hoursUntil24 = Math.min(remainingHours, 24 - start);
                totalCost += hoursUntil24 * rateAfter18;
                remainingHours -= hoursUntil24;
                start += hoursUntil24;
            }
        }

        return totalCost;
    },
  },
  computed: {
    reservationData() {
        return this.$store.getters.reservationData;
    },
    ownerData() {
        return this.$store.getters.ownerData;
    },
    calcHoras() {
        let result = this.reservationData['end-time'] - this.reservationData['start-time'];
        return Math.abs(result);
    },
    calcHorasTexto() {
        return this.calcHoras === 1 ? 'hora' : 'horas';
    },
    printStartDate() {
        return get24HoursFormatFromNumber(this.reservationData['start-time']);
    },
    printDuration() {
        return this.calcHoras + ' ' + this.calcHorasTexto;
    },
    dataObjectForPayment() {
        let reservationData = this.reservationData;
        let durationInHours = this.calcHoras;
        let price = this.calculateReservationCost(reservationData['start-time'], durationInHours);
        let paymentData = {
            ...reservationData,
            durationInHours,
            price,
            googleSheetUrl: this.ownerData['google-sheet-url']
        };

        return paymentData;
    }
  },
}
</script>
<template>
    <div class="px-3 pt-3">
        <div class="w-full">
            <h1 class="text-center text-xl mb-2 text-red-600">
                Pagar en: <span id="clock" class="">00:00</span>
            </h1>
        </div>

        <div class="w-full bg-gray-100 p-4 mb-3">
            <h2 class="font-bold text-xl mb-2">Resumen de Reserva</h2>

            <div class="mb-0">
                <p><strong>Total:</strong> S/ {{ calculateReservationCost(reservationData['start-time'], calcHoras) }}</p>
                <p><strong>Reservado por:</strong> {{ reservationData['full-name'] }}</p>
                <p><strong>Fecha:</strong> {{ reservationData['date'] }}</p>
                <p><strong>Hora de inicio:</strong> {{ printStartDate }}</p>
                <p><strong>Duración:</strong> {{ printDuration }}</p>
            </div>

        </div>

        <div class="w-full bg-gray-100 p-4 text-xs">
            <h3 class="font-bold mb-2">Pasos para Completar el Pago con Yape</h3>

            <ol class="list-decimal ml-4">
                <li>Abre la aplicación Yape en tu teléfono.</li>
                <li>Selecciona la opción de <b>Yapear</b>.</li>
                <li>Ingresa el número de teléfono: <b>{{ ownerData['numero'] }}</b> como destinatario del pago.</li>
                <li>Ingrese el monto a pagar: <b>{{ dataObjectForPayment['price'] }}</b></li>
                <li>Confirma la transacción y ¡listo! Tu pago se realizará de manera segura.</li>
            </ol>
            <!-- <PaymentAccordion :dataObject="dataObjectForPayment" :ownerData="ownerData"></PaymentAccordion> -->
        </div>

        <PaymentButton :dataObject="dataObjectForPayment"></PaymentButton>
        <br/>
    </div>
</template>
<style>
    .img-yape-container img{
        height: 220px;
    }
</style>