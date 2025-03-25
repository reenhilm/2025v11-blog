import { Suspense } from "react";
import PostByIdContent from "./post-by-id-content";

export default async function PostPage({ params }: { params: Promise<{ id: number }> }) {
    return (
        <Suspense fallback={<p className="text-gray-500 text-center">Loading...</p>}>
            <PostByIdContent params={params} />
        </Suspense>
    );
}