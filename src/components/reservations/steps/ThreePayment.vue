<script>
import PriceTable from '../shared/PriceTable.vue';

export default {
  components: {
    PriceTable,
  },
  data() {
    return {}
  },
  mounted() {
    this.countdown('clock', 0, 5);
  },
  methods: {
    countdown: function (element, minutes, seconds) {
        // set time for the particular countdown
        var time = minutes*60 + seconds;
        var interval = setInterval(function() {
            var el = document.getElementById(element);
            // if the time is 0 then end the counter
            if (time <= 0) {
                alert("se acabo su tiempo! [redirect]");
                clearInterval(interval);
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
    }


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
    calcPriceAccordToHour(){
        let result = 0;
        const startHour = this.reservationData['start-time'];
        // Price of day
        if (startHour >= 0 && startHour <= 18) {
            result =  this.calcHoras * this.ownerData['precio-dia'];
        } else {
            // Price of night
            result =  this.calcHoras * this.ownerData['precio-noche'];
        }

        return result;
    },
  },
}
</script>
<template>
    <div class="px-8 pt-6 pb-8 mb-4">
        <div class="w-full">
            <h1 class="text-center font-bold text-xl mb-6">Pagar en (<span id="clock">00:00</span>)</h1>
        </div>
        <div class="w-full">
            <div class="mb-2 flex place-content-center text-xs">
                <PriceTable />
            </div>
        </div>
        <div class="w-full">
            <form class="bg-white">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm mb-2" for="rent-time">
                    Resumen:
                    </label>
                    <textarea cols="30" rows="7" disabled
                        class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >====== Reserva =======
* Total:                  S/ {{ calcPriceAccordToHour }}
* Min. adelanto:  S/ {{ calcPriceAccordToHour/2 }}
=====================
* Por:   {{ reservationData['full-name'] }}
* Fecha:   {{ reservationData['date'] }}
* Hora de inicio:   {{ reservationData['start-time'] }} horas
* hora(s):   {{ calcHoras }}
                    </textarea>
                </div>
                <div class="mb-0 flex place-content-center">
                    <label class="text-xs">
                        Metodo de pago YAPE: ({{ownerData['numero']}}) <br/>
                        <!-- <span class="font-bold">Pago minimo: s/ 30.00</span> -->
                    </label>
                </div>
                <div class="img-yape-container flex place-content-center">
                    <img class="py-2" :src="ownerData['imagen-qr-yape']"/>
                </div>
                <div class="mb-2 flex place-content-center">
                    <span class="mr-2">Estado:</span>
                    <span class="text-red-500 font-bold">No Pagado</span>
                </div>
            </form>
        </div>
    </div>
</template>
<style>
.img-yape-container img{
    height: 220px;
}
</style>