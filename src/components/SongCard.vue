<script>
export default {
  name: "SongCard",
  props: {
    songReceived: {
      type: Object,
      required: true,
    }
  },

  methods: {
    getArtists() {
      return this.songReceived.artists.map(artist => artist.name).join(", ");
    },

    handleSpotifyRedirection() {
      window.open(this.songReceived.external_urls.spotify, "_blank");
    },

    openSongInPlayer() {
      // Implementation for playing the song
    },

    getDurationFormatted(milliseconds) {
      let seconds = Math.floor(milliseconds / 1000);
      let minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
      minutes = minutes.toString().padStart(2, '0');
      seconds = seconds.toString().padStart(2, '0');
      return minutes + ":" + seconds;
    }
  }
}
</script>

<template>
  <div class="song-card">
    <div class="song-info">
      <h4><b>{{ songReceived.name }}</b></h4>
      <h6>Duration: {{ getDurationFormatted(songReceived.duration_ms) }}</h6>
      <h5>{{ getArtists() }}</h5>
    </div>
    <div class="song-actions">
      <button type="button" class="listen-button" @click="openSongInPlayer">Play song</button>
      <button type="button" class="spotify-button" @click="handleSpotifyRedirection">
        <img class="spotify-icon" src="/buttonIcon.png" alt="Spotify Icon">
        Open on Spotify
      </button>
    </div>
  </div>
</template>

<style scoped>
.song-card {
  background-color: #191414;
  color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  transition: background-color 0.3s ease;
}

.song-card:hover {
  background-color: #282828;
}

.song-info h4,
.song-info h5,
.song-info h6 {
  margin: 8px 0;
}

h5 {
  color: #A7A7A7;
}

.song-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.listen-button,
.spotify-button {
  flex: 1 1 auto;
  max-width: calc(50% - 8px);
  background-color: #1ED760;
  border: none;
  border-radius: 20px;
  color: #000;
  font-weight: bold;
  padding: 10px;
  text-align: center;
}

.spotify-icon {
  height: 25px;
  width: 25px;
  vertical-align: middle;
  margin-right: 8px;
}

@media (max-width: 576px) {
  .listen-button,
  .spotify-button {
    max-width: 100%;
  }
}
</style>
