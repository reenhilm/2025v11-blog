import { post } from "@/interface";

export async function getSearchPosts(query: string) {
    const res = await fetch( `https://dummyjson.com/posts/search?q=${query}`);
    if (!res.ok)
        throw new Error('Error fetching data');
    const data = await res.json();
    const searchResults = data.posts as post[];
    return searchResults;
  }
