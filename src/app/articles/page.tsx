// src/app/articles/page.tsx
import { AllArticlesPage } from "@/components/articles/all-articles-page";
import ArticleSearchInput from "@/components/articles/article-search-input";
import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
import { fetchArticleByQuery } from "@/lib/query/fetch-articles";
import Link from "next/link";

const ITEMS_PER_PAGE = 3;

// function AllArticlesPageSkeleton() {
//   return (
//     <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//       {Array.from({ length: 3 }).map((_, index) => (
//         <Card
//           key={index}
//           className="group relative overflow-hidden transition-all hover:shadow-lg"
//         >
//           <div className="p-6">
//             <Skeleton className="mb-4 h-48 w-full rounded-xl" />
//             <Skeleton className="h-6 w-3/4 rounded-lg" />
//             <Skeleton className="mt-2 h-4 w-1/2 rounded-lg" />
//             <div className="mt-6 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <Skeleton className="h-8 w-8 rounded-full" />
//                 <Skeleton className="h-4 w-20 rounded-lg " />
//               </div>
//               <Skeleton className="h-4 w-24 rounded-lg " />
//             </div>
//           </div>
//         </Card>
//       ))}
//     </div>
//   );
// }

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const sParams = await searchParams;
  const { search, page } = sParams;
  const searchText = search || "";
  const currentPage = Number(page) || 1;

  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;

  const { articles, total } = await fetchArticleByQuery(searchText, skip, take);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full mx-auto">
          <Link href={"/"} className="mt-6 inline-block">
            <Button
              variant="outline"
              className="rounded-full px-8 py-6 text-lg"
            >
              Home
            </Button>
          </Link>
        </div>

        <div className="mb-12 space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            All Articles
          </h1>

          <ArticleSearchInput />
        </div>

        <AllArticlesPage articles={articles} />

        <div className="mt-12 flex justify-center gap-2">
          {/* Pagination */}
          <Link href={`?search=${searchText}&page=${currentPage - 1}`} passHref>
            <Button variant="ghost" size="sm" disabled={currentPage === 1}>
              ← Prev
            </Button>
          </Link>

          {Array.from({ length: totalPages }).map((_, index) => (
            <Link
              key={index}
              href={`?search=${searchText}&page=${index + 1}`}
              passHref
            >
              <Button
                variant={currentPage === index + 1 ? "destructive" : "ghost"}
                size="sm"
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </Button>
            </Link>
          ))}

          <Link href={`?search=${searchText}&page=${currentPage + 1}`} passHref>
            <Button
              variant="ghost"
              size="sm"
              disabled={currentPage === totalPages}
            >
              Next →
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
