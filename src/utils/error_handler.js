import {messageStore} from "@/stores/messagesStore.js";

export function handleError (type) {
    switch (type) {
        case "token_expired": {
            alert("Your token has expired, please log in again.")
            const messages = messageStore()
            messages.addMessage("danger", "Token expired, log in again.")
            this.$router.push("/")
            break
        }
        default :
            console.error("Unknown type of error: " + type)
    }
}