import Filters from "@/components/Filters";
import QuestionList from "@/components/QuestionList";
import Search from "@/components/Search";
import ISearch from "@/types/Search";
import { Suspense } from "react";
import { loadSearchParams, serialize } from "./searchParams";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<ISearch>
}) {
  const search = await loadSearchParams(searchParams)
  const queryString = serialize(search)

  return (
    <div className={`
      flex min-h-screen items-center justify-center
      bg-zinc-50 font-sans dark:bg-gray-950
    `}>
      <main className={`
        flex min-h-screen w-full max-w-5xl flex-col items-center
        bg-white dark:bg-gray-900
        py-8 px-4
        sm:py-32 sm:px-16 sm:items-start 
      `}>
        <Search />
        <Filters />
        <Suspense fallback={<div>Loading...</div>}>
          <QuestionList search={queryString} />
        </Suspense>
      </main>
    </div>
  );
}
