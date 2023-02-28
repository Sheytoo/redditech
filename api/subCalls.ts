import { getValueFor } from "../secureStore";
import { Category } from "../components/CategorySelector";
import { IPost } from "../components/PostComponent";

export interface ResponseSubs {
  data: {
    children: IPost[]
  }
}

export async function getNewSubs(filter: Category, limit: number = 25) {
  const token = await getValueFor("token")
  return fetch(`https://oauth.reddit.com/${filter.toLowerCase()}?limit=${limit}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
    .then((response) => response.json())
    .then((responseJson: ResponseSubs) => {
      return responseJson.data.children;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export async function getPopularSubs() {
  const token = await getValueFor("token")
  fetch("https://oauth.reddit.com/users/popular", {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((responseJson: Subs) => {
      return responseJson.data.children
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function searchSubs(query: string) {
  const token = await getValueFor("token")
  fetch("https://www.reddit.com/search/.json?q=" + query + "&source=recent&type=sr", {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
    .then((response) => response.json())
    .then((responseJson: Subs) => {
      return responseJson.data.children
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function getHomePage() {
  fetch("https://www.reddit.com/.json", {
    method: 'GET',
    headers: {}
  })
}
