import SearchResult from "@/app/components/search-result";
import { Post } from "@/interfaces/posts";
import { User } from "@/interfaces/user";

export default function UserPostsResult({ posts, user }: { posts: Post[], user: User }) {
    return (
        <main className="m-auto max-w-120 my-13">
            <h2 className="text-xl mx-2">Posts by user {user.username || 'Unknown user'}</h2>
            {posts.length === 0 ? <section className="flex"><p className="m-auto my-10">No posts found</p></section> : ''}
            {posts.map((post, index) => <SearchResult key={index} post={post} postDetails={false} />) }
        </main>
    )
}