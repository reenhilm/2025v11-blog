import SearchResult from "@/app/components/search-result";
import { Post } from "@/interfaces/posts";
import { User } from "@/interfaces/user";
import { use } from "react";

export default function UserPostsResult({ posts, user }: { posts: Promise<Post[]>, user: User }) {
    const postsUsed: Post[] = use(posts);

    return (
        <main className="m-auto max-w-120 my-13">
            <h2 className="text-xl mx-2">Posts by user {user.username || 'Unknown user'}</h2>
            {postsUsed.map((post, index) => <SearchResult key={index} post={post} postDetails={false} />) }           
        </main>
    )
}