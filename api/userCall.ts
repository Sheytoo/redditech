import { getValueFor } from "../secureStore";

export async function getUserPref(){
    const token = await getValueFor("token")
    fetch('https://oauth.reddit.com/api/v1/me/prefs', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {})
        .catch((error) => {
            console.log(error)
        })
}
// over_18, activity_relevant_ads, default_comment_sort (confidence, top, new, controversial, old, random, qa, live), accept_pms (everyone, whitelisted)
// show_location_based_recommendations