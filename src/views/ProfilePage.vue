<script>
import {defineComponent} from 'vue'
import {mapState} from "pinia";
import {userStore} from "@/stores/userStore";
import LinkIcon from 'vue-material-design-icons/LinkBox.vue'

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

  components: {
    LinkIcon,
  }
})
</script>

<template>
  <h1 class="col-12">My profile</h1>
  <div class="container text-center">
    <div class="row">
      <h2 class="col-12 col-md-6 text-center">{{ user.display_name }}</h2>
      <img id="pfp" :src="profile" alt="Profile picture" class="col-12 col-md-6">
      <h2 class="col-12">Country: {{ user.country }}</h2>
      <h2 class="col-12">Followers: {{ user.followers.total }}</h2>
      <div class="row">
        <h2 class="col-12 ">Account type: {{ user.product }}</h2>
        <button id="login_button" type="button" class="col-12 text-start" @click="goToSpotifyProfile">
          <link-icon></link-icon>
          View on Spotify
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: #009b07;
  border-radius: 20px;
  border: solid 2px #000;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

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
</style>