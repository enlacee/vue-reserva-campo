<script>
import { helperFormatDateYYYMMDD  } from '@/utils/validate';

export default {
  emits: ['changeCurrentComponent'],
  data() {
    return {
      // dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNames: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      monthNames: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
      ],
      selectedMonth: new Date().getMonth(),
      selectedYear: new Date().getFullYear(),
      // selectedDate: null
      selectedDate: new Date()
    };
  },
  computed: {
    today() {
      return new Date();
    },
    isCurrentYear() {
      return this.selectedYear == new Date().getFullYear();
    },
    isCurrentMonth() {
      return this.selectedMonth == new Date().getMonth() && this.isCurrentYear;
    },
    daysInMonth() {
      return new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
    },
    firstDayOffset() {
      return new Date(this.selectedYear, this.selectedMonth, 1).getDay();
    },
    days() {
      return Array.from(
        Array(this.firstDayOffset + this.daysInMonth).keys()
      ).map((pos) => (pos >= this.firstDayOffset ? (pos - this.firstDayOffset) + 1 : 0));
    },
    years () {
      return Array.from({length: 10}, (value, index) => this.today.getFullYear() + index)
    }
  },
  methods: {
    prevMonth() {
      if (this.selectedMonth == 0) {
        this.selectedMonth = 11;
        this.selectedYear--;
      } else {
        this.selectedMonth--;
      }
    },
    nextMonth() {
      if (this.selectedMonth == 11) {
        this.selectedMonth = 0;
        this.selectedYear++;
      } else {
        this.selectedMonth++;
      }
    },
    selectDay(day) {
      this.clearTheClassOfDaySelected();

      // set and emit selected date
      this.selectedDate = new Date(this.selectedYear, this.selectedMonth, day);
      //   this.$emit("dateSelected", this.selectedDate);

      // Obtener la referencia del botón clicado
      const selectedButton = this.$refs['day-' + day]?.[0];

      // Agregar la clase 'selected' al botón clicado
      selectedButton?.parentNode?.classList.add('selected');
    },
    clearTheClassOfDaySelected() {
      // Remover la clase 'selected' de todos los botones
      const buttons = this.$refs.vcalContainer.querySelectorAll('.vcal-day');
      buttons.forEach(button => {
        button.classList.remove('selected');
      });
    },
    /**
     * Get if true or fale if day selected make match with the calendar view
     * 
     * @param num days of the month
     */
    isDaySelected(num) {
      let selectedDate = this.selectedDate;
      let result = false;

      if ( 
        this.selectedMonth == selectedDate.getMonth() &&
        this.selectedYear == selectedDate.getFullYear() &&
        num == selectedDate.getDate()
      ) {
        result = true;
      }

      return result;
    }
  },
  mounted() {
    // Selected format date
    let dateFormatedYYYMD = `${this.selectedDate.getFullYear()}-${this.selectedDate.getMonth()+1}-${this.selectedDate.getDate()}`;
    dateFormatedYYYMD = helperFormatDateYYYMMDD(dateFormatedYYYMD);
    this.$store.commit("setReservationDate", dateFormatedYYYMD);
  },
  watch: {
    selectedDate(newValue, oldValue) {
      let dateFormatedYYYMD = `${newValue.getFullYear()}-${newValue.getMonth()+1}-${newValue.getDate()}`;
      dateFormatedYYYMD = helperFormatDateYYYMMDD(dateFormatedYYYMD);
      this.$store.commit("setReservationDate", dateFormatedYYYMD);
    }
  }
};
</script>
<template>
  <div id="theapp" class="px-3 pt-3">
    <div class="w-full">
      <h1 class="text-center font-bold text-xl mb-6">Calendario</h1>
    </div>
    <div class="vcal" ref="vcalContainer">
      <div class="vcal-nav" aria-label="Calendar Navigation">

        <!-- prev -->
        <button
          data-direction="prev"
          @click="prevMonth()"
          :aria-disabled="isCurrentMonth"
          title="previous month"
        >&larr;</button>

        <div class="vcal-nav--title">
          <select v-model="selectedMonth" disabled>
            <option v-for="(name, index) in monthNames" :value="index" :selected="selectedMonth == index ? 'selected' : false" :disabled="isCurrentYear && index < today.getMonth()">{{ name }}</option>
          </select>
          <select v-model="selectedYear" disabled>
            <option v-for="year in years" :value="year" :selected="year == selectedYear ? 'selected' : false">{{ year }}</option>
          </select>
        </div>

        <!-- next -->
        <button data-direction="next" @click="nextMonth()" title="next month">&rarr;</button>
      </div>
      <div class="vcal-weekdays">
        <div v-for="name in dayNames">{{ name }}</div>
      </div>
      <div class="vcal-grid">
        <div
          v-for="num in days"
          class="vcal-day"
          :class="{
            blank: !num,
            selected: isDaySelected(num)
          }">
          <button
            v-if="num"
            :aria-disabled="isCurrentMonth && (num < today.getDate())"
            :aria-current="selectedDate &&
selectedDate.toLocaleDateString() == new Date(selectedYear, selectedMonth, num).toLocaleDateString() ? 'date' : false"
            :title="new Date(selectedYear, selectedMonth, num).toLocaleDateString('en-us',{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})"
            @click="selectDay(num)"
            :ref="'day-' + num"
          >
            {{ num }}
          </button>
        </div>
      </div>
      <div class="vcal-details">
        <span data-selected="title" v-if="selectedDate">Fecha: </span>
        <span data-selected="date" v-if="selectedDate">
          {{ selectedDate.toLocaleDateString('es-pe', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'}) }}
        </span>
		</div>
    </div>
    <p>&nbsp;</p>

    <div class="flex gap-2">
      <button
        @click="$emit('changeCurrentComponent', 'Reservation')"
        class="flex-grow-0 bg-white text-black py-2 px-4 border-black border-2">
        Atras
      </button>
      <button
        @click="$emit('changeCurrentComponent', 'TwoTime')"
        class="flex-grow bg-black text-white py-2 px-4">
        Siguiente
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#theapp {
  margin: 0;
  //height: 100vh;
  //padding: 5rem 1rem;
//   font-family: sans-serif;
  font-weight: 300;
  //background: linear-gradient(45deg, #0ba 20%, #5731ab 80%);
  box-sizing: border-box;
}
.vcal {
  background: #fff;
  color: #333;
  max-width: 40rem;
  margin: 0 auto;
  box-shadow: 0 0 1rem rgba(0,0,0,.2);
  //border-radius: 1rem;
  button {
    width: 100%;
    height: 100%;
    font-size: inherit;
    font-weight: inherit;
    appearance: none;
    border: none;
    background: transparent;
    text-align: center;
    cursor: pointer;
    padding: 0;
  }
  [aria-disabled=true] {
    pointer-events: none;
    opacity: 0.5;
  }
}

/**
 * header selector del mes y anio 
**/
.vcal-nav {
  text-align: center;
  display: flex;
  //gap: 1rem;
  gap: 0;
  //font-size: 1.25rem;
  select {
    border: 1px solid #ccc;
    background-color: transparent;
    border-radius: .25rem;
    font-size: inherit;
    font-weight: inherit;
    padding: .25rem 1rem;
  }
  [data-direction] {
    flex: 0 0 3rem;
    line-height: 3rem;
    transition: background-color .25s;
    &:hover {
      color: #0ba;
    }
  }
}

.vcal-nav--title {
  flex: 1 1 auto;
  display: flex;
  // gap: 2rem;
  gap: 0;
  justify-content: center;
  align-items: center;
}

.vcal-weekdays,
.vcal-grid {
  width: 100%;
  display: grid;
  box-sizing: border-box;
  padding: 0 1rem;
  grid-template-columns: repeat(7, 1fr);
}

.vcal-weekdays > div {
  padding: 1rem 0;
  text-align: center;
}

.vcal-day {
  line-height: 2.5rem;
  border-radius: .25em;
  overflow: hidden;
  &.today {
    box-shadow: inset 0 0 0 2px #ccc;
  }
  &.selected {
    box-shadow: inset 0 0 0 2px black;
  }
  button {
    transition: background-color .25s, color .25s;
    &:not([aria-disabled]):hover {
      color: #fff;
      background: rgba(0,0,0,.7);
    }
    &[aria-current=true] {
      color: #fff;
      background: #0ba;
      pointer-events: none;
      font-weight: bold;
    }
  }
}

.vcal-details {
  text-align: center;
  padding: 1em;
  letter-spacing: .05em;
  min-height: 3em;
  box-sizing: border-box;

  [data-selected="date"] {
    font-weight: bold;
    text-transform: capitalize;
  }
  [data-selected="title"] {
    font-weight: 300;
    font-size: .875em;
    text-transform: uppercase;
    color: rgba(0,0,0,.6);
  }
}
</style>
