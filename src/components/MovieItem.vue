<template>
  <v-card outlined v-on:click="showDetails({ movieId: movie.id })" class="mb-2">
    <v-list-item three-line class="pa-0">
      <v-img class="grey lighten-2 ma-3 ma-sm-5" max-width="100px" max-height="100px" contain
          v-bind:src="getImgSrc()">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center" >
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-list-item-content>
        <div class="overline mb-2 mb-sm-4">{{ rank }} / {{ movie.popularity }}</div>
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
    getImgSrc() {
      let src = this.movie['poster_path'];
      return src ? `https://image.tmdb.org/t/p/w500${src}` : '';
    },
    ...mapActions([
      'showDetails'
    ]),
  }
}
</script>