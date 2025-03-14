"use server";
import { Posts } from "@/interfaces/posts";

export const fetchTopViewedPosts = async(count = 3) => {
    const res = await fetch('https://dummyjson.com/posts');
   
    if (!res.ok)
        throw new Error('Error fetching data');

    const data: Posts = await res.json();
    return data.posts.sort((a, b) => b.views - a.views).slice(0, count);
};

