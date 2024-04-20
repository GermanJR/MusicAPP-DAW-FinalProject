<script>
import {messageStore} from "@/stores/messagesStore.js";
import {changeSongPlaybackState, getSongById} from "@/functions/songRequest.js";
import getPlayer from "@/utils/web_player.js";

export default {
  name: "SongPlayerPage",
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
    }
  },
}
</script>

<template>
  <div v-if="!isSongIdSet" class="container text-center">
    <h1 class="text-bg-danger p-3" style="color: black !important;">Song is not provided!</h1>
  </div>
  <div v-if="isSongIdSet" class="container">
    <div class="row">
      <h2>{{ currentSong.name }}</h2>
      <img :src="getImage()" alt="Album photo" style="height: 300px; width: 300px;">
      <h6>{{ getDurationFormatted(currentSong.duration_ms) }}</h6>
      <h5>{{ getArtists() }}</h5>

      <button type="button" @click="handleSongStatus">
        <img v-if="playing" id="button_icon" src="/pause-33-48.png" alt="Pause Icon">
        <img v-if="!playing" id="button_icon" src="/play-332-48.png" alt="Play Icon">
      </button>
    </div>
  </div>
</template>

<style scoped>
#button_icon {

}
</style>