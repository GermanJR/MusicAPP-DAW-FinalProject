<script>
export default {
  name: "PlaylistCard",

  props: {
    playlistRecieved: {
      type: Object,
      required: true,
    }
  }
}
</script>

<template>
<div id="main" class="playlist-card col-12 col-md-4 col-lg-3">
  <img class="playlist-image" :src="this.playlistRecieved.images[0].url" alt="Playlist image">
  <h4 class="playlist-name">{{ playlistRecieved.name }}</h4>
</div>
</template>

<style scoped>
.playlist-card {
  background-color: #181818;
  border-radius: 4px;
  padding: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.playlist-card:hover {
  transform: scale(1.05);
}

.playlist-image {
  max-width: 100%;
  border-radius: 5%;
  width: 60%;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.5);
}

.playlist-name {
  color: #FFFFFF;
  margin-top: 8px;
}

@media (hover: hover) {
  .playlist-image:hover {
    transform: scale(1.05);
  }
}

.playlist-name {
  color: #FFFFFF;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .playlist-image {
    margin: 16px 8px;
  }
}

@media (max-width: 576px) {
  .playlist-image {
    padding: 12px;
  }

  .playlist-name {
    width: 60%;
  }
}
</style>