export async function getProfile(accessToken) {

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });
  if (!response.ok) {
      throw new Error("Error! Could not get the user profile.")
  }
  return await response.json();
}
