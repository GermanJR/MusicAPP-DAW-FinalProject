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
        body: JSON.stringify({
            "name": name,
            "description": description,
            "public": isPublic
        })
    });
    if (!response.ok) {
        throw new Error("Error! Could not create a new playlist: " + await response.text())
    }
    return await response.json();
}

export async function addItemsToPlaylist(accessToken, userId, playlistId, uris) {
    const formattedUris = uris.split(',').map(id => `spotify:track:${id}`) + "";
    const formattedUrisArray = formattedUris.split(',')

    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "uris": formattedUrisArray,
        })
    });
    if (!response.ok) {
        throw new Error("Error! Could not add items to playlist: " + await response.text())
    }
    return await response.json();
}

export async function addImageToPlaylist(accessToken, playlistId, image) {
    console.log(playlistId)
    console.log(image)
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/images`, {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + accessToken,
        },
        body: image
    });
    if (!response.ok) {
        throw new Error("Error! Could not add items to playlist: " + await response.text())
    }
    return response.ok;
}

