import { Reactions } from "@/interfaces/posts";
import Link from "next/link";

export default function PostTextAsText({ title, body,tags,reactions,userId }: { title: string, body: string,tags:string[],reactions:Reactions, userId: number }) {
    return (
        <main>
        <section>
            <h2 className="text-xl mx-2 text-center font-semibold mb-5">{title}</h2>
            <p className="mx-1">{body}</p>
        </section>
        <div className="flex justify-between mx-4 my-2">
                <div className="flex justify-between gap-1 items-center">
                    {tags.map((tag, index) => <Link className="hover:underline theme-accent-colored mr-2" key={index} href={`/posts/tag/${tag}`} >{tag}</Link>)}
                </div>
                <div className="flex gap-3  mt-5">
                    <div className="flex flex-col items-center theme-set-inherit_all">
                        <figure>🙂
                            <figcaption className="sr-only">Smiling smiley</figcaption>
                        </figure>
                        <p>{reactions.likes}</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <figure>🙁
                            <figcaption className="sr-only">Unhappy smiley</figcaption>
                        </figure>
                        <p>{reactions.dislikes}</p>
                    </div>
                </div>
                <Link href={`/users/${userId}`} className="hover:underline place-self-center theme-accent-colored">more posts by this user</Link>
            </div>
        </main>
    )
}