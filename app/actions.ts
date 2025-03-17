"use server";
import { Posts } from "@/interfaces/posts";
import { Post } from "@/interface";
import { fetchFailedMessage } from "./constants";

export const fetchTopViewedPosts = async(count = 3) => {
    const res = await fetch('https://dummyjson.com/posts');
   
    if (!res.ok)
        throw new Error(fetchFailedMessage);

    const data: Posts = await res.json();
    return data.posts.sort((a, b) => b.views - a.views).slice(0, count);
};

export async function getSearchPosts(query: string) {
    const res = await fetch(`https://dummyjson.com/posts/search?q=${query}`);

    if (!res.ok)
        throw new Error(fetchFailedMessage);

    const data = await res.json();
    const searchResults = data.posts as Post[];
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
  
export const fetchPost = async (id: number): Promise<Post> => {
    const res = await fetch(`https://dummyjson.com/posts/${id}`);

    if (!res.ok)
        throw new Error(fetchFailedMessage);

    return await res.json();
};