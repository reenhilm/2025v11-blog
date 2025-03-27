import SearchResultList from "./search-result-list";
import { fetchTopViewedPosts } from "./actions";
import SearchInputSection from "./components/search-input-section";
import ApiError from "@/classes/api-error";

export default async function HomeContent() {
  let posts = await fetchTopViewedPosts(5);

  if (posts instanceof ApiError) {
    posts = [];
  }
  
  return (
    <main className="flex flex-col m-auto p-4 mt-5 items-center max-w-120 theme-set-values_ordinary">
      <SearchInputSection />
      <h1 className="text-3xl theme-set-values_ordinary">Most viewed posts</h1>
      <SearchResultList posts={posts} />
    </main>
  )
}