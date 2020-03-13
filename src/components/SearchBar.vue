<template>
  <div class="search-bar">
    <input type="text" placeholder="Type movie name for searching..." v-model="keyword" />
    <button type="button" v-on:click="showSearchResults({ keyword })">Search</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      keyword: ''
    };
  },
  methods: {
    ...mapActions([
      'showSearchResults'
    ])
  }
}
</script>

<style scoped>
  .search-bar {
    background-color: cornflowerblue;
    position: fixed; top: 0; left: 0;
    padding: 10px;
    text-align: center;
    width: 100%;
  }
</style>
