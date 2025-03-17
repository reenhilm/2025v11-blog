"use server";
import { Posts } from "@/interfaces/posts";
import { post } from "@/interface";
export const fetchTopViewedPosts = async(count = 3) => {
    const res = await fetch('https://dummyjson.com/posts');
   
    if (!res.ok)
        throw new Error('Error fetching data');

    const data: Posts = await res.json();
    return data.posts.sort((a, b) => b.views - a.views).slice(0, count);
};

export async function getSearchPosts(query: string) {
    const res = await fetch( `https://dummyjson.com/posts/search?q=${query}`);
    if (!res.ok)
        throw new Error('Error fetching data');
    const data = await res.json();
    const searchResults = data.posts as post[];
    return searchResults;
  }

  export async function getByTag(tag: string) {
    const res = await fetch( `https://dummyjson.com/posts/tag/${tag}`);
    if (!res.ok)
        throw new Error('Error fetching data');
    const data = await res.json();
    const searchResults = data.posts as post[];
    return searchResults;
  }