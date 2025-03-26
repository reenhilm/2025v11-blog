"use server";
import { Posts } from "@/interfaces/posts";
import { Post } from "@/interfaces/posts";
import { fetchFailedMessage } from "./constants";
import { User } from "@/interfaces/user";
import ApiError from "@/classes/api-error";

export const fetchTopViewedPosts = async (count = 3): Promise<Post[] | ApiError> => {
    try {
        const res = await fetch('https://dummyjson.com/posts');
          
        if (!res.ok) {
            //logging could be done here
            throw ApiError.fromError(res.status, fetchFailedMessage);
        }

        const data: Posts = await res.json();
        return data.posts.sort((a, b) => b.views - a.views).slice(0, count);

    } catch {
        //catching all errors, we don't want to show all internal error-messages to client so providing general error to client
        return ApiError.fromError(500, "Network error occurred.");
    }
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

    // Fetch user details and add the name to the result  
    const prolificPosters = await Promise.all(
        Object.entries(userPostCounts).map(async ([userId, count]) => {
            const user = await fetchUserById(Number(userId)); // Fetch user info
            
            if (user instanceof ApiError) {
                // If user is not found, return a default user
                return {
                    userId: Number(userId),
                    username: "Unknown",
                    count,
                };
            }   
            
            return {
                userId: Number(userId),
                username: user.username,
                count,
            };
        })
    );

    // Sort by post count in descending order
    return prolificPosters.sort((a, b) => b.count - a.count);
}

export async function getTotalPostsCount() {
    const res = await fetch('https://dummyjson.com/posts');
    if (!res.ok) {
        throw new Error(fetchFailedMessage);
    }
    const data = await res.json();
    return data.posts.length; // Returns the total number of posts
}
  
export const fetchPost = async (id: number): Promise<Post | ApiError> => {
    try {
        const res = await fetch(`https://dummyjson.com/posts/${id}`);

        if (res.status == 404)
            return ApiError.fromError(404);

        if (!res.ok) {
            //logging could be done here
            throw ApiError.fromError(res.status, fetchFailedMessage);
        }

        const data: Post = await res.json();
        return data;

    } catch {
        //catching all errors, we don't want to show all internal error-messages to client so providing general error to client
        return ApiError.fromError(500, "Network error occurred.");
    }
};

export const fetchPostsByUserId = async (userId: number): Promise<Post[] | ApiError> => {
    try {
        const res = await fetch(`https://dummyjson.com/users/${userId}/posts`);

        if (!res.ok) {
            //logging could be done here
            throw ApiError.fromError(res.status, fetchFailedMessage);
        }

        const data: Posts = await res.json();
        return data.posts;

    } catch {
        //catching all errors, we don't want to show all internal error-messages to client so providing general error to client
        return ApiError.fromError(500, "Network error occurred.");
    }        
};

export const fetchUserById = async (userId: number): Promise<User | ApiError > => {
    try {
        const res = await fetch(`https://dummyjson.com/users/${userId}`);

        if (res.status == 404)
            return ApiError.fromError(404);

        if (!res.ok) {
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