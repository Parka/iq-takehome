import Filters from "@/components/Filters";
import QuestionList from "@/components/QuestionList";
import ISearch from "@/types/Search";
import { searchParamsNextToNative } from "@/utils/searchParams";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<ISearch>
}) {
  const search = searchParamsNextToNative(await searchParams)

  return (
    <div className={`
      flex min-h-screen items-center justify-center
      bg-zinc-50 font-sans dark:bg-gray-950
    `}>
      <main className={`
        flex min-h-screen w-full max-w-5xl flex-col items-center space-y-6
        py-32 px-16 bg-white dark:bg-gray-900 sm:items-start
      `}>
        <Filters search={search} />
        <QuestionList search={search} />
      </main>
    </div>
  );
}
