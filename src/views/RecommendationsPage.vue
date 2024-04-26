<script>
import {getRecommendations} from "@/functions/recommendationRequests.js";
import {messageStore} from "@/stores/messagesStore.js";
import SongCard from "@/components/SongCard.vue";

export default {
  name: "RecommendationsPage",

  data() {
    return {
      recommendedSongs: [],
      sliderSongValue: 5,
    }
  },

  computed: {
    areSongsInArray() {
      return this.recommendedSongs.length !== 0;
    },

    changeButtonText() {
      return !this.areSongsInArray ? "Search" : "Refresh"
    }
  },

  components: {
    SongCard,
  },

  methods: {
    async handleRecommendedSongsCall () {
      try {
        const recommendationsResponse = await getRecommendations(localStorage.getItem("access_token"), "short_term", this.sliderSongValue)
        this.recommendedSongs = recommendationsResponse.tracks
        console.log(this.recommendedSongs)
      }catch (error){
        const messages = messageStore()
        messages.addMessage("danger", "Error while trying to find songs.")
        console.error(error)
      }
    }
  }
}
</script>

<template>
<div class="container text-center">
  <div class="row">
    <h1 class="col-12">Recommendations</h1>
    <h3 class="col-12 mt-3">Find songs recommendations based on your recent interactions on Spotify.</h3>
  </div>
  <div class="row">
    <p class="col-12 col-sm-6">Number of songs:</p>
    <input type="range" min="1" max="10" v-model="sliderSongValue" class="slider col-11 col-sm-5"
           id="songsRange"><span class="col-1">{{ sliderSongValue }}</span>
  </div>
  <div class="container" id="songContainer">
    <div class="row">
      <song-card v-for="song in recommendedSongs" :key="song.id" :song-received="song"></song-card>
    </div>
  </div>
  <div class="row d-flex justify-content-center">
    <button type="button" @click="handleRecommendedSongsCall" id="openButton"
            class="col-12 me-3">{{ changeButtonText }}
    </button>
  </div>
</div>
<div style="margin-bottom: 100px"></div>
</template>

<style scoped>
#openButton {
  height: 40px;
  width: 200px;
  background-color: #1ED760;
  border: solid 2px #000;
  border-radius: 20px;
  color: #000;
  font-weight: bold;
  padding-top: 2px;
  margin-top: 25px;
}
</style>