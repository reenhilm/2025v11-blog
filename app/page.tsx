import SearchResultList from "./search-result-list";
import { fetchTopViewedPosts } from "./actions";
import SearchInputSection from "./components/search-input-section";

export default async function Home() {
  const posts = fetchTopViewedPosts(5);

  return (
      <main className="flex flex-col m-auto items-center max-w-120 theme-set-values_ordinary">
        <SearchInputSection />
      <h1 className="text-3xl theme-set-values_ordinary">Most viewed posts</h1>
        <SearchResultList posts={posts} />
      </main>
  )
}
