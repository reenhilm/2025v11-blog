import SearchResult from "@/app/components/search-result";
import { Post } from "@/interfaces/posts";

export default function PostResult({ post }: { post: Post }) {

    return (
        <main className="m-auto max-w-120 my-13">
            <SearchResult post={post} postDetails={true} />
        </main>
    )
}
