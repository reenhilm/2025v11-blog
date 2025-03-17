"use server"
import { fetchPost } from "@/app/actions";
import PostResult from "@/app/posts/[id]/post-result";

export default async function PostPage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const post = fetchPost(id);
    
    return (
        <PostResult post={post} />
    );
}
