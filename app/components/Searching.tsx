"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { getSearchPosts } from '../actions';
import { post } from '@/interface';
import Link from 'next/link';

export default function Searching() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const [results, setResults] = useState<post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (results.length > 3) {
      router.push(`/search?query=${query}`);
    }
  }, [results, query, router]);
  const handleSearch = async () => {
    setLoading(true);
    setError('');

    getSearchPosts(query)
      .then((data) => setResults(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <main>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }} className="flex gap-2 my-4">
        <input
          className="flex-1 border p-2 rounded"
          type="text"
          placeholder="Search for..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>
      </form>
      <section className="flex flex-col items-center">
        
        {loading && <p>Loading...</p>}
        {!loading && results.length === 3 && <p>No results found</p>}
        {error && <p className="text-red-500">{error}</p>}
        {results.length > 3 && (
          <section>
          <h2 className="text-2xl font-bold mt-10 text-center">Search Results for &quot;{query.charAt(0).toUpperCase() + query.slice(1)}&quot;</h2>
          <ul className="flex flex-col gap-2 h-100 w-100 border-2 rounded-md mt-30 
          max-h-100 overflow-y-auto
          [&::-webkit-scrollbar]:w-4
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            {results.map((post) => (
              <li key={post.id} className="flex flex-col gap-2 p-2">
                <Link href={`/post/${post.id}`}><h2 className="cursor-pointer underline text-blue-700">{post.title}</h2></Link>
                <h3>{post.views} views</h3>
              </li>
            ))}
          </ul>
          </section>
        )}
      </section>
    </main>
  );
}

