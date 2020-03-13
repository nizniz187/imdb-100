<template>
  <v-card outlined v-on:click="showDetails({ movieId: movie.id })" class="mb-2">
    <v-list-item three-line>
      <v-list-item-avatar tile size="100" color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <div class="overline mb-4">{{ rank }} / {{ movie.popularity }}</div>
        <v-list-item-title class="headline mb-1">{{ movie.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ movie.overview }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['rank', 'movie'],
  methods: {
    ...mapActions([
      'showDetails'
    ]),
  }
}
</script>