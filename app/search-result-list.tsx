"use client";
import { Post } from "@/interfaces/posts";
import SearchResult from "./components/search-result";
import { use } from "react";

export default function SearchResultList({ posts }: { posts: Promise<Post[]> }) {
    const postList: Post[] = use(posts);    

    return (
        <>
            {postList.map((post: Post, index) => <SearchResult key={index} post={post} postDetails={false} />)}        
        </>
    )
}