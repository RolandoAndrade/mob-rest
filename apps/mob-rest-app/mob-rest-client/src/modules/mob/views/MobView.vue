<template>
  <v-container>
    <v-card max-width="800" class="mx-auto pa-2 card-rounded" outlined>
      <v-form class="pa-4">
        <v-text-field prepend-icon="mdi-book" label="Título"></v-text-field>
        <v-row no-gutters>
          <v-text-field class="mr-2" prepend-icon="mdi-account" label="Nombre del autor"></v-text-field>
          <v-text-field class="ml-2" prepend-icon="mdi-account" label="Apellido del autor"></v-text-field>
        </v-row>
        <v-btn color="primary" rounded large block><v-icon class="mr-4">mdi-magnify</v-icon>BUSCAR LIBROS</v-btn>
        <v-row no-gutters justify="end" class="mt-4">
          <v-col class="pr-1">
            <v-btn @click="()=>{commitStatus = !commitStatus}" v-if="commitStatus" color="green" rounded large block dark><v-icon class="mr-4">mdi-check</v-icon>COMMIT</v-btn>
            <v-btn @click="()=>{commitStatus = !commitStatus}" v-else color="red" rounded large block dark><v-icon class="mr-4">mdi-close</v-icon>ABORT</v-btn>
          </v-col>
          <v-col class="px-1">
            <v-btn color="green" rounded large block dark><v-icon class="mr-4">mdi-cloud-upload-outline</v-icon>REPLICAR LIBROS</v-btn>
          </v-col>
          <v-col class="pl-1">
            <v-btn color="purple" rounded large block dark><v-icon class="mr-4">mdi-history</v-icon>RESTAURAR LIBROS</v-btn>
          </v-col>

        </v-row>
      </v-form>
    </v-card>
    <v-col v-if="books.length">
      <book-card v-for="(book, k) in books" :book="book" :key="k"></book-card>
    </v-col>
    <v-col v-else class="text-center">
      <div class="overline font-weight-light mx-auto mt-12">NO HAY LIBROS DISPONIBLES</div>
    </v-col>
    <v-btn fab fixed bottom right color="primary" large><v-icon>mdi-plus</v-icon></v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import BookCard from "@/modules/mob/components/BookCard.vue";
import {Book} from "@/modules/mob/domain/book";

@Component({
  name: 'mob-view',
  components: {BookCard},
})
export default class MobView extends Vue {
  books: Book[]=[

  ]

  commitStatus: boolean = true;
}
</script>

<style scoped>
.card-rounded{
  border-radius: 35px !important;
}
</style>
