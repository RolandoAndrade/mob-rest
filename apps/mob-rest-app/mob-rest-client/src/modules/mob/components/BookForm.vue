<template>
  <v-dialog v-model="opened" max-width="400">
    <v-card>
      <div class="title-card">CREAR LIBRO</div>
      <v-divider></v-divider>
      <v-form>
        <v-col>
          <v-text-field prepend-icon="mdi-book" label="Título"></v-text-field>
          <v-text-field prepend-icon="mdi-account" label="Nombre del autor"></v-text-field>
          <v-text-field prepend-icon="mdi-account" label="Apellido del autor"></v-text-field>
          <v-row no-gutters>
            <v-col>
              <v-btn block color="primary" class="mr-1">GUARDAR</v-btn>
            </v-col>
            <v-col>
              <v-btn block outlined color="primary" class="ml-1">CANCELAR</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'book-form',
})
export default class BookForm extends Vue {
  opened = true
}
</script>

<style scoped>
.title-card{
  font-size: 20px;
  font-weight: 300;
  color: #424242;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  padding: 16px;
}
</style>
