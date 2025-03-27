"use client"
import React, { useEffect, useState } from "react";
import { getProlificPosters } from "../actions";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import Link from 'next/link';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ProlificPoster {
    userId: number;
    username: string;
    count: number;
    age: number;
}

const Posters: React.FC = () => {
    const [posters, setPosters] = useState<ProlificPoster[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosters = async () => {
            try {
                const data = await getProlificPosters();
                setPosters(data.filter((poster): poster is ProlificPoster => 
                    typeof poster.age === 'number'));
            } catch {
                setError("Failed to fetch prolific posters.");
            }
        };

        console.log(fetchPosters)
        fetchPosters();
    }, []);

    if (error) {
        return <div className="text-red-400">{error}</div>;
    }

// Calculate age distribution
const ageDistribution = posters.reduce((acc: Record<string, number>, poster) => {
    const ageGroup =
        poster.age < 18
            ? "Under 18"
            : poster.age <= 25
            ? "18-25"
            : poster.age <= 35
            ? "26-35"
            : poster.age <= 45
            ? "36-45"
            : "46+";
    acc[ageGroup] = (acc[ageGroup] || 0) + 1;
    return acc;
}, {});

// Prepare data for the chart
const chartData = {
    labels: Object.keys(ageDistribution).sort(),
    datasets: [
        {
            label: "Number of Posters",
            data: Object.values(ageDistribution),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
        },
    ],
};
const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Age Distribution of Prolific Posters",
        },
    },
};

return (
    <div>
        <div className="mt-10">
            <Bar data={chartData} options={chartOptions} />
        </div>
        <h1 className="text-3xl font-bold flex justify-between my-5">The Most Prolific Posters</h1>
        <ul>
            {posters.map((poster, index) => (
                <li key={poster.userId}>
                    <b>Name: </b>
                    <Link
                        className="hover:underline primarycolored theme-set_url-link"
                        key={index}
                        href={`/users/${poster.userId}`}
                    >{poster.username}</Link>
                    , <Link
                        className="hover:underline primarycolored theme-set_url-link"
                        key={'a' + index}
                        href={`/users/${poster.userId}`}
                    >Posts: {poster.count}</Link>, Age: {poster.age}
                </li>
            ))}
        </ul>

        {/* Bar Chart for Age Distribution */}
        
    </div>
);

};

export default Posters;