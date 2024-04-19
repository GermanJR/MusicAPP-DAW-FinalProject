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
      console.log(this.player)
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
        changeSongPlaybackState(localStorage.getItem("access_token"), this.currentSong.uri)
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
  },
}
</script>

<template>
  <div v-if="!isSongIdSet" class="container text-center">
    <h1 class="text-bg-danger p-3" style="color: black !important;">Song is not provided!</h1>
  </div>
  <div v-if="isSongIdSet" class="container">
    <div class="row">
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