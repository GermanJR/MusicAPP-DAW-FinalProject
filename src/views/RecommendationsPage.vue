<script>
import {getRecommendations} from "@/functions/recommendationRequests.js";
import {messageStore} from "@/stores/messagesStore.js";
import SongCard from "@/components/SongCard.vue";
import {saveSongs} from "@/functions/songRequest.js";
import {memoryItemsStore} from "@/stores/memoryItemsStore.js";

import * as yup from 'yup'
import {ErrorMessage, Field, Form} from "vee-validate";

export default {
  name: "RecommendationsPage",

  data() {
    const validationSchema = yup.object({})
    return {
      recommendedSongs: [],
      sliderSongValue: 5,
      showNewPlaylistForm: false,
      newPlaylist: {
        name: "",
        description: "",
        privacy: "private",
        image: null,
      },
      imagePreview: {
        value: null,
      },
      validationSchema,
    }
  },

  mounted() {
    document.title = "MusicAPP"
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loadDataRecommended();
    });
  },

  beforeRouteUpdate(to, from, next) {
    this.loadDataRecommended();
    next();
  },

  computed: {
    areSongsInArray() {
      return this.recommendedSongs.length !== 0;
    },

    changeButtonText() {
      return !this.areSongsInArray ? "Search" : "Refresh"
    },
  },

  components: {
    SongCard,
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
    Field,
    //ErrorMessage,
  },

  methods: {
    loadDataRecommended() {
      const itemStore = memoryItemsStore()
      const memoryRecommendedSongs = itemStore.getRecommendedSongs

      if (memoryRecommendedSongs.length !== 0) {
        this.recommendedSongs = memoryRecommendedSongs
      }
    },

    async handleRecommendedSongsCall () {
      try {
        const recommendationsResponse = await getRecommendations(localStorage.getItem("access_token"), "medium_term", this.sliderSongValue)
        this.recommendedSongs = recommendationsResponse.tracks

        const itemStore = memoryItemsStore()
        itemStore.saveRecommendedSongs(this.recommendedSongs)
      }catch (error){
        const messages = messageStore()
        messages.addMessage("danger", "Error while trying to find songs: " + error)
      }
    },

    async saveAllSongs() {
      const messages = messageStore()
      if (this.areSongsInArray) {
        if (await saveSongs(localStorage.getItem("access_token"), this.getAllSongIds())) {
          messages.addMessage("success", "Success! All songs have been saved.")
        }
      } else {
        messages.addMessage("danger", "There is no songs to save!")
      }
    },

    getAllSongIds() {
      return this.recommendedSongs.map(song => song.id).join(",")
    },

    handlePlaylistCreation() {

    },

    handleImageUpload() {
      const file = event.target.files[0];
      if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        this.newPlaylist.image = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview.value = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.newPlaylist.image = null;
        this.imagePreview.value = null;
        alert('Only .jpg and .png files are allowed');
      }
    },
  }
}
</script>

<template>
<div class="container text-center">
  <div class="row">
    <h1 class="col-12">Recommendations</h1>
    <h3 class="col-12 mt-3">Find song recommendations based on your recent interactions on Spotify.</h3>
    <h3 class="col-12 mt-3">You will be able to save the songs on your Spotify account (liked songs playlist).</h3>
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
            class="col-12 col-sm-6 me-3">{{ changeButtonText }}
    </button>

    <button v-if="areSongsInArray" type="button" @click="saveAllSongs" id="openButton"
            class="col-12 col-sm-6 me-3">Save all songs
    </button>
  </div>
  <hr v-if="areSongsInArray">
  <div v-if="areSongsInArray" class="row d-flex justify-content-center mt-5">
    <h3 v-if="!showNewPlaylistForm">Do you want to save the recommendations on a new playlist?</h3>
    <button v-if="!showNewPlaylistForm" type="button" @click="showNewPlaylistForm = true" id="newPlaylistButton"
            class="col-12 me-3 mt-2">Create new playlist
    </button>
    <Form v-if="showNewPlaylistForm" @submit="handlePlaylistCreation" :validation-schema="validationSchema">
      <h3><strong>New Playlist</strong></h3>
      <div class="mb-3">
        <label for="name" class="form-label"><strong>Playlist Name</strong></label>
        <Field name="name" type="text" class="form-control" v-model="newPlaylist.name" placeholder="Name of the playlist."  />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label"><strong>Description</strong></label>
        <Field name="description" as="textarea" class="form-control" v-model="newPlaylist.description" placeholder="Enter a description (optional)" />
      </div>
      <div class="mb-3 d-flex flex-column flex-start  align-items-center" >
        <label for="privacy"><strong>Visibility</strong></label>
        <div class="col-12">
            <span class="me-3">Private</span>
            <Field name="privacy" type="radio" value="private" v-model="newPlaylist.privacy" />
        </div>
        <div class="col-12">
            <span class="me-3">Public</span>
            <Field name="privacy" type="radio" value="public" v-model="newPlaylist.privacy" />
        </div>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label"><strong>Image cover</strong></label>
        <input
            id="image"
            type="file"
            class="form-control"
            accept=".jpg, .jpeg, .png"
            @change="handleImageUpload"
        />
      </div>
      <button type="submit" class="btn btn-primary" id="newPlaylistButton">Create Playlist</button>
    </Form>
    <button v-if="showNewPlaylistForm" type="button" @click="showNewPlaylistForm = false" id="closeButton" class="col-12">
      Close
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

#newPlaylistButton {
  height: 40px;
  width: 200px;
  background-color: #1ED760;
  border: solid 2px #000;
  border-radius: 20px;
  color: #000;
  font-weight: bold;
  padding-top: 2px;
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