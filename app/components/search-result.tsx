import Link from "next/link";
import { Post } from "@/interfaces/posts";
import PostTextAsLink from "../post-text-as-link";
import PostTextAsText from "../post-text-as-text";

//This component is used in both SearchResultList and PostResult
export default function SearchResult({ post, postDetails }: { post: Post, postDetails: boolean }) {
    return (
        <article className="place-self-start flex flex-col my-3 w-full">
            {!postDetails ?
                <PostTextAsLink id={post.id} title={post.title} body={post.body} />
                :
                <PostTextAsText title={post.title} body={post.body} />}
            <div className="flex justify-between mx-4 my-2">
                <div className="flex justify-between gap-1">
                    {post.tags.map((tag, index) => <Link className="hover:underline theme-accent-colored" key={index} href={`/posts/tag/${tag}`} >{tag}</Link>)}
                </div>
                <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                        <figure>🙂
                            <figcaption className="sr-only">Smiling smiley</figcaption>
                        </figure>
                        <p>{post.reactions.likes}</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <figure>🙁
                            <figcaption className="sr-only">Unhappy smiley</figcaption>
                        </figure>
                        <p>{post.reactions.dislikes}</p>
                    </div>
                </div>
                {!postDetails ? <Link href={`/posts/${post.id}`} className="hover:underline theme-accent-colored">read more</Link> : ''}
            </div>
            {postDetails ? <Link href={`/users/${post.userId}`} className="hover:underline place-self-center theme-accent-colored">more posts by this user</Link> : ''}
        </article>
    )
}
