"use client";
import { Post } from "@/interfaces/posts";
import SearchResult from "./components/search-result";

export default function SearchResultList({ posts }: { posts: Post[] }) {
    return (
        <>
            {posts.map((post: Post, index) => <SearchResult key={index} post={post} postDetails={false} />)}
        </>
    )
}