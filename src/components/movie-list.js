let MovieItem = {
    props: ['movie'],
    template: `<div>{{ movie.rank }}. {{ movie.title }} - {{ movie.rating }}</div>`
};

export default {
    components: { MovieItem },
    props: ['movies'],
    template: `
      <div>
        <movie-item v-for="movie in movies" v-bind:key="movie.id" v-bind:movie="movie"></movie-item>
      </div>
    `
};