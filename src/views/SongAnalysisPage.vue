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
        this.loadDanceability()
        this.loadEnergy()
        this.loadValence()
      } else {
        throw new Error("Song ID not found.")
      }
    }catch (error){
      messages.addMessage("danger", error)
      console.error(error)
    }
  },

  methods: {
    getImage() {
      try {
        if (this.song) {
          return this.song.album.images[1].url
        }

      } catch (error) {
        console.warn("Empty song (analyzer)")
      }
      return ""
    },

    loadDanceability() {
      const danceSlider = document.getElementById('danceabilitySlider');
      const value = this.songFeatures.danceability
      danceSlider.style.background = `linear-gradient(to right, #800080 0%, #FFC0CB ${value * 100}%, #808080 ${value * 100}%, #808080 100%)`;
    },

    loadEnergy() {
      const energySlider = document.getElementById('energySlider');
      const value = this.songFeatures.energy
      energySlider.style.background = `linear-gradient(to right, #d87700 0%, #ffff68 ${value * 100}%, #808080 ${value * 100}%, #808080 100%)`;
    },

    loadValence() {
      const valenceSlider = document.getElementById('valenceSlider');
      const value = this.songFeatures.valence
      valenceSlider.style.background = `linear-gradient(to right, #2200e5 0%, #6eff42 ${value * 100}%, #808080 ${value * 100}%, #808080 100%)`;
    },
  }
}
</script>

<template>
  <div v-if="!isSongIdSet" class="container text-center">
    <h1 class="text-bg-danger p-3" style="color: black !important;">Song is not provided!</h1>
  </div>
  <div v-if="isSongIdSet" class="container pt-3" id="main_container">
    <h1>Analysing: {{song.name}}</h1>
    <div class="px-4" id="photo_container"><img :src="getImage()" alt="Album photo" class="img-fluid"></div>
    <h2>Audio features:</h2>
    <h5>Tempo: {{ songFeatures.tempo }} BPM.</h5>

    <div class="row" style="width: 300px;">
      <h5 class="col-12 col-sm-6">Danceability</h5>
      <input class="col-12 col-sm-6" type="range" min="0" max="1" :value="this.songFeatures.danceability" step="any" id="danceabilitySlider" disabled>
    </div>

    <div class="row my-3" style="width: 300px;">
      <h5 class="col-12 col-sm-6">Energy</h5>
      <input class="col-12 col-sm-6" type="range" min="0" max="1" :value="this.songFeatures.energy" step="any" id="energySlider" disabled>
    </div>

    <div class="row mb-5" style="width: 300px;">
      <h5 class="col-12 col-sm-6">Happiness</h5>
      <input class="col-12 col-sm-6" type="range" min="0" max="1" :value="this.songFeatures.valence" step="any" id="valenceSlider" disabled>
    </div>

    <h2>Audio analysis:</h2>

  </div>
</template>

<style scoped>
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

input[type=range] {
  -webkit-appearance: none;
  background: transparent;
  border-radius: 20px;
}

#danceabilitySlider {
  -webkit-appearance: none;
  height: 25px;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

#danceabilitySlider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  //background: url('/vinil.png') no-repeat center center;
  background-size: cover;
}

#danceabilitySlider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  //background: url('/vinil.png') no-repeat center center;
  background-size: cover;
}

#energySlider {
  -webkit-appearance: none;
  height: 25px;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

#energySlider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  //background: url('/thunder.png') no-repeat center center;
  background-size: cover;
}

#energySlider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  //background: url('/thunder.png') no-repeat center center;
  background-size: cover;
}

#valenceSlider {
  -webkit-appearance: none;
  height: 25px;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

#valenceSlider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
//background: url('/thunder.png') no-repeat center center;
  background-size: cover;
}

#valenceSlider::-moz-range-thumb {
  width: 25px;
  height: 25px;
//background: url('/thunder.png') no-repeat center center;
  background-size: cover;
}
</style>