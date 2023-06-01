import { createStore } from 'vuex';

// Create a new store instance
const store = createStore({
    state() {
        return {
            owner: {},
            reservation: {
                'date': null,
                'start-time': null,
                'end-time': null
            }
        }
    },
    mutations: {
        setOwner(state, payload) {
            state.owner = payload;
        },
        setReservationDate(state, dateFormated) {
            state.reservation.date = dateFormated;
        },
    },
    getters: {
        ownerData(state) {
            return state.owner;
        },
    },
    actions: {
        refreshOwnerData(context) {
            const URL = 'https://script.google.com/macros/s/AKfycbzSyhh6sM_shxp9Jy8qa0aDx-08C7XT-CxOuV_pBGzUovrngM0TfOdhzw94TVIDcnXE/exec';
            const listURL = URL + '?op=list';
            if (localStorage.getItem('owner')) {
                try {
                    let theData = JSON.parse(localStorage.getItem('owner'));
                    context.commit('setOwner', theData);
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