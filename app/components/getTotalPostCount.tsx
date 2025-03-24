import React, { useEffect, useState } from "react";
import { getTotalPostsCount } from "../actions";

const TotalPosts: React.FC = () => {
    const [totalPosts, setTotalPosts] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTotalPosts = async () => {
            try {
                const count = await getTotalPostsCount();
                setTotalPosts(count);
            } catch {
                setError("Failed to fetch the total number of posts.");
            }
        };

        fetchTotalPosts();
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div>
            <h2>Total Posts: {totalPosts}</h2>
        </div>
    );
};

export default TotalPosts;