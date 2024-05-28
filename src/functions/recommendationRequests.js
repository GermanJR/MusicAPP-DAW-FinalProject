import {getUserTopItems} from "@/functions/mostUsedRequests.js";

export async function getRecommendations(accessToken, range, limit) {

    const topTracksData = await getUserTopItems(accessToken, "tracks", range, 5)
    const topTrackIds = topTracksData.items.slice(0, 5).map(track => track.id).join(',');
    const recommendationsResponse = await fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${topTrackIds}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    if (!recommendationsResponse.ok) {
        if (recommendationsResponse.status === 400) {
            throw new Error("The user hasn't got enough Top Songs.")
        } else {
            throw new Error("Error! Could not get recommendations.");
        }
    }
    return await recommendationsResponse.json();
}