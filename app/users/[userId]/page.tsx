import { Suspense } from "react";
import PostsByUsersContent from "./posts-by-users-content";

export default function PostPage({ params }: { params: Promise<{ userId: number }> }) {
    return (
        <Suspense fallback={<p className="text-gray-500 text-center">Loading...</p>}>
            <PostsByUsersContent params={params} />
        </Suspense>
    );
}