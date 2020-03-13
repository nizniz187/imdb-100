<template>
  <v-text-field 
    placeholder="Movie Name" v-model="keyword" hide-details
    append-outer-icon="mdi-magnify" @click:append-outer="showSearchResults({ keyword })">
  </v-text-field>
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
