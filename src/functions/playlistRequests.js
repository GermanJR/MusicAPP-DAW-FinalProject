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