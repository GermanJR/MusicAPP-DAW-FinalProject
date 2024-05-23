export async function getUserPlaylists(accessToken) {

    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
    if (!response.ok) {
        throw new Error("Error! Could not get user playlists" )
    }
    return await response.json();
}

export async function createPlaylist(accessToken, userId, name, description, isPublic) {

    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: {
            "name": name,
            "description": description,
            "public": isPublic
        }
    });
    if (!response.ok) {
        throw new Error("Error! Could not create a new playlist: " + response.statusText)
    }
    return await response.json();
}

export async function addItemsToPlaylist(accessToken, userId, playlistId, uris) {

    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: {
            "uris": [
                uris
            ]
        }
    });
    if (!response.ok) {
        throw new Error("Error! Could not add items to playlist: " + response.statusText)
    }
    return await response.json();
}

