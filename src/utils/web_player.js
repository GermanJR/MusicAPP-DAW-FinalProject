import {messageStore} from "@/stores/messagesStore.js";
import {userStore} from "@/stores/userStore.js";

let player = null
let checked = false

function setPlayer(newPlayer){
    player = newPlayer
}

export default function getPlayer() {
    return player
}

export function setupPlayer() {
    const messages = messageStore();
    const myUserStore =  userStore();

    if (myUserStore.hasUserPremium() && !checked) {
        console.log("Current user doesn't have premium.")
    } else {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'MusicAPP player',
                getOAuthToken: callback => {
                    callback(localStorage.getItem("access_token"));
                },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({device_id}) => {
                //messages.addMessage("success", "The player is ready.")
                localStorage.setItem("player_id", device_id)
                //console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({device_id}) => {
                messages.addMessage("warning", "The player went offline.")
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('initialization_error', ({message}) => {
                console.error(message);
            });

            player.addListener('authentication_error', ({message}) => {
                console.error(message);
            });

            player.addListener('account_error', ({message}) => {
                console.error(message);
            });

            player.addListener('player_state_changed', ({
                                                            position,
                                                            duration,
                                                            track_window: {current_track}
                                                        }) => {
                console.log('Currently Playing', current_track);
                console.log('Position in Song', position);
                console.log('Duration of Song', duration);
            });
            player.connect();
            checked = true
        }

        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.body.appendChild(script);
    }
}