let MovieItem = {
  props: ['rank', 'movie'],
  template: `
    <div style="margin-bottom: 10px">
      <div style="font-weight:bold">{{ rank }}. {{ movie.title }} - {{ movie.popularity }}</div>
      <div>{{ movie.overview }}</div>
    </div>
  `
};

export default {
  components: { MovieItem },
  props: ['movies'],
  template: `
    <div>
      <movie-item v-for="(movie, index) in movies" 
        v-bind:key="movie.id" v-bind:movie="movie" v-bind:rank="index + 1">
      </movie-item>
    </div>
  `
};