"use server"
import { fetchPostsById, fetchUserById } from "@/app/actions";
import UserPostsResult from "./user-posts-result";
import { Post } from "@/interfaces/posts";
import { User } from "@/interfaces/user";
import { notFound } from "next/navigation";

export default async function PostPage({ params }: { params: Promise<{ userId: number }> }) {
    const { userId } = await params;
    const posts:Promise<Post[]> = fetchPostsById(userId);
    const user: User | null = await fetchUserById(userId);
    if (user === null)
        return notFound();
    
    return (
        <UserPostsResult posts={posts} user={user} />
    );
}
