import React, { Suspense } from 'react'
import Searching from '../components/Searching';

export default function Search() {
  return (
    <main>
      <section className="max-w-lg mx-auto p-4 mt-5">
          <Suspense fallback={<div>Loading...</div>}>
            <Searching />
          </Suspense>
        </section>
    </main>
  )
}


 
