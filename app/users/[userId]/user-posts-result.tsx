import SearchResult from "@/app/components/search-result";
import { Post } from "@/interfaces/posts";
import { use } from "react";

export default function UserPostsResult({ post }: { post: Promise<Post[]> }) {
    const postsUsed: Post[] = use(post);
    return (
        <main className="m-auto max-w-120 my-13">
            {postsUsed.map((post, index) => <SearchResult key={index} post={post} postDetails={false} />) }           
        </main>
    )
}