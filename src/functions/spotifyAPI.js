export async function getToken(clientId, clientSecret) {
    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
    });
    if (!result.ok) {
        throw new Error("Error! Could not get token.");
    }
    const spotifyResponse = await result.json();
    localStorage.setItem("access_token", spotifyResponse.access_token);
    return spotifyResponse.access_token;
}