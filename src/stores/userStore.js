import { defineStore } from 'pinia'
import {getProfile} from "@/functions/userRequests.js";
/*
interface SpotifyAccessToken {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
}
*/
export const userStore = defineStore("user", {
    state: () => ({
        currentUser: Object,
    }),

    actions: {
        getCurrentUser() {
            return this.currentUser;
        },

        async populateUser(token) {
            this.currentUser = await getProfile(token)
        },

        deleteCurrentUser() {
            this.currentUser = Object;
        },

        getProfilePicture() {
            if (this.currentUser && this.currentUser.images.url) {
                return this.currentUser.images.url
            }
            return "/default_pfp.jpg"
        }
    }
})