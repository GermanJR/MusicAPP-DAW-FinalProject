<script>
import {defineComponent} from 'vue'
import {REDIRECT_URI} from "@/utils/const_utils";

export default defineComponent({
  name: "HomePage",
  methods: {
    async handleLogin() {
      const client_id = import.meta.env.VITE_CLIENT_ID;
      const redirect_uri = REDIRECT_URI;
      const scope = 'user-read-private user-read-email user-top-read streaming app-remote-control playlist-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing user-library-modify user-library-read';
      const state = this.generateRandomString(16);

      const params = new URLSearchParams({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }).toString();

      window.location.href = `https://accounts.spotify.com/authorize?${params}`;
    },

    generateRandomString(length) {
      let text = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    },
  }
})

</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <img alt="MusicAPP logo" src="/musicapp_logo.png" class="logo">
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <h1>MusicAPP</h1>
        <h3 id="description">Login with your Spotify account to have access to features like: get song recommendations, view
          your top artists, save new songs, delete playlists, and more... </h3>
        <button id="login_button" type="button" class="text-start" @click="handleLogin">
          <img id="spotify_icon" src="/buttonIcon.png" alt="Spotify Icon">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#login_button {
  height: 40px;
  width: 200px;
  background-color: #1ED760;
  border: solid 2px #000;
  border-radius: 20px;
  color: #000;
  font-weight: bold;
  padding-top: 2px;
}

#spotify_icon {
  height: 25px;
  width: 25px;
  margin: 0 40px 0 5px;
}

#description {
  margin: 30px 0 30px 0;
}

.logo {
  height: 300px;
  width: auto;
}
</style>