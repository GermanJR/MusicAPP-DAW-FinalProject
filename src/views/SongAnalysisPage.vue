<script>
import {messageStore} from "@/stores/messagesStore.js";
import {getSongAudioAnalysis, getSongAudioFeatures, getSongById} from "@/functions/songRequest.js";

export default {
  name: "SongAnalysisPage",

  data() {
    return {
      song: {},
      songFeatures: {},
      songAnalysis: {},
    }
  },

  computed: {
    isSongIdSet() {
      return !!this.$route.params.id
    },
  },

  async mounted() {
    document.title = "MusicAPP analyzer"
    const messages = messageStore()
    try {
      if (this.isSongIdSet && localStorage.getItem("access_token")){
        const id = this.$route.params.id
        const token = localStorage.getItem("access_token")
        this.song = await getSongById(token, id)
        this.songFeatures = await getSongAudioFeatures(token, id)
        this.songAnalysis = await  getSongAudioAnalysis(token, id)
      } else {
        throw new Error("Song ID not found.")
      }
    }catch (error){
      messages.addMessage("danger", error)
      console.error(error)
    }
  }
}
</script>

<template>
  <div v-if="!isSongIdSet" class="container text-center">
    <h1 class="text-bg-danger p-3" style="color: black !important;">Song is not provided!</h1>
  </div>
  <div v-if="isSongIdSet" class="container pt-3" id="main_container">
    <h1>Analysing: {{song.name}}</h1>
  </div>
</template>

<style scoped>

</style>