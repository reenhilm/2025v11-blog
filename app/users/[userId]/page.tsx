"use server"
import { fetchPostsByUserId, fetchUserById } from "@/app/actions";
import UserPostsResult from "./user-posts-result";
import { notFound } from "next/navigation";
import ApiError from "@/classes/api-error";
import ErrorDialog from "@/app/components/error-dialog";

export default async function PostPage({ params }: { params: Promise<{ userId: number }> }) {
    const { userId } = await params;

    //Fetch both API calls in parallel
    const [userResult, postsResult] = await Promise.all([
        fetchUserById(userId),
        fetchPostsByUserId(userId),
    ]);

    if (userResult instanceof ApiError) {
        if (userResult.show404) {
            return notFound();
        }
        return <ErrorDialog message={userResult.message} />;
    }

    if (postsResult instanceof ApiError) {
        return <ErrorDialog message={postsResult.message} />;
    }

    //Both calls succeeded
    return <UserPostsResult posts={postsResult} user={userResult} />;
}
