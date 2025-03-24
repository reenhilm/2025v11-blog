"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInputSection() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex my-4 border-1 rounded theme-set-values_ordinary">
            <input
                className="indent-4 px-2 py-1 theme-set-values_ordinary theme-set-values_ordinary"
                type="text"
                name="query"
                aria-labelledby="Search Query"
                id="query"
                required
                placeholder="Search for..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded theme-set_redirect-element-field"
            >
                Search
            </button>
        </form>
    )
}
