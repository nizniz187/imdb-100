<template>
  <v-dialog v-model="dialog" width="90vw">
    <v-card>
      <v-card-title>{{ movieDetails.title }} - {{ movieDetails.tagline }}</v-card-title>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-avatar tile size="250" color="grey"></v-list-item-avatar>
        <v-list-item-content>
          <div>
            <span class="font-weight-bold">Genres: </span>
            <span v-for="(genre, index) in movieDetails.genres" v-bind:key="genre.id">
              {{ genre.name }} 
              <span v-if="index < movieDetails.genres.length - 1">/</span>
            </span>
          </div>
          <div>
            <span class="font-weight-bold">Popularity: </span>
            <span>{{ movieDetails.popularity }}</span>
          </div>
          <div>
            <span class="font-weight-bold">Production Companies: </span>
            <span v-for="(company, index) in getMovieDetailsValue('production_companies')" v-bind:key="company.id">
              {{ company.name }}
              <span v-if="index < getMovieDetailsValue('production_companies').length - 1">/</span>
            </span>
          </div>
          <div>
            <span class="font-weight-bold">Status: </span>
            <span>{{ movieDetails.status }}</span>
          </div>
          <div>
            <span class="font-weight-bold">Release Date: </span>
            <span>{{ getMovieDetailsValue('release_date') }}</span>
          </div>
          <div>
            <span class="font-weight-bold">Revenue: </span>
            <span>{{ movieDetails.revenue }}</span>
          </div>
          <div>
            <span class="font-weight-bold">Runtime: </span>
            <span>{{ movieDetails.runtime }}</span>
          </div>
          <div>
            <span class="font-weight-bold">Spoken Languages: </span>
            <span v-for="(language, index) in getMovieDetailsValue('spoken_languages')" v-bind:key="index">
              {{ language.name }}
              <span v-if="index < getMovieDetailsValue('spoken_languages').length - 1">/</span>
            </span>
          </div>
          <div>
            <span class="font-weight-bold">Vote Average / Count: </span>
            <span>{{ getMovieDetailsValue('vote_average') }} / {{ getMovieDetailsValue('vote_count') }}</span>
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-card-text>{{ movieDetails.overview }}</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data () {
    return {
      dialog: true,
      notifications: false,
      sound: true,
      widgets: false
    }
  },
  computed: {
    ...mapState([
      'movieDetails'
    ])
  },
  methods: {
    getMovieDetailsValue(key) {
      return this.movieDetails[key];
    }
  }
}
</script>