"use server";
import { Posts } from "@/interfaces/posts";
import { Post } from "@/interfaces/posts";
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
        throw new Error(fetchFailedMessage);

    const data = await res.json();
    const searchResults = data.posts as Post[];
    return searchResults;
}

export async function getProlificPosters() {
    const res = await fetch('https://dummyjson.com/posts?limit=0');
    if (!res.ok) 
        throw new Error(fetchFailedMessage);

    const data = await res.json();
    const posts = data.posts;

    // Count posts per user
    const userPostCounts: Record<number, number> = {};
    posts.forEach((post: { userId: number }) => {
        userPostCounts[post.userId] = (userPostCounts[post.userId] || 0) + 1;
    });

    // Convert to an array and sort by post count
    const prolificPosters = Object.entries(userPostCounts)
        .map(([userId, count]) => ({ userId: Number(userId), count }))
        .sort((a, b) => b.count - a.count);

    //Add one more mapping step to get the user name.
    const niceNames = await getAllUsers();   
    console.log(niceNames);
    
    //prolificPosters.forEach((poster) => {     
    //    const user = users.find((user) => user.id === poster.userId);
    //    poster.name = user?.name || "Unknown";
    // }
   // )   
   //    return niceNames;
    return prolificPosters;
}

export async function getTotalPostsCount() {
    const res = await fetch('https://dummyjson.com/posts');
    if (!res.ok) {
        throw new Error(fetchFailedMessage);
    }
    const data = await res.json();
    return data.posts.length; // Returns the total number of posts
}
  
export const fetchPost = async (id: number): Promise<Post> => {
    const res = await fetch(`https://dummyjson.com/posts/${id}`);

    if (!res.ok)
        throw new Error(fetchFailedMessage);

    return await res.json();
};