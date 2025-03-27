"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { getSearchPosts } from '../actions';
import { Post } from '@/interfaces/posts';
import SearchUI from './search-ui';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function Searching() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query');
  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order');
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortingBy, setSortingBy] = useState(sortParam || "");
  const [order, setOrder] = useState(orderParam || "");
  const [sortedResults, setSortedResults] = useState<Post[]>([]);

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

  const handleClick = () => {
    
      router.push(`/search?query=${query}`);
      setQuery(query);
  }

  const handleSortingChange = (value: string) => {
    setSortingBy(value);
  }
  const handleOrderChange = (value: string) => {
    setOrder(value);
  }
  const sortPosts = useCallback((a: Post, b: Post) => {
    if (sortingBy === "titles" && order === "Descending") {
      return (b.title).localeCompare(a.title);
    } else if (sortingBy === "titles" && order === "Ascending") {
      return (a.title).localeCompare(b.title);
    } else if (sortingBy === "views" && order === "Descending") {
      return (b.views) - (a.views);
    } else if (sortingBy === "views" && order === "Ascending") {
      return (a.views) - (b.views);
    } else if (sortingBy === "likes" && order === "Descending") {
      return (b.reactions.likes) - (a.reactions.likes);
    } else if (sortingBy === "likes" && order === "Ascending") {
      return (a.reactions.likes) - (b.reactions.likes);
    }
    return 0;

  }, [sortingBy, order]);

  useEffect(() => {
    const sorted = results.sort(sortPosts);
    setSortedResults(sorted);
    if (sortingBy && order) {
      router.push(`/search?query=${query}&sort=${sortingBy}&order=${order}`);
    }
  }, [results, sortPosts, router, sortingBy, order, query]);

 return (
    <main>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (query.trim() === '') {
          setError('The search-query can\'t be empty');
          setResults([]);
          return;
        }
        if (query.length < 3) {
          setError('The search-query must be at least 3 characters long');
          setResults([]);
          return;
        }
        handleSearch(query);
        handleClick();
      }} className="flex gap-2 my-4">
        <input
          className="flex-1 border p-2 rounded theme-placeholder-neutral-colored theme-border-text-colored theme-text-colored"
          type="text"
          placeholder="Search for..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded theme-secondary-colored">Search</button>
      </form>
      <section className="flex flex-col items-center">

        {loading && !error && <p>Loading...</p>}
        {!loading && !error && results.length === 0 && <p>Search for something</p>}
        {error && <p className="text-red-500">{error}</p>}
        {results.length > 3 && query.length >= 3 && (
          <section>
            <h2 className="text-2xl font-bold mt-10 text-center">Search Results</h2>
            <div className="flex justify-between mb-5 mt-25">
              <RadioGroup defaultValue={orderParam || ""} className="flex items-center space-x-2 pr-5"
                onValueChange={handleOrderChange} >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Ascending" id="r1" />
                  <Label htmlFor="r1">Ascending</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Descending" id="r2" />
                  <Label htmlFor="r2">Descending</Label>
                </div>
              </RadioGroup>
              <Select defaultValue={sortParam || ""} onValueChange={handleSortingChange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="titles">Titles</SelectItem>
                    <SelectItem value="views">Views</SelectItem>
                    <SelectItem value="likes">Likes</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {sortedResults ? <SearchUI results={sortedResults} /> : <SearchUI results={results} />}
          </section>
        )}
      </section>
    </main>
  );
}

