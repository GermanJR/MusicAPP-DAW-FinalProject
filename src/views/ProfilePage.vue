<script>
import {defineComponent} from 'vue'
import {mapState} from "pinia";
import {userStore} from "@/stores/userStore";

export default defineComponent({
  name: "ProfilePage",
  computed: {
    ...mapState(userStore, {
      user: "currentUser",
    }),
  },

  data() {
    const store = userStore()
    return {
      profile: store.getProfilePicture()
    }
  },

  methods: {
    goToSpotifyProfile() {
      window.open(this.user.external_urls.spotify, "_blank")
    }
  },
})
</script>

<template>
  <div class="profile-page">
    <h1>My profile</h1>
    <div class="profile-container">
      <div class="profile-header">
        <img :src="profile" alt="Profile picture" class="profile-picture">
        <div class="profile-info">
          <h2>{{ user.display_name }}</h2>
          <p>Country: {{ user.country }}</p>
          <p>Followers: {{ user.followers.total }}</p>
          <p>Account type: {{ user.product }}</p>
        </div>
      </div>
      <button type="button" class="go-to-button" @click="goToSpotifyProfile">
        View on Spotify
      </button>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  text-align: center;
  color: #FFFFFF;
  background-color: #181818;
  padding: 40px 0;
}

.profile-container {
  display: inline-block;
  background-color: #282828;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.profile-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.profile-picture {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  margin-right: 20px;
}

.profile-info h2 {
  margin: 0;
  color: #1DB954;
}

.profile-info p {
  margin: 5px 0;
  color: #b3b3b3;
}

.go-to-button {
  display: block;
  margin: 20px auto;
  background-color: #1DB954;
  color: #000000;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
}
</style>