import Link from "next/link";
import { Post } from "@/interfaces/posts";

export default function SearchResult({ post }: { post: Post }) {
    return (
        <article className="place-self-start my-3 w-full">
            <Link href={`/posts/${post.id}`} className="no-underline">
                <h2 className="text-xl mx-2">{post.title}</h2>
                <p className="mx-1">{post.body}</p>
            </Link>
            <div className="flex justify-between mx-4 my-2">
                <div className="flex justify-between gap-1">
                    {post.tags.map((tag, index) => <Link className="hover:underline primarycolored" key={index} href={`/posts/tag/${tag}`} >{tag}</Link>)}
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
                <Link href={`/posts/${post.id}`} className="hover:underline primarycolored">read more</Link>
            </div>
        </article>
    )
}
