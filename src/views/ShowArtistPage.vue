<script>
import {messageStore} from "@/stores/messagesStore.js";
import {getArtistById, getTopArtistSongsById} from "@/functions/artistRequests.js";
import SongCard from "@/components/SongCard.vue";

export default {
  name: "ShowArtistPage",

  computed: {
    isArtistIdSet() {
      return !!this.$route.params.id
    },
  },

  components: {
    SongCard,
  },

  data() {
    return {
      artist: {},
      topArtistSongs: [],
    }
  },

  async mounted() {
    const messages = messageStore();

    if (this.isArtistIdSet) {
      this.artist = await getArtistById(localStorage.getItem("access_token"), this.$route.params.id)
      const topArtistSongResponse = await getTopArtistSongsById(localStorage.getItem("access_token"), this.$route.params.id)
      this.topArtistSongs = topArtistSongResponse.tracks.slice(0, 3)
    } else {
      messages.addMessage("danger", "Error! Artist ID not found.")
    }
  },

  methods: {
    getImage() {
      try {
        if (this.artist) {
          return this.artist.images[1].url
        }

      } catch (error) {
        console.warn("Empty artist")
      }
      return ""
    },

    getPopularity() {
      if (this.artist.popularity) {
        const popularity = this.artist.popularity;
        switch (true) {
          case popularity < 10:
            return `
                    <div class="px-3" style="background-color: crimson; padding-top: 10px; color: #181818; border-radius: 20px; border: solid 5px #790009; margin-bottom: 20px;">
                        <h3>Artist popularity:</h3>
                        <h4><strong>(${popularity})</strong></h4>
                        <h5>Very low</h5>
                    </div>
            `;
          case popularity >= 10 && popularity < 30:
            return `
                    <div class="px-3" style="background-color: orange; padding-top: 10px; color: #181818; border-radius: 20px; border: solid 5px darkorange; margin-bottom: 20px;">
                        <h3>Artist popularity:</h3>
                        <h4><strong>(${popularity})</strong></h4>
                        <h5>Low</h5>
                    </div>
            `;
          case popularity >= 30 && popularity < 50:
            return `
                    <div class="px-3" style="background-color: #ffff5e; padding-top: 10px; color: #181818; border-radius: 20px; border: solid 5px #cbcb00; margin-bottom: 20px;">
                        <h3>Artist popularity:</h3>
                        <h4><strong>(${popularity})</strong></h4>
                        <h5>Ok</h5>
                    </div>
            `;
          case popularity >= 50 && popularity < 70:
            return `
                    <div class="px-3" style="background-color: #c8ff00; padding-top: 10px; color: #181818; border-radius: 20px; border: solid 5px #a5d200; margin-bottom: 20px;">
                        <h3>Artist popularity:</h3>
                        <h4><strong>(${popularity})</strong></h4>
                        <h5>Good</h5>
                    </div>
            `;
          case popularity >= 70 && popularity < 90:
            return `
                    <div class="px-3" style="background-color: #22fd00; padding-top: 10px; color: #181818; border-radius: 20px; border: solid 5px #329400; margin-bottom: 20px;">
                        <h3>Artist popularity:</h3>
                        <h4><strong>(${popularity})</strong></h4>
                        <h5>Great</h5>
                    </div>
            `;
          case popularity >= 90:
            return `
                    <div class="px-3" style="background-color: #00fab7; padding-top: 10px; color: #181818; border-radius: 20px; border: solid 5px #00947e; margin-bottom: 20px;">
                        <h3>Artist popularity:</h3>
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

    getFollowers() {
      const messages = messageStore()
      try {
        if (this.artist){
          return this.artist.followers.total
        } else {
          messages.addMessage("danger", "Error! Artist is not defined.")
        }
      }catch (error) {
        console.warn("Property followers of artist not defined.")
      }
    },

    getArtistGenres() {
      const messages = messageStore()
      try {
        if (this.artist){
          return this.artist.genres.join(", ");
        } else {
          messages.addMessage("danger", "Error! Artist is not defined.")
        }
      }catch (error) {
        console.warn("Property genres of artist not defined.")
      }
    },

    handleSpotifyRedirection() {
      window.open(this.artist.external_urls.spotify, "_blank");
    },
  }
}
</script>

<template>
<div class="container p-3" id="main_container">
  <h1 class="col-12 col-sm-6 text-center"><strong>{{ artist.name }}</strong></h1>
  <div class="row text-center d-flex flex-column align-content-center align-items-center">
    <div class="col-12 col-sm-6  px-4" id="photo_container"><img :src="getImage()" alt="Artist photo" class="img-fluid"></div>

  </div>
  <div class="row text-center d-flex flex-column align-content-center align-items-center">
    <h4 class="col-12">Followers: {{ getFollowers() }}</h4>
    <h4 class="col-12">Genres: {{ getArtistGenres() }}</h4>
  </div>

  <div class="row text-center d-flex flex-column align-content-center align-items-center">
    <h3 class="col-12">Top 3 {{ artist.name }} songs:</h3>
    <song-card v-for="song in this.topArtistSongs" :key="song" :song-received="song"></song-card>
  </div>

  <div class="row text-center d-flex flex-column align-content-center align-items-center">
    <div v-html="getPopularity()"></div>
  </div>

  <div class="row text-center d-flex flex-column align-content-center align-items-center">
    <button type="button" class="spotify-button d-flex flex-row" @click="handleSpotifyRedirection">
      <img class="spotify-icon" src="/buttonIcon.png" alt="Spotify Icon">
      Open on Spotify
    </button>
  </div>
</div>
  <div style="height: 150px"></div>
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

.spotify-icon {
  height: 25px;
  width: 25px;
  vertical-align: middle;
  margin-right: 8px;
}

.spotify-button {
  flex: 1 1 auto;
  background-color: #1ED760;
  border: none;
  border-radius: 20px;
  color: #000;
  font-weight: bold;
  padding: 10px;
  text-align: center;
}

</style>