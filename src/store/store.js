import { createStore } from 'vuex';

const VITE_API_APPSCRIPT = import.meta.env.VITE_API_APPSCRIPT;

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
            const URL = VITE_API_APPSCRIPT;
            const listURL = URL + '?op=list';
            if (localStorage.getItem('owner')) {
                try {
                    let theData = JSON.parse(localStorage.getItem('owner'));
                    context.commit('setOwner', theData);
                    context.commit('setIsLoading', false);
                } catch(e) {
                    console.log(e);
                    localStorage.removeItem('owner');
                }
            } else {
                try {
                fetch(listURL, { method: 'GET' })
                    .then(response => response.json())
                    .then((data) => {
                        console.log('response', data, data[0]);
                        let theData = data[0];
                        context.commit('setOwner', theData);

                        const parsed = JSON.stringify(theData);
                        localStorage.setItem('owner', parsed);
                        context.commit('setIsLoading', false);
                    })
                    .catch(error => console.error(error));
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }
});

export default store;