"use server";
import { Posts } from "@/interfaces/posts";
import { Post } from "@/interfaces/posts";
import { fetchFailedMessage } from "./constants";
import { User } from "@/interfaces/user";
import ApiError from "@/classes/api-error";

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
  
export const fetchPost = async (id: number): Promise<Post> => {
    const res = await fetch(`https://dummyjson.com/posts/${id}`);

    if (!res.ok)
        throw new Error(fetchFailedMessage);

    return await res.json();
};

export const fetchPostsById = async (userId: number): Promise<Post[]> => {
    const res = await fetch(`https://dummyjson.com/users/${userId}/posts`);

    if (!res.ok)
        throw new Error(fetchFailedMessage);

    const data: Posts = await res.json();
    return data.posts;
};

export const fetchUserById = async (userId: number): Promise<User | ApiError > => {
    try {
    const res = await fetch(`https://dummyjson.com/users/${userId}`);

    if (res.status == 404)
            return ApiError.fromError(404);;

    if (!res.ok)
    {
        //logging could be done here
        throw ApiError.fromError(res.status, fetchFailedMessage);
    }

    const data: User = await res.json();
        return data;

    } catch {
        //catching all errors, we don't want to show all internal error-messages to client so providing general error to client
        return ApiError.fromError(500, "Network error occurred.");
    }
};