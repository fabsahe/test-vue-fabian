<template>
  <v-app>
    <v-app-bar app color="pink lighten-2" prominent dark>
      <div class="d-flex info-bar">
        <v-card color="pink lighten-2" elevation="0">
          <v-card-title class="text-h4 mb-6"> Formulario </v-card-title>

          <v-card-subtitle class="white--text pb-1"
            ><v-icon>mdi-clock-outline</v-icon> En menos de 5 min
          </v-card-subtitle>
        </v-card>
      </div>

      <v-progress-linear
        v-model="$store.getters.progress"
        :indeterminate="loading"
        active
        rounded
        height="6"
        absolute
        bottom
        color="pink accent-4"
      ></v-progress-linear>

      <v-spacer></v-spacer>

      <div class="mt-6 mx-4">
        <v-list-item>
          <v-icon large class="mx-auto">mdi-clipboard-edit-outline</v-icon>
        </v-list-item>
        <v-list-item>
          <v-btn small plain color="white" @click="showSession = true">
            Ver sesión
          </v-btn>
        </v-list-item>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col lg="3" md="2" sm="1"></v-col>
          <v-col cols="12" lg="6" md="8" sm="10" xs="12">
            <NameForm ref="namef"></NameForm>

            <BirthdayForm ref="birthdayf"></BirthdayForm>

            <ContactForm ref="contactf"></ContactForm>

            <v-container>
              <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="10" class="px-0">
                  <v-sheet color="grey lighten-4" class="px-3 py-3" rounded>
                    Si tus datos son correctos, por favor continuemos
                  </v-sheet>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-btn
                    :loading="loading"
                    :disabled="!valid || loading"
                    color="pink darken-2"
                    class="text-none"
                    :dark="!loading"
                    block
                    @click="validate"
                  >
                    Iniciar
                  </v-btn>
                </v-col>
              </v-row>

              <v-row class="mb-5">
                <v-col cols="12" class="px-0">
                  <v-sheet
                    color="pink lighten-2"
                    class="px-4 pt-3"
                    height="130"
                    rounded
                  >
                    <div v-show="showResult">
                      <div>{{ result.line1 }}</div>
                      <div>{{ result.line2 }}</div>
                      <div>{{ result.line3 }}</div>
                      <div>{{ result.line4 }}</div>
                    </div>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>

      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ snackbarText }}

        <template #action="{ attrs }">
          <v-btn color="orange" text v-bind="attrs" @click="snackbar = false">
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>

      <v-dialog v-model="showSession" width="500">
        <v-card>
          <v-card-title>
            {{ $session.exists() ? 'Sesión' : 'No hay sesión' }}
          </v-card-title>

          <v-card-text>
            {{ $session.exists() ? $session.getAll() : '' }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="showSession = false">
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>

    <v-footer padless>
      <v-card flat tile width="100%" class="white text-center">
        <v-divider></v-divider>

        <v-card-text class="body-2 black--text">
          Hecho por Fabián Salinas Hernández
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
/* eslint-disable no-unused-vars */
import axios from 'axios';
import NameForm from './components/NameForm';
import BirthdayForm from './components/BirthdayForm';
import ContactForm from './components/ContactForm.vue';

export default {
  name: 'App',

  components: {
    NameForm,
    BirthdayForm,
    ContactForm
  },

  data: () => ({
    loading: false,
    valid: true,
    result: '',
    showResult: false,
    showSession: false,

    snackbar: false,
    snackbarText: '',
    timeout: 4000
  }),

  methods: {
    setSessionData() {
      this.$session.start();

      this.$session.set('name1', this.$store.state.name1);
      this.$session.set('name2', this.$store.state.name2);
      this.$session.set('lastname1', this.$store.state.lastname1);
      this.$session.set('lastname2', this.$store.state.lastname2);
      this.$session.set('day', this.$store.state.day);
      this.$session.set('month', this.$store.state.month);
      this.$session.set('monthName', this.$store.state.monthName);
      this.$session.set('year', this.$store.state.year);
      this.$session.set('email', this.$store.state.email);
      this.$session.set('phone', this.$store.state.phone);
    },

    success() {
      this.setSessionData();
      this.result = this.$store.getters.result;
      this.showResult = true;

      this.snackbar = true;
      this.snackbarText = 'Agregado correctamente';
    },

    showError(err) {
      this.snackbar = true;
      this.snackbarText = `Ha ocurrido un error: ${err.code}`;
    },

    resetForms() {
      this.$refs.namef.reset();
      this.$refs.birthdayf.reset();
      this.$refs.contactf.reset();
    },

    validate() {
      this.loading = true;

      const nameValid = this.$refs.namef.validate();
      const birthdayValid = this.$refs.birthdayf.validate();
      const contactValid = this.$refs.contactf.validate();

      if (nameValid && birthdayValid && contactValid) {
        const path = 'http://localhost:4000/api/user/new';
        const user = this.$store.getters.dataToSend;

        axios
          .post(path, user)
          .then((response) => this.success())
          .catch((error) => this.showError(error))
          .finally(() => {
            this.resetForms();
            this.loading = false;
          });
      } else {
        this.loading = false;
        this.snackbar = true;
        this.snackbarText = 'Revisa los datos';
      }
    }
  }
};
</script>

<style scoped>
.info-bar {
  margin-left: 2vw;
}
</style>
