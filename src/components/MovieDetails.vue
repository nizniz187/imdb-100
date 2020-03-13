<template>
  <v-dialog v-model="dialog" width="90vw" persistent @click:outside="hide">
    <v-card>
      <v-card-title>{{ movieDetails.title }} - {{ movieDetails.tagline }}</v-card-title>
      <v-divider></v-divider>
      <v-list-item>
        <v-img class="grey lighten-2 ma-5" max-width="250px" max-height="250px" contain
          v-bind:src="getImgSrc()"></v-img>
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
            <span v-for="(company, index) in getDetailsValue('production_companies')" v-bind:key="company.id">
              {{ company.name }}
              <span v-if="index < getDetailsValue('production_companies').length - 1">/</span>
            </span>
          </div>
          <div>
            <span class="font-weight-bold">Status: </span>
            <span>{{ movieDetails.status }}</span>
          </div>
          <div>
            <span class="font-weight-bold">Release Date: </span>
            <span>{{ getDetailsValue('release_date') }}</span>
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
            <span v-for="(language, index) in getDetailsValue('spoken_languages')" v-bind:key="index">
              {{ language.name }}
              <span v-if="index < getDetailsValue('spoken_languages').length - 1">/</span>
            </span>
          </div>
          <div>
            <span class="font-weight-bold">Vote Average / Count: </span>
            <span>{{ getDetailsValue('vote_average') }} / {{ getDetailsValue('vote_count') }}</span>
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-card-text>{{ movieDetails.overview }}</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data () {
    return {
      notifications: false,
      sound: true,
      widgets: false
    }
  },
  computed: {
    ...mapState([
      'movieDetails'
    ]),
    ...mapState({
      dialog: 'isDetailsPanelShowed'
    })
  },
  methods: {
    getDetailsValue(key) {
      return this.movieDetails[key];
    },
    getImgSrc() {
      let src = this.getDetailsValue('poster_path');
      return src ? `https://image.tmdb.org/t/p/w500${src}` : '';
    },
    ...mapMutations({
      hide: 'hideDetailsPanel'
    })
  }
}
</script>