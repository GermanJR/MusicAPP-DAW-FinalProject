<script>
export default {
  name: "SongCard",
  props: {
    songReceived: {
      type: Object,
      required: true,
    }
  },

  methods: {
    getArtists() {
      let totalArtists = "";
      this.songReceived.artists.forEach((artist, index) => {
        totalArtists += artist;
        if (index !== this.songReceived.artists.length - 1) {
          totalArtists += ",";
        }
      });
      return totalArtists;
    }
  }
}
</script>

<template>
<div class="col-12">
  <h4>{{songReceived.name}}</h4>
  <h5>{{getArtists()}}</h5>
</div>
</template>

<style scoped>
div {
  background-color: #191414;
}
</style>