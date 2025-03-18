"use client"

import { getByTag } from '@/app/actions';
import SearchResult from '@/app/components/search-result';
import { Post } from '@/interfaces/posts';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'


export default function TagPage() {
    const { tag } = useParams();
    console.log(tag);
    if (Array.isArray(tag)) {
        console.log(tag.lastIndexOf('/'));
    }


    const [tagPosts, setTagPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        if (tag) {
            setLoading(true);
            const tagString = Array.isArray(tag) ? tag[0] : tag;
            getByTag(tagString)
                .then((data) => {
                    setTagPosts(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                })
        }
    }, [tag]);



    return (
        <main className="flex flex-col m-auto items-center max-w-120">
            {error && <p className='text-2xl text-red-500'>Error: {error}</p>}
            {loading ? (<p className='text-3xl text-center font-bold my-15'>Loading...</p>) : (
                <section>
                    {tag && typeof tag === 'string' && (
                        <h1 className="text-3xl text-center font-bold my-15">Posts With Tag &quot;{tag.charAt(0).toUpperCase() + tag.slice(1)}&quot;</h1>
                    )}
                    {tagPosts.map((post: Post, index) => <SearchResult key={index} post={post} postDetails={false} />)}
                </section>
            )}
        </main>
    )
}

