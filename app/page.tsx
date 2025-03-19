import SearchResultList from "./search-result-list";
import { fetchTopViewedPosts } from "./actions";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import SearchInputSection from "./components/search-input-section";

export default async function Home() {
  const posts = fetchTopViewedPosts(5);

  return (
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
    >
      <main className="flex flex-col m-auto items-center max-w-120 theme-set-values_ordinary">
        <ModeToggle />
        <SearchInputSection />
      <h1 className="text-3xl theme-set-values_ordinary">Most viewed posts</h1>
        <SearchResultList posts={posts} />
      </main>
    </ThemeProvider>
  )
}
