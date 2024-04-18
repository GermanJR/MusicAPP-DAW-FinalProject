export async function getUserTopItems(accessToken, type, range, limit) {
    const response = await fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=${range}&limit=${limit}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
    if (!response.ok) {
        throw new Error("Error! Could not get the user top items. Items searched: " + type)
    }
    return await response.json();
}
