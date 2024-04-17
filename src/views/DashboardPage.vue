<script>
import {defineComponent} from 'vue';
import {userStore} from "@/stores/userStore";
import {mapState} from "pinia";

export default defineComponent({
  name: "DashboardPage",
  computed: {
    ...mapState(userStore, {
      user: "currentUser",
    }),
  },

  data() {
    return {
      showRecommendedSongs: false,
      recommendedSongsValue: 5,
      recommendedSongs: {},
      periodSelectValue: "medium_term",
    }
  },

  methods: {
    toggleRecommendedSongs(){
      this.showRecommendedSongs = !this.showRecommendedSongs;
    },

    handleRecommendedSongsCall(){

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
      <h4 class="col-12">Discover your top songs</h4>
      <button v-if="!showRecommendedSongs" type="button" @click="toggleRecommendedSongs" id="openButton">Try it!</button>
      <div v-if="showRecommendedSongs" class="row">
        <p class="col-12 col-sm-6">Number of songs:</p>
        <input type="range" min="1" max="10" v-model="recommendedSongsValue" class="slider col-11 col-sm-5" id="songsRange" ><span class="col-1">{{recommendedSongsValue}}</span>
        <label for="period" class="col-12 col-sm-6">Period of time:</label>

        <select name="period" id="period" class="col-12 col-sm-6" v-model="periodSelectValue">
          <option value="short_term">Short</option>
          <option value="medium_term">Medium</option>
          <option value="long_term">Long</option>
        </select>

        <button v-if="showRecommendedSongs" type="button" @click="toggleRecommendedSongs" id="closeButton" class="col-12">Close</button>
      </div>
    </div>
  </div>
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
