export async function getTokenWithAuthorizationCode(code, clientId, clientSecret, redirectUri) {
    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: redirectUri,
        }).toString(),
    });

    if (!result.ok) {
        throw new Error("Error! Could not get token with authorization code.");
    }

    const spotifyResponse = await result.json();
    localStorage.setItem("access_token", spotifyResponse.access_token);
    localStorage.setItem("refresh_token", spotifyResponse.refresh_token);

    return spotifyResponse.access_token;
}
