<template>
  <v-dialog v-model="opened" max-width="400">
    <v-card>
      <div class="title-card">CREAR LIBRO</div>
      <v-divider></v-divider>
      <v-form ref="form">
        <v-col>
          <v-text-field prepend-icon="mdi-book" label="Título" v-model="book.title"></v-text-field>
          <v-text-field prepend-icon="mdi-account" label="Nombre del autor" v-model="book.author.name"></v-text-field>
          <v-text-field prepend-icon="mdi-account" label="Apellido del autor" v-model="book.author.surname"></v-text-field>
          <v-row no-gutters>
            <v-col>
              <v-btn block color="primary" class="mr-1" @click="saveBook">GUARDAR</v-btn>
            </v-col>
            <v-col>
              <v-btn block outlined color="primary" class="ml-1" @click="()=>{opened=false}">CANCELAR</v-btn>
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
import {Emit, Prop, PropSync} from "vue-property-decorator";
import {Book} from "@/modules/mob/domain/book";
import mobRepository from "@/modules/mob/repository/mob-repository";
import {eventBus} from "@/main";
import {FindOptions} from "@/modules/mob/domain/find-options";

@Component({
  name: 'book-form',
})
export default class BookForm extends Vue {
  $refs!: {
    form: any
  }

  @Prop({default: false, type: Boolean})
  isUpdating!: boolean;

  @PropSync("bookData", {default: ()=>({
      author: {}
    })})
  private editedBook!: Book;
  private book: Partial<Book> = {
    author: {}
  } as Book;
  private lastBook!: FindOptions;

  private opened = false;

  async saveBook(){
    try {
      if(!this.isUpdating){
        await mobRepository.createBook({
          author: {
            name: this.book.author!.name || "",
            surname: this.book.author!.surname || ""
          },
          title: this.book.title || ""
        });
        eventBus.$emit("success", "Se ha creado un libro");
      }
      else {
        await mobRepository.updateBook(this.lastBook, this.book as Book);
        eventBus.$emit("success", "Se ha actualizado un libro");
      }
      this.$refs.form.reset();
      this.opened = false;

    }catch (e){
      eventBus.$emit("error", "Error registrando el libro");
    }
  }

  public openModal(){
    this.book = {
      title: this.editedBook.title,
      author: {
        name: this.editedBook.author.name,
        surname: this.editedBook.author.surname
      }
    };
    this.lastBook = {
      name: this.book.author!.name || "",
      surname: this.book.author!.surname || "",
      title: this.book.title || ""
    }
    this.opened = true;
  }
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
