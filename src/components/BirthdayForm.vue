<template>
  <v-container class="mb-5">
    <v-row>
      <v-col cols="2">
        <AvatarForm></AvatarForm>
      </v-col>

      <v-col cols="10" class="px-0">
        <v-sheet color="grey lighten-4" class="px-3 pt-3" rounded>
          <div class="text-h6 mb-4">¿Cuál es tu fecha de nacimiento?</div>

          <v-form ref="birthdayForm" v-model="valid">
            <v-text-field
              v-model="day"
              :rules="dayRules"
              label="Día"
              outlined
              required
              @input="$store.commit('SET_STATE', ['day', day])"
            ></v-text-field>

            <v-select
              v-model="monthName"
              :items="months"
              :rules="monthRules"
              label="Mes"
              outlined
              required
              @input="setMonth"
            ></v-select>

            <v-text-field
              v-model="year"
              :rules="yearRules"
              label="Año"
              outlined
              required
              @input="$store.commit('SET_STATE', ['year', year])"
            ></v-text-field>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="11" class="px-0 pt-0">
        <v-sheet color="pink lighten-2" class="px-4 pt-3" height="50" rounded>
          {{ `${day} ${monthName} ${year}` }}
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AvatarForm from './AvatarForm';

const MONTHS_NUMBER = {
  Enero: '01',
  Febrero: '02',
  Marzo: '03',
  Abril: '04',
  Mayo: '05',
  Junio: '06',
  Julio: '07',
  Agosto: '08',
  Septiembre: '09',
  Octubre: '10',
  Noviembre: '11',
  Diciembre: '12'
};

export default {
  name: 'BirthdayForm',

  components: {
    AvatarForm
  },

  data: () => ({
    valid: false,
    day: '',
    monthName: '',
    year: '',

    months: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ],

    dayRules: [
      (v) => !!v || 'Este campo es necesario',
      (v) => (parseInt(v) > 0 && parseInt(v) <= 31) || 'El día no es válido'
    ],

    monthRules: [(v) => !!v || 'Este campo es necesario'],

    yearRules: [
      (v) => !!v || 'Este campo es necesario',
      (v) =>
        (parseInt(v) > 0 &&
          parseInt(v) <= parseInt(new Date().getFullYear())) ||
        'El año no es válido'
    ]
  }),

  methods: {
    setMonth() {
      this.$store.commit('SET_STATE', ['month', MONTHS_NUMBER[this.monthName]]);
      this.$store.commit('SET_STATE', ['monthName', this.monthName]);
    },

    validate() {
      this.$refs.birthdayForm.validate();

      return this.valid;
    },

    reset() {
      this.$refs.birthdayForm.reset();

      this.day = '';
      this.monthName = '';
      this.year = '';
    }
  }
};
</script>
