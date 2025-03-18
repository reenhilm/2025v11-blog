import SearchResultList from "./search-result-list";
import { fetchTopViewedPosts } from "./actions";
import Contacts from "./components/Contacts"; // Import the Contacts component

export default async function Home() {
  const posts = fetchTopViewedPosts(5);
  
  return (
    <main className="flex flex-col m-auto items-center max-w-120">
      <section className="flex my-4 border-1 rounded">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>
        <input className="indent-4" type="text" name="query" aria-labelledby="Search Query" id="query" required placeholder="Search for..." />
      </section>
      <h1 className="text-3xl">Most viewed posts</h1>
      <SearchResultList posts={posts} />
   
 {/* Add the Contacts component at the bottom */}
 <footer className="mt-10 w-full bg-gray-100 p-4">
 <Contacts />
</footer>

</main>
  );
}
