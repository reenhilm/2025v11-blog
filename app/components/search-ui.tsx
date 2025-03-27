import { Post } from '@/interfaces/posts'
import Link from 'next/link'
import React from 'react'

interface SearchUIProps {
    results: Post[];
}
export default function SearchUI({ results }: SearchUIProps) {
    return (
        <div>
            <ul className="flex flex-col gap-2 h-100 w-100 border-2 rounded-md mt-5 
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
                        <Link href={`/posts/${post.id}`}><h2 className="cursor-pointer underline text-blue-700 theme-accent-colored">{post.title}</h2></Link>
                        <h3>{post.views} views</h3>
                    </li>
                ))}
            </ul>
        </div>
    )
}

