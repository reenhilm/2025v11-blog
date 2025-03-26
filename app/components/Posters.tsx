"use client"
import React, { useEffect, useState } from "react";
import { getProlificPosters } from "../actions";

interface ProlificPoster {
    userId: number;
    username: string;
    count: number;
}

const Posters: React.FC = () => {
    const [posters, setPosters] = useState<ProlificPoster[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosters = async () => {
            try {
                const data = await getProlificPosters();
                setPosters(data);
            } catch {
                setError("Failed to fetch prolific posters.");
            }
        };

        fetchPosters();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    //Modified to include name and count.
    return (
        <div>
            <h1 className="text-3xl font-bold flex justify-between my-5">The Most Prolific Posters</h1>
            <ul>
                {posters.map((poster) => (
                    <li key={poster.userId}>
                        Name: {poster.username}, Posts: {poster.count}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posters;