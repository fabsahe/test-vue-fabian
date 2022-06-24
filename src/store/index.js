import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name1: '',
    name2: '',
    lastname1: '',
    lastname2: '',
    day: '',
    month: '',
    monthName: '',
    year: '',
    email: '',
    phone: ''
  },
  getters: {
    birthday: (state) => `${state.year}-${state.month}-${state.day}`,

    progress: (state) => {
      const v1 = state.name1 && state.lastname1 && state.lastname2 ? 33 : 0;
      const v2 = state.day && state.month && state.year ? 33 : 0;
      const v3 = state.email && state.phone ? 33 : 0;
      const total = v1 + v2 + v3;

      return total === 99 ? 100 : total;
    },

    result: (state) => {
      const line1 = `Fecha de nacimiento: ${state.day} ${state.monthName} ${state.year}`;
      const line2 = `Correo electrónico: ${state.email}`;
      const line3 = `Teléfono celular: ${state.phone}`;
      const line4 = `Nombre: ${state.name1} ${state.name2} ${state.lastname1} ${state.lastname2}`;

      return { line1, line2, line3, line4 };
    },

    dataToSend: (state) => {
      const day = state.day.length === 1 ? `0${state.day}` : state.day;
      const name2 = state.name2 ? state.name2 : '';
      const data = {
        name_1: state.name1,
        name_2: name2,
        lastname_1: state.lastname1,
        lastname_2: state.lastname2,
        birthday: `${state.year}-${state.month}-${day}`,
        email: state.email,
        phone: state.phone
      };
      return data;
    }
  },
  mutations: {
    SET_STATE(state, [item, value]) {
      state[item] = value;
    }
  },
  actions: {},
  modules: {}
});
