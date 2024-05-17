import {defineStore} from "pinia";

export const memoryItemsStore = defineStore("itemsStore", {
    state: () => ({
        songsSaved: [],
        artistsSaved: [],
        recommendedSongsSaved: [],
        showTopSongs: false,
        showTopArtists: false,
    }),

    getters: {
        getSongs: (state) => state.songsSaved,
        getArtists: (state) => state.artistsSaved,
        getRecommendedSongs: (state) => state.recommendedSongsSaved,
        getTopSongsStatus: (state) => state.showTopSongs,
        getTopArtistsStatus: (state) => state.showTopArtists,
    },

    actions: {
        saveSongs(songs) {
            this.songsSaved = songs
        },

        saveArtists(artists) {
            this.artistsSaved = artists
        },

        saveRecommendedSongs(recommendedSongs) {
            this.recommendedSongsSaved = recommendedSongs
        },

        updateShowTopSongs(state) {
            this.showTopSongs = state
        },

        updateShowTopArtists(state) {
            this.showTopArtists = state
        }
    }
})