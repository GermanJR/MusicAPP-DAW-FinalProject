<script>
import {messageStore} from "@/stores/messagesStore.js";
import {changeSongPlaybackState, checkSavedSongs, getSongById, saveSongs} from "@/functions/songRequest.js";
import getPlayer from "@/utils/web_player.js";
import {userStore} from "@/stores/userStore.js";

export default {
  name: "SongPlayerPage",
  components: {
  },

  computed: {
    isSongIdSet() {
      return !!this.$route.params.id
    },

    getButtonText() {
      return this.clicked ? "Saved!" : "Save on Spotify"
    },

    getAvailabilityBlock() {
      try {
        return this.getAvailability()
      }catch (error) {
        console.warn("Include triggered on availability block")
        return ""
      }
    },

    isUserPremium() {
      const myUserStore =  userStore()
      return myUserStore.hasUserPremium()
    }
  },

  data() {
    return {
      currentSong: {},
      player: null,
      playing: false,
      isSongSaved: false,
      clicked: false,
    }
  },

  async mounted() {
    document.title = "MusicAPP player"
    const messages = messageStore();

    if (this.isSongIdSet) {
      this.currentSong = await getSongById(localStorage.getItem("access_token"), this.$route.params.id)
      this.player = getPlayer()
      const response = await checkSavedSongs(localStorage.getItem("access_token"), this.currentSong.id)
      this.isSongSaved = response[0]
    } else {
      messages.addMessage("danger", "Error! Song ID not found on player.")
    }
  },

  methods: {
    handleSongStatus() {
      if (this.playing) {
        this.pauseSong()
      } else {
        this.playSong()
      }
    },

    playSong() {
      if (this.player) {
        changeSongPlaybackState(localStorage.getItem("access_token"), this.currentSong.uri, localStorage.getItem("player_id"))
        this.player.togglePlay()
        this.player.resume()
        this.playing = true;
      }
    },

    pauseSong() {
      if (this.player) {
        this.player.pause();
        this.playing = false
      }
    },

    getArtists() {
      if (this.currentSong.artists) {
        return this.currentSong.artists.map(artist => artist.name).join(", ");
      }
      return "";
    },

    getDurationFormatted(milliseconds) {
      let seconds = Math.floor(milliseconds / 1000);
      let minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
      minutes = minutes.toString().padStart(2, '0');
      seconds = seconds.toString().padStart(2, '0');
      return minutes + ":" + seconds;
    },

    getImage() {
      try {
        if (this.currentSong) {
          return this.currentSong.album.images[1].url
        }

      } catch (error) {
        console.warn("Empty song")
      }
      return ""
    },

    getPopularity() {
      if (this.currentSong.popularity) {
        const popularity = this.currentSong.popularity;
        switch (true) {
          case popularity < 10:
            return `
                    <div style="background-color: crimson; padding-top: 10px; color: #181818; border-radius: 20px; border: solid 5px #790009; margin-bottom: 20px;">
                        <h3>Song popularity:</h3>
                        <h4><strong>(${popularity})</strong></h4>
                        <h5>Very low</h5>
                    </div>
            `;
          case popularity >= 10 && popularity < 30:
            return `
                    <div style="background-color: orange; padding-top: 10px; color: #181818; border-radius: 20px; border: solid 5px darkorange; margin-bottom: 20px;">
                        <h3>Song popularity:</h3>
                        <h4><strong>(${popularity})</strong></h4>
                        <h5>Low</h5>
                    </div>
            `;
          case popularity >= 30 && popularity < 50:
            return `
                    <div style="background-color: #ffff5e; padding-top: 10px; color: #181818; border-radius: 20px; border: solid 5px #cbcb00; margin-bottom: 20px;">
                        <h3>Song popularity:</h3>
                        <h4><strong>(${popularity})</strong></h4>
                        <h5>Ok</h5>
                    </div>
            `;
          case popularity >= 50 && popularity < 70:
            return `
                    <div style="background-color: #c8ff00; padding-top: 10px; color: #181818; border-radius: 20px; border: solid 5px #a5d200; margin-bottom: 20px;">
                        <h3>Song popularity:</h3>
                        <h4><strong>(${popularity})</strong></h4>
                        <h5>Good</h5>
                    </div>
            `;
          case popularity >= 70 && popularity < 90:
            return `
                    <div style="background-color: #22fd00; padding-top: 10px; color: #181818; border-radius: 20px; border: solid 5px #329400; margin-bottom: 20px;">
                        <h3>Song popularity:</h3>
                        <h4><strong>(${popularity})</strong></h4>
                        <h5>Great</h5>
                    </div>
            `;
          case popularity >= 90:
            return `
                    <div style="background-color: #00fab7; padding-top: 10px; color: #181818; border-radius: 20px; border: solid 5px #00947e; margin-bottom: 20px;">
                        <h3>Song popularity:</h3>
                        <h4><strong>(${popularity})</strong></h4>
                        <h5>Excellent</h5>
                    </div>
            `;
          default:
            console.error("Strange popularity value detected: " + popularity);
            return "Popularity: Not rated";
        }
      }
    },

    async saveSongOnSpotify() {
      const messages = messageStore()
      if (await saveSongs(localStorage.getItem("access_token"), this.currentSong.id)) {
        messages.addMessage("success", "Song saved successfully.")
        this.clicked = true
      } else {
        messages.addMessage("danger", "Error saving song.")
      }
    },

    getAvailability() {
      const myUserStore = userStore()
      const user = myUserStore.getCurrentUser()
      if (user){
        const songAvailableCountries = this.currentSong.available_markets
        if (songAvailableCountries.includes(user.country)) {
          return `<div class="px-2" style="background-color: rgba(29,185,84,0.6); border: solid 2px #029f3b; border-radius: 20px; max-width: 125px;">
                    <img class="mt-3" src="/correct.png" alt="icon" style="max-width: 50px">
                    <p>Song available.</p>
                  </div>`
          } else {
            return `<div style="background-color: rgba(187,0,0,0.6); border: solid 2px rgb(187,0,0); border-radius: 20px; max-width: 125px;">
                    <img class="mt-3" src="/incorrect.png" alt="icon" style="max-width: 50px">
                    <p>Song not available.</p>
                  </div>`
          }
        } else {
          console.warn("User not found.")
          return ""
        }
    },

    redirectToAnalysis() {
      const routeData = this.$router.resolve({name: 'analysis', params: {id: this.currentSong.id}});
      window.open(routeData.href, '_blank');
    }
  },
}
</script>

<template>
  <div v-if="!isSongIdSet" class="container text-center">
    <h1 class="text-bg-danger p-3" style="color: black !important;">Song is not provided!</h1>
  </div>
  <div v-if="isSongIdSet" class="container pt-3" id="main_container">
    <div class="row text-center d-flex flex-column align-content-center align-items-center">
      <h2>{{ currentSong.name }}</h2>
      <div class="px-4" id="photo_container"><img :src="getImage()" alt="Album photo" class="img-fluid"></div>

      <h6>{{ getDurationFormatted(currentSong.duration_ms) }}</h6>
      <h5>{{ getArtists() }}</h5>

      <h5 class="mt-4 mb-2">Availability in your country:</h5>

      <div class="d-flex flex-column align-items-center" v-html="getAvailabilityBlock"></div>

      <button v-if="isUserPremium" type="button" id="play_button" @click="handleSongStatus" class="my-3">
        <img v-if="playing" id="button_icon_stop" src="/stopIcon.png" alt="Stop Icon">
        <img v-if="!playing" id="button_icon" src="/play-332-48.png" alt="Play Icon">
      </button>

      <button v-if="!isUserPremium" type="button" id="play_button_denied" class="my-3" disabled>
        <img id="button_icon" src="/play-332-48.png" alt="Play Icon">
      </button>
      <h6 class="text-center mb-5" v-if="!isUserPremium">You have to be a Spotify premium user in order to use the web player.</h6>

      <div style="max-width: 275px;" v-html="getPopularity()"></div>

      <button v-if="!isSongSaved" :disabled="clicked" type="button" @click="saveSongOnSpotify" id="openButton"
              class="col-12 col-sm-6 my-3">{{ getButtonText }}
      </button>

      <button type="button" @click="redirectToAnalysis" id="openButton"
              class="col-12 col-sm-6 my-3">More details
      </button>
    </div>
  </div>
  <div style="height: 150px"></div>
</template>

<style scoped>
#play_button {
    height: 60px;
    width: 60px;
    background-color: #1ED760;
    border: solid 2px #000;
    border-radius: 1000px;
    color: #000;
    font-weight: bold;
    padding-top: 2px;
}

#play_button_denied {
    height: 60px;
    width: 60px;
    background-color: rgba(30, 215, 96, 0.24);
    border: solid 2px #000;
    border-radius: 1000px;
    color: #000;
    font-weight: bold;
    padding-top: 2px;
}

#button_icon {
  margin-left: 3px;
  height: 30px;
  width: 30px;
}

#button_icon_stop {
  height: 20px;
  width: 20px;
}

#main_container {
  margin-top: 20px;
  background-color: #282828;
  color: #f2f2f2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  border-radius: 50px;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
}

#photo_container {
  height: 300px;
  width: 300px;
}

#photo_container img {
  border-radius: 3px;
  border: solid 3px #f2f2f2;
}

#openButton {
  height: 40px;
  width: 200px;
  background-color: #1ED760;
  border: solid 2px #00752a;
  border-radius: 20px;
  color: #000;
  font-weight: bold;
  padding-top: 2px;
  margin-top: 25px;
}

button:disabled,
button[disabled]{
  height: 40px;
  width: 200px;
  background-color: rgba(30, 215, 96, 0.78) !important;
  border: solid 2px rgba(0, 117, 42, 0.96) !important;
  border-radius: 20px;
  color: #000;
  font-weight: bold;
  padding-top: 2px;
  margin-top: 25px;
}
</style>