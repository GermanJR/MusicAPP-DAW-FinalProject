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
            console.log(this.currentUser.images[0] !== undefined)
            if (this.currentUser && this.currentUser.images[0] !== undefined) {
                return this.currentUser.images[1].url
            }
            return "/default_pfp.jpg"
        },

        hasUserPremium() {
            return this.currentUser.product === "premium";

        }
    }
})