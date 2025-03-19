"use client"
import React, { useEffect, useState } from "react";
import { getProlificPosters } from "../actions";

interface ProlificPoster {
    userId: number;
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
            } catch (err) {
                setError("Failed to fetch prolific posters.");
            }
        };

        fetchPosters();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Most Prolific Posters</h2>
            <ul>
                {posters.map((poster) => (
                    <li key={poster.userId}>
                        User ID: {poster.userId}, Posts: {poster.count}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posters;