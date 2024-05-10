export async function getSongById(accessToken, id) {

    const response = await fetch('https://api.spotify.com/v1/tracks/' + id, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
    if (!response.ok) {
        throw new Error("Error! Could not get the song with ID: " + id)
    }
    return await response.json();
}

export async function changeSongPlaybackState(accessToken, songUri, playerId) {
    const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${playerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken
        },
        body: JSON.stringify({
            "uris": [`${songUri}`],
        })
    });
    if (!response.ok) {
        throw new Error("Error while changing playback state: ")
    }
    console.log("OK! Changed song")
    return true;
}

export async function pausePlayback(accessToken, playerId) {
    const response = await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${playerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken
        },
    });
    if (!response.ok) {
        throw new Error("Error while changing playback state: ")
    }
    console.log("OK! Paused song")
    return true;
}

export async function saveSongs(accessToken, songs) {
    const response = await fetch(`https://api.spotify.com/v1/me/tracks?ids=${songs}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken
        },
    });
    if (!response.ok) {
        throw new Error("Error saving songs.")
    }
    return true;
}

export async function checkSavedSongs(accessToken, songs) {
    const response = await fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${songs}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        },
    });
    if (!response.ok) {
        throw new Error("Error checking songs.")
    }
    return response.json();
}

export async function getSongAudioFeatures(accessToken, id) {
    const response = await fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        },
    });
    if (!response.ok) {
        throw new Error("Error getting song features, ID: " + id)
    }
    return response.json();
}

export async function getSongAudioAnalysis(accessToken, id) {
    const response = await fetch(`https://api.spotify.com/v1/audio-analysis/${id}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        },
    });
    if (!response.ok) {
        throw new Error("Error getting song analysis, ID: " + id)
    }
    return response.json();
}

