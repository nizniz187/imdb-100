<template>
  <v-dialog v-model="dialog" width="90vw" persistent @click:outside="hide" class="movie-details">
    <v-card>
      <v-card-title>
        <div>{{ movieDetails.title }}</div>
      </v-card-title>
      <v-divider></v-divider>
      <v-list-item>
        <v-row class="details-row">
          <v-col class="col-12 col-sm-4">
            <v-img class="details-img grey lighten-2 ma-5" contain v-bind:src="getImgSrc()">          
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center" >
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>  
            </v-img>
          </v-col>
          <v-col class="col-12 col-sm-8" align-self="center">
            <v-list-item-content>
              <div class="details-item">
                <div class="details-item-title">Genres: </div>
                <div>
                  <span v-for="(genre, index) in movieDetails.genres" v-bind:key="genre.id">
                    {{ genre.name }} 
                    <span v-if="index < movieDetails.genres.length - 1">/</span>
                  </span>
                </div>
              </div>
              <div class="details-item">
                <div class="details-item-title">Popularity: </div>
                <div>{{ movieDetails.popularity }}</div>
              </div>
              <div class="details-item">
                <div class="details-item-title">Production Companies: </div>
                <div>
                  <span v-for="(company, index) in getDetailsValue('production_companies')" v-bind:key="company.id">
                    {{ company.name }}
                    <span v-if="index < getDetailsValue('production_companies').length - 1">/</span>
                  </span>
                </div>
              </div>
              <div class="details-item">
                <div class="details-item-title">Status: </div>
                <div>{{ movieDetails.status }}</div>
              </div>
              <div class="details-item">
                <div class="details-item-title">Release Date: </div>
                <div>{{ getDetailsValue('release_date') }}</div>
              </div>
              <div class="details-item">
                <div class="details-item-title">Spoken Languages: </div>
                <div>
                  <span v-for="(language, index) in getDetailsValue('spoken_languages')" v-bind:key="index">
                    {{ language.name }}
                    <span v-if="index < getDetailsValue('spoken_languages').length - 1">/</span>
                  </span>
                </div>
              </div>
              <div class="details-item">
                <div class="details-item-title">Vote Average / Count: </div>
                <div>{{ getDetailsValue('vote_average') }} / {{ getDetailsValue('vote_count') }}</div>
              </div>
            </v-list-item-content>
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider></v-divider>
      <v-card-text class="mt-5">
        <h3 v-if="movieDetails.tagline !== null">{{ movieDetails.tagline }}</h3>
        {{ movieDetails.overview }}
      </v-card-text>
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

<style scoped>
  .details-row { width: 100%; }
  .details-img {
    max-height: 250px;
  }
  .details-item {
    margin-bottom: 5px;
    width: 100%;
  }
  .details-item-title {
    font-weight: bold;
  }
</style>