<template>
  <v-container class="mb-5">
    <v-row>
      <v-col cols="2">
        <AvatarForm></AvatarForm>
      </v-col>

      <v-col cols="10" class="px-0">
        <v-sheet color="grey lighten-4" class="px-3 pt-3" rounded>
          <div class="text-h6 mb-4">Datos de contacto</div>

          <v-form ref="contactForm" v-model="valid">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              outlined
              required
              @input="$store.commit('SET_STATE', ['email', email])"
            ></v-text-field>

            <v-text-field
              v-model="phone"
              :rules="phoneRules"
              label="Teléfono"
              outlined
              required
              @input="$store.commit('SET_STATE', ['phone', phone])"
            ></v-text-field>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="11" class="px-0 pt-0">
        <v-sheet color="pink lighten-2" class="px-4" rounded>
          <div class="pt-3">{{ `Correo electrónico: ${email} ` }}</div>
          <div class="pb-3">{{ `Teléfono celular: ${phone} ` }}</div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AvatarForm from './AvatarForm';

export default {
  name: 'ContactForm',

  components: {
    AvatarForm
  },

  data: () => ({
    valid: false,
    email: '',
    phone: '',

    emailRules: [
      (v) => !!v || 'Este campo es necesario',
      (v) => /.+@.+\..+/.test(v) || 'El correo no es válido'
    ],

    phoneRules: [
      (v) => !!v || 'Este campo es necesario',
      (v) => /^[+]?[0-9\s-]+$/g.test(v) || 'El numero no es válido'
    ]
  }),

  methods: {
    validate() {
      this.$refs.contactForm.validate();

      return this.valid;
    },

    reset() {
      this.$refs.contactForm.reset();

      this.email = '';
      this.phone = '';
    }
  }
};
</script>
