import { Suspense } from "react";
import HomeContent from "./home-content";

export default function Home() {
  return (
    <Suspense fallback={<p className="text-gray-500 text-center">Loading...</p>}>
      <HomeContent />
    </Suspense>
  );
}