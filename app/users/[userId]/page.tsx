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
    const posts:Promise<Post[]> = fetchPostsByUserId(userId);
    const result: User | ApiError = await fetchUserById(userId);

    if (result instanceof ApiError) {
        if (result.show404) {
            return notFound();
        } else if (result.showCustom) {
            return (
                <ErrorDialog
                    message={result.message}
                />
            )
        }
    } else
    {    
        return (
            <UserPostsResult posts={posts} user={result} />
            );
    }
}
