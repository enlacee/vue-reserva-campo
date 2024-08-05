import { createStore } from 'vuex';
// helper
import { Browser  } from '@/utils/helper';

// Create a new store instance
const store = createStore({
    state() {
        return {
            isLoading: true,
            owner: {},
            reservation: {
                'full-name': null,
                'date': null,
                'start-time': null,
                'end-time': null
            }
        }
    },
    mutations: {
        setIsLoading(state, status) {
            state.isLoading = status;
        },
        setOwner(state, payload) {
            state.owner = payload;
        },
        setReservationDate(state, dateFormat) {
            state.reservation.date = dateFormat;
        },
        setReservationStartTime(state, startTime) {
            state.reservation['start-time'] = startTime;
        },
        setReservationEndTime(state, endTime) {
            state.reservation['end-time'] = endTime;
        },
        setReservationFullName(state, fullName) {
            state.reservation['full-name'] = fullName;
        }
    },
    getters: {
        ownerData(state) {
            return state.owner;
        },
        reservationData(state) {
            return state.reservation;
        },
    },
    actions: {
        refreshOwnerData(context) {

            /**
             * here just load the data in store (vuex).
             * it's was saved in sessionstorage for UserVerification Componet
             */
            const SESSION_OWNER_ID = 'owner-' + Browser.getIdFromUrl();
            if (sessionStorage.getItem(SESSION_OWNER_ID)) {
                try {
                    let theData = JSON.parse(sessionStorage.getItem(SESSION_OWNER_ID));
                    context.commit('setOwner', theData);
                    context.commit('setIsLoading', false);
                } catch(e) {
                    console.log(e);
                    sessionStorage.removeItem('owner');
                }
            }
        }
    }
});

export default store;