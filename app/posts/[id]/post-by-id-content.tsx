"use server"
import { fetchPost } from "@/app/actions";
import ErrorDialog from "@/app/components/error-dialog";
import PostResult from "@/app/posts/[id]/post-result";
import ApiError from "@/classes/api-error";
import { notFound } from "next/navigation";

export default async function PostPage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const post = await fetchPost(id);

    if (post instanceof ApiError) {
        if (post.show404) {
            return notFound();
        }
        return <ErrorDialog message={post.message} />;
    }

    return <PostResult post={post} />;
}



