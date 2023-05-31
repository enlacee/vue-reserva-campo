import { createStore } from 'vuex';

// Create a new store instance
const store = createStore({
    state() {
        return {
            owner: {}
        }
    },
    mutations: {
        setOwner(state, payload) {
            state.owner = payload;
        },
    },
    getters: {
        ownerData(state) {
            return state.owner;
        }
    },
    actions: {
        refreshOwnerData(context) {
        //   const response = await axios.get('...');


        //   context.commit('setOwner', response.data.message);
        }
    }
});

export default store;