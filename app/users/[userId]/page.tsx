"use server"
import { fetchPostsByUserId, fetchUserById } from "@/app/actions";
import UserPostsResult from "./user-posts-result";
import { Post } from "@/interfaces/posts";
import { User } from "@/interfaces/user";
import { notFound } from "next/navigation";
import ApiError from "@/classes/api-error";
import ErrorDialog from "@/app/components/error-dialog";

export default async function PostPage({ params }: { params: Promise<{ userId: number }> }) {
    const { userId } = await params;
    const postsResult: Post[] | ApiError = await fetchPostsByUserId(userId);
    const userResult: User | ApiError = await fetchUserById(userId);

    if (userResult instanceof ApiError) {
        if (userResult.show404) {
            return notFound();
        } else if (userResult.showCustom) {
            return (
                <ErrorDialog
                    message={userResult.message}
                />
            )
        }
    } else if (postsResult instanceof ApiError) {
        if (postsResult.showCustom) {
            return (
                <ErrorDialog
                    message={postsResult.message}
                />
            )
        }
    } else {    
        return (
            <UserPostsResult posts={postsResult} user={userResult} />
            );
    }
}
