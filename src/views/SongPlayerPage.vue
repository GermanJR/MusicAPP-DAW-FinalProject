<script>
import {messageStore} from "@/stores/messagesStore.js";
import {changeSongPlaybackState, getSongById} from "@/functions/songRequest.js";
import getPlayer from "@/utils/web_player.js";

export default {
  name: "SongPlayerPage",
  components: {
  },

  computed: {
    isSongIdSet() {
      return !!this.$route.params.id
    },
  },

  data() {
    return {
      currentSong: {},
      player: null,
      playing: false,
    }
  },

  async mounted() {
    const messages = messageStore();

    if (this.isSongIdSet) {
      this.currentSong = await getSongById(localStorage.getItem("access_token"), this.$route.params.id)
      this.player = getPlayer()
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

      <button type="button" id="play_button" @click="handleSongStatus" class="mb-3">
        <img v-if="playing" id="button_icon_stop" src="/stopIcon.png" alt="Stop Icon">
        <img v-if="!playing" id="button_icon" src="/play-332-48.png" alt="Play Icon">
      </button>

      <div v-html="getPopularity()"></div>
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
  background-color: #181818;
  color: #f2f2f2;
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
</style>