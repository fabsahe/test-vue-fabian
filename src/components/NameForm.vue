<template>
  <v-container class="mb-5">
    <v-row>
      <v-col cols="2">
        <AvatarForm></AvatarForm>
      </v-col>

      <v-col cols="10" class="px-0">
        <v-sheet color="grey lighten-4" class="px-3 pt-3" rounded>
          <div class="text-h6 mb-4">¿Cuál es tu nombre?</div>

          <v-form ref="nameForm" v-model="valid">
            <v-text-field
              v-model="name1"
              :rules="nameRules"
              label="Nombre"
              outlined
              required
              @input="$store.commit('SET_STATE', ['name1', name1])"
            ></v-text-field>

            <v-text-field
              v-model="name2"
              :rules="name2Rules"
              label="Segundo nombre"
              outlined
              @input="$store.commit('SET_STATE', ['name2', name2])"
            ></v-text-field>

            <v-text-field
              v-model="lastname1"
              :rules="nameRules"
              label="Apellido paterno"
              outlined
              required
              @input="$store.commit('SET_STATE', ['lastname1', lastname1])"
            ></v-text-field>

            <v-text-field
              v-model="lastname2"
              :rules="nameRules"
              label="Apellido materno"
              outlined
              required
              @input="$store.commit('SET_STATE', ['lastname2', lastname2])"
            ></v-text-field>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="11" class="px-0 pt-0">
        <v-sheet color="pink lighten-2" class="px-4 pt-3" height="50" rounded>
          {{ `${name1} ${name2} ${lastname1} ${lastname2}` }}
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AvatarForm from './AvatarForm';

export default {
  name: 'NameForm',

  components: {
    AvatarForm
  },

  data: () => ({
    valid: false,
    name1: '',
    name2: '',
    lastname1: '',
    lastname2: '',

    nameRules: [
      (v) => !!v || 'Este campo es necesario',
      (v) => {
        let limit = 20;
        return (
          (v && v.length <= limit) ||
          `El campo debe contener menos de ${limit} caracteres`
        );
      }
    ],

    name2Rules: [
      (v) => {
        let limit = 20;

        if (!v) {
          return true;
        }
        if (v && v.length <= limit) {
          return true;
        }
        return `El campo debe contener menos de ${limit} caracteres`;
      }
    ]
  }),

  methods: {
    validate() {
      this.$refs.nameForm.validate();

      return this.valid;
    },

    reset() {
      this.$refs.nameForm.reset();

      this.name1 = '';
      this.name2 = '';
      this.lastname1 = '';
      this.lastname2 = '';
    }
  }
};
</script>
