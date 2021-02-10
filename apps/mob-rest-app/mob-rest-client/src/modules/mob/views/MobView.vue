<template>
  <v-container>
    <v-card max-width="800" class="mx-auto pa-2 card-rounded" outlined>
      <v-form class="pa-4">
        <v-text-field prepend-icon="mdi-book" label="Título" v-model="findOptions.title"></v-text-field>
        <v-row no-gutters>
          <v-text-field class="mr-2" prepend-icon="mdi-account" label="Nombre del autor" v-model="findOptions.name"></v-text-field>
          <v-text-field class="ml-2" prepend-icon="mdi-account" label="Apellido del autor" v-model="findOptions.surname"></v-text-field>
        </v-row>
        <v-btn color="primary" rounded large block @click="search"><v-icon class="mr-4">mdi-magnify</v-icon>BUSCAR LIBROS</v-btn>
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
      <book-card v-for="(book, k) in books" :book="book" :key="k" @deleteBook="deleteObject"></book-card>
    </v-col>
    <v-col v-else class="text-center">
      <div class="overline font-weight-light mx-auto mt-12">NO HAY LIBROS DISPONIBLES</div>
    </v-col>
    <book-form ref="modal"></book-form>
    <v-btn fab fixed bottom right color="primary" large @click="()=>$refs.modal.openModal()"><v-icon>mdi-plus</v-icon></v-btn>
    <v-snackbar :color="color" v-model="show" top right>{{message}}</v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import BookCard from "@/modules/mob/components/BookCard.vue";
import {Book} from "@/modules/mob/domain/book";
import mobRepository from "@/modules/mob/repository/mob-repository";
import {FindOptions} from "@/modules/mob/domain/find-options";
import BookForm from "@/modules/mob/components/BookForm.vue";
import {eventBus} from "@/main";

@Component({
  name: 'mob-view',
  components: {BookForm, BookCard},
})
export default class MobView extends Vue {

  $refs!: {
    modal: any;
  }

  private findOptions: Partial<FindOptions> = {};
  private books: Book[]=[];

  private color: string = "";
  private message: string ="";
  private show: boolean = false;

  private commitStatus: boolean = true;

  mounted(){
    this.search();
    eventBus.$on("success", (msg: string)=>{
      this.show = true;
      this.message = msg;
      this.color = "primary";
      this.search();
    });

    eventBus.$on("error", (error: string)=>{
      this.show = true;
      this.message = error;
      this.color = "error";
    });
  }

  private async search(){
    try{
      const books = await mobRepository.listBooks(this.findOptions);
      this.books = [];
      this.$nextTick(()=>{
          this.books = books;
      })
    }catch(e){
      eventBus.$emit("error", "Error buscando libros")
    }
  }

  private async deleteObject(book: Book){
    try{
      await mobRepository.deleteBook({
        title: book.title,
        name: book.author.name,
        surname: book.author.surname
      });
      await this.search();
      eventBus.$emit("success", "Se ha eliminando libro")
    }catch(e){
      eventBus.$emit("error", "Error eliminando libro")
    }
  }
}
</script>

<style scoped>
.card-rounded{
  border-radius: 35px !important;
}
</style>
