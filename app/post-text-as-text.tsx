export default function PostTextAsText({ title, body }: { title: string, body: string }) {
    return (
        <section>
            <h2 className="text-xl mx-2">{title}</h2>
            <p className="mx-1">{body}</p>
        </section>
    )
}