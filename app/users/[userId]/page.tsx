"use server"
import { fetchPostById } from "@/app/actions";
import UserPostsResult from "./user-posts-result";

export default async function PostPage({ params }: { params: Promise<{ userId: number }> }) {
    const { userId } = await params;
    const post = fetchPostById(userId);
    return (
        <UserPostsResult post={post} />
    );
}
