import {defineStore} from "pinia";
import {getAllCategories, getPaginatedCategories} from "@/functions/categoryRequests.js";

export const categoriesStore = defineStore("categoriesStore", {
    state: () => ({
        categories: [],
    }),

    getters: {
        allCategories: (state) => state.categories,
        findCategoryById: (state) => (id) => state.categories.find((category) => category.id === id)
    },

    actions: {
        async populateCategories() {
            if (localStorage.getItem("access_token")) {
                this.categories = await getAllCategories(localStorage.getItem("access_token"));
            } else {
                throw new Error("Error in categories! Token is not set.");
            }
        },

        async getNewCategories(url) {
            if (localStorage.getItem("access_token")) {
                this.categories = await getPaginatedCategories(localStorage.getItem("access_token"), url);
                console.log(this.categories)
            } else {
                throw new Error("Error in categories! Token is not set.");
            }
        }
    }
})