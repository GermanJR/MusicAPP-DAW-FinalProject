export async function getArtistById(accessToken, id) {

    const response = await fetch('https://api.spotify.com/v1/artists/' + id, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
    if (!response.ok) {
        throw new Error("Error! Could not get the artist with ID: " + id)
    }
    return await response.json();
}

export async function getTopArtistSongsById(accessToken, id) {

    const response = await fetch('https://api.spotify.com/v1/artists/' + id + "/top-tracks", {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
    if (!response.ok) {
        throw new Error("Error! Could not get the artist top songs with ID: " + id)
    }
    return await response.json();
}