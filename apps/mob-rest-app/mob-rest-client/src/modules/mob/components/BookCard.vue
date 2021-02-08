<template>
  <v-card max-width="800" class="mx-auto pa-2 card-rounded my-2" outlined>
    <v-list-item>
      <v-list-item-avatar>
        <v-icon large>mdi-book</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-row no-gutters>
          <v-col class="text-center">
            <div class="overline">Título</div>
            <div class="caption">{{book.title}}</div>
          </v-col>
          <v-col class="text-center">
            <div class="overline">Autor</div>
            <div class="caption">{{book.author.name}} {{book.author.surname}}</div>
          </v-col>
          <v-col class="text-center">
            <div class="overline">Fecha</div>
            <div class="caption">{{ book['creation-date']}}</div>
          </v-col>
        </v-row>
      </v-list-item-content>
      <v-list-item-action>
        <v-row no-gutters>
          <v-btn icon color="secondary" outlined @click="deleteBook" class="mr-2"><v-icon>mdi-pencil</v-icon></v-btn>
          <v-btn icon color="red" outlined @click="deleteBook"><v-icon>mdi-delete</v-icon></v-btn>
        </v-row>
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Emit, Prop} from 'vue-property-decorator';
import {Book} from "@/modules/mob/domain/book";

@Component({
  name: 'book-card',
})
export default class BookCard extends Vue {
  @Prop({required: true})
  book!: Book;

  @Emit("deleteBook")
  deleteBook(){
    return this.book;
  }
}
</script>

<style scoped>
.card-rounded{
  border-radius: 35px !important;
}
</style>
