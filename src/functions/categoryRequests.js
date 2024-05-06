export async function getAllCategories(token) {
    const result = await fetch(
        `https://api.spotify.com/v1/browse/categories?limit=21&locale=en_EN`,
        {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        }
    );
    if (!result.ok) {
        throw new Error("Error! Could not get categories.");
    }
    const spotifyResponse = await result.json();
    return spotifyResponse.categories;
}

export async function getPaginatedCategories(token, url) {
    const result = await fetch(
        url,
        {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        }
    );
    if (!result.ok) {
        throw new Error("Error! Could not get categories.");
    }
    const spotifyResponse = await result.json();
    return spotifyResponse.categories;
}