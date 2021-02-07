<template>
  <v-app>
    <mob-view></mob-view>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import MobView from "@/modules/mob/views/MobView.vue";

export default Vue.extend({
  name: 'App',

  components: {
    MobView,
  },

  data: () => ({
    //
  }),
});
</script>

<style>
#app{
  background: #f5f5f5 !important;
}
</style>
