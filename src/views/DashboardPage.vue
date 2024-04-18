<script>
import {defineComponent} from 'vue';
import {userStore} from "@/stores/userStore";
import {mapState} from "pinia";
import {getUserTopItems} from "@/functions/mostUsedRequests.js";
import SongCard from "@/components/SongCard.vue";

export default defineComponent({
  name: "DashboardPage",
  computed: {
    ...mapState(userStore, {
      user: "currentUser",
    }),
  },

  data() {
    return {
      showTopSongs: false,
      sliderItemValue: 5,
      topSongs: {},
      periodSelectValue: "medium_term",
    }
  },

  components: {
    SongCard,
  },

  methods: {
    toggleRecommendedSongs(){
      this.showTopSongs = !this.showTopSongs;
    },

    async handleRecommendedItemsCall(type){
      const topSongsResponse = await getUserTopItems(localStorage.getItem("access_token"), type, this.periodSelectValue, this.sliderItemValue)
      this.topSongs = topSongsResponse.items
    }
  }
});
</script>

<template>
  <div class="container">
    <div class="row">
      <h1 class="col-12">DashBoard</h1>
      <h3 class="col-12">Welcome again <b>{{ user?.display_name }}</b></h3>
    </div>
    <div class="row">
      <h3 class="col-12">Here are some interesting features for you:</h3>
      <h4 class="col-12">Discover your top songs and artists.</h4>
      <button v-if="!showTopSongs" type="button" @click="toggleRecommendedSongs" id="openButton">Try it!</button>
      <div v-if="showTopSongs" class="row">
        <p class="col-12 col-sm-6">Number of items:</p>
        <input type="range" min="1" max="10" v-model="sliderItemValue" class="slider col-11 col-sm-5" id="songsRange" ><span class="col-1">{{ sliderItemValue }}</span>

        <label for="period" class="col-12 col-sm-6">Period of time:</label>
        <select name="period" id="period" class="col-12 col-sm-6 mb-4" v-model="periodSelectValue">
          <option value="short_term">Short</option>
          <option value="medium_term">Medium</option>
          <option value="long_term">Long</option>
        </select>

        <div id="songContainer" class="container">
          <div class="row">
            <song-card v-for="song in topSongs" :key="song.id" :song-received="song"></song-card>
          </div>
        </div>

        <button v-if="showTopSongs" type="button" @click="handleRecommendedItemsCall('tracks')" id="openButton" class="col-12 me-3">Search</button>
        <button v-if="showTopSongs" type="button" @click="toggleRecommendedSongs" id="closeButton" class="col-12">Close</button>
      </div>
    </div>
  </div>
  <div style="margin-bottom: 100px"></div>
</template>

<style scoped>
b {
  color: #35c500;
}

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

#closeButton {
  height: 40px;
  width: 200px;
  background-color: #ff4f3f;
  border: solid 2px #000;
  border-radius: 20px;
  color: #000;
  font-weight: bold;
  padding-top: 2px;
  margin-top: 25px;
}
</style>
