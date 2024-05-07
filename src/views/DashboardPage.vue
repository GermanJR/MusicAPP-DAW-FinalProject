<script>
import {defineComponent} from 'vue';
import {userStore} from "@/stores/userStore";
import {mapState} from "pinia";
import {getUserTopItems} from "@/functions/mostUsedRequests.js";
import SongCard from "@/components/SongCard.vue";
import ArtistCard from "@/components/ArtistCard.vue";
import {messageStore} from "@/stores/messagesStore.js";
import {handleError} from "@/utils/error_handler.js";

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
      showTopArtists: false,
      sliderItemValue: 5,
      sliderItemValueArtists: 5,
      topSongs: {},
      topArtists: {},
      periodSelectValue: "medium_term",
      periodSelectValueArtists: "medium_term",
    }
  },

  components: {
    SongCard,
    ArtistCard,
  },

  methods: {
    toggleRecommendedSongs() {
      this.showTopSongs = !this.showTopSongs;
    },

    toggleRecommendedArtists() {
      this.showTopArtists = !this.showTopArtists;
    },

    async handleRecommendedItemsCall(type) {
      try {
        const token = localStorage.getItem("access_token")
        if (!token) {
          throw new Error("Tryed to make a request, but token is not defined.")
        }

        if (type === "tracks") {
          const topSongsResponse = await getUserTopItems(token, type, this.periodSelectValue, this.sliderItemValue)
          this.topSongs = topSongsResponse.items
        } else if (type === "artists") {
          const topArtistsResponse = await getUserTopItems(token, type, this.periodSelectValueArtists, this.sliderItemValueArtists)
          this.topArtists = topArtistsResponse.items
        } else {
          const messages = messageStore()
          messages.addMessage("danger", "Error! Type not supported.")
        }
      } catch (error) {
        console.error(error)
        handleError("token_expired")
        this.$router.push("/")
      }
    }
  }
});
</script>

<template>
  <div class="container text-center d-flex flex-column align-items-center">
    <div class="row">
      <h1 class="col-12">DashBoard</h1>
      <h3 class="col-12">Welcome again <b>{{ user?.display_name }}</b></h3>
    </div>
    <div class="row">
      <h3 class="col-12">Here are some interesting features for you:</h3>
      <h4 class="col-12 mt-5">Discover your top listened songs.</h4>
      <button v-if="!showTopSongs" type="button" @click="toggleRecommendedSongs" id="openButton">Try it!</button>
      <div v-if="showTopSongs" class="row">
        <p class="col-12 col-sm-6">Number of songs:</p>
        <input type="range" min="1" max="10" v-model="sliderItemValue" class="slider col-11 col-sm-5"
               id="songsRange"><span class="col-1">{{ sliderItemValue }}</span>

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

        <button v-if="showTopSongs" type="button" @click="handleRecommendedItemsCall('tracks')" id="openButton"
                class="col-12 me-3">Search
        </button>
        <button v-if="showTopSongs" type="button" @click="toggleRecommendedSongs" id="closeButton" class="col-12">
          Close
        </button>
      </div>

      <h4 class="col-12 mt-5">Discover your top artists.</h4>
      <button v-if="!showTopArtists" type="button" @click="toggleRecommendedArtists" id="openButton">Try it!</button>
      <div v-if="showTopArtists" class="row">
        <p class="col-12 col-sm-6">Number of artists:</p>
        <input type="range" min="1" max="10" v-model="sliderItemValueArtists" class="slider col-11 col-sm-5"
               id="songsRange"><span class="col-1">{{ sliderItemValueArtists }}</span>

        <label for="period" class="col-12 col-sm-6">Period of time:</label>
        <select name="period" id="period" class="col-12 col-sm-6 mb-4" v-model="periodSelectValueArtists">
          <option value="short_term">Short</option>
          <option value="medium_term">Medium</option>
          <option value="long_term">Long</option>
        </select>

        <div id="songContainer" class="container">
          <div class="row">
            <artist-card v-for="artist in topArtists" :key="artist.id" :artist-recieved="artist"></artist-card>
          </div>
        </div>

        <button v-if="showTopArtists" type="button" @click="handleRecommendedItemsCall('artists')" id="openButton"
                class="col-12 me-3">Search
        </button>
        <button v-if="showTopArtists" type="button" @click="toggleRecommendedArtists" id="closeButton" class="col-12">
          Close
        </button>
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

.row{
  justify-content: center;
}

#period {
  background-color: #181818;
  max-height: 40px;
  height: 40px;
  color: #f2f2f2;
}


</style>
