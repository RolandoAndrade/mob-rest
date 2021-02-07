<template>
  <v-container>
    <v-card max-width="800" class="mx-auto pa-2 card-rounded" outlined>
      <v-form class="pa-4">
        <v-text-field prepend-icon="mdi-book" label="Título"></v-text-field>
        <v-row no-gutters>
          <v-text-field class="mr-2" prepend-icon="mdi-account" label="Nombre del autor"></v-text-field>
          <v-text-field class="ml-2" prepend-icon="mdi-account" label="Apellido del autor"></v-text-field>
        </v-row>
        <v-row no-gutters justify="end">
          <v-btn color="primary" rounded large block><v-icon class="mr-4">mdi-magnify</v-icon>BUSCAR LIBROS</v-btn>
        </v-row>

      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'mob-view',
})
export default class MobView extends Vue {

}
</script>

<style scoped>
.card-rounded{
  border-radius: 35px !important;
}
</style>
