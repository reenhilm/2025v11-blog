
import { Post } from "@/interfaces/posts";
import PostTextAsText from "../post-text-as-text";
import PostTextAsCard from "../post-text-as-card";

//This component is used in both SearchResultList and PostResult
export default function SearchResult({ post, postDetails }: { post: Post, postDetails: boolean }) {
    return (
        <article className="place-self-start flex flex-col my-3 w-full">
            {!postDetails ?
                <PostTextAsCard id={post.id} title={post.title} body={post.body} tags={post.tags} reactions={post.reactions}/>
                :
                <PostTextAsText title={post.title} body={post.body} tags={post.tags} reactions={post.reactions} userId={post.userId} />}
        </article>
    )
}
