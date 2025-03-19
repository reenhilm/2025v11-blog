"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { getSearchPosts } from '../actions';
import { Post } from '@/interfaces/posts';
import Link from 'next/link';

export default function Searching() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query');
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = useCallback(async (query: string) => {
    setLoading(true);
    setError('');

    getSearchPosts(queryParam || query)
      .then((data) => setResults(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [queryParam]);

  useEffect(() => {
    if (queryParam) {
      setQuery(queryParam);
      handleSearch(queryParam);
    }
  }, [handleSearch, queryParam]);


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query) {
      setQuery(query);
      router.push(`/search?query=${query}`);
    }
  };

  return (
    <main>
<form onSubmit={(e) => {
        e.preventDefault();
        handleSearch(query);
      }} className="flex gap-2 my-4">
        <input
          className="flex-1 border p-2 rounded"
          type="text"
          placeholder="Search for..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>
      </form>
      <section className="flex flex-col items-center">

        {loading && <p>Loading...</p>}
        {!loading && results.length === 0 && <p>No results found</p>}
        {error && <p className="text-red-500">{error}</p>}
        {results.length > 3 && (
          <section>
            <h2 className="text-2xl font-bold mt-10 text-center">Search Results</h2>
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
                  <Link href={`/posts/${post.id}`}><h2 className="cursor-pointer underline text-blue-700">{post.title}</h2></Link>
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

