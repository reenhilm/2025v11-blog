import SearchResultList from "./search-result-list";
import { fetchTopViewedPosts } from "./actions";

export default async function Home() {
  const posts = fetchTopViewedPosts(5);

  return (
    <main className="flex flex-col m-auto items-center max-w-120 theme-set-values_ordinary">
      <div className="grid grid-cols-(--layout-grid-cols) theme-set-values_ordinary">
          <section className="flex my-4 border-1 rounded 
          theme-set-values_ordinary">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded theme-set_search-buton">Search</button>
            <input className="indent-4 theme-set-values_ordinary theme-set-values_ordinary" type="text" name="query" aria-labelledby="Search Query" id="query" required placeholder="Search for..." />
          </section>
          <h1 className="text-3xl theme-set-values_ordinary">Most viewed posts</h1>
          <SearchResultList posts={posts} />
      </div>
    </main>
  )
}
