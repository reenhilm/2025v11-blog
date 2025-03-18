import SearchResult from "@/app/components/search-result";
import { Post } from "@/interfaces/posts";
import { use } from "react";

export default function PostResult({ post }: { post: Promise<Post> }) {
    const postUsed: Post = use(post);
    return (
        <main className="m-auto max-w-120 my-13">
            <SearchResult post={postUsed} postDetails={true} />
        </main>
    )
}
