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

export async function changeSongPlaybackState(accessToken, contextUri) {
    console.log(contextUri)
    const response = await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken
        },
        body: JSON.stringify({
            "context_uri": `${contextUri}`,
        })
    });
    console.log(await response.json())
    if (!response.ok) {
        throw new Error("Error while changing playback state: ")
    }
    return await response.json();
}

