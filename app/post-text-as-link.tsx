import Link from "next/link";

export default function PostTextAsLink({ id, title, body }: { id: number, title: string, body: string }) {
    return (
        <Link href={`/posts/${id}`} className="no-underline">
            <h2 className="text-xl mx-2">{title}</h2>
            <p className="mx-1  line-clamp-2">{body}</p>
        </Link>
    )
}