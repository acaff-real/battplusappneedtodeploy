// app/page.tsx
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/SideBar";
// 1. Import the Sanity client and GROQ
import { client } from "@/sanity/client";
import { groq } from "next-sanity";

// 2. Define the type for our article data from Sanity
interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any; // Or a more specific type for Sanity images
  publishedAt: string;
}

// 3. Create an async function to fetch the data
async function getArticles() {
  // The GROQ query fetches all documents of type "post" and orders them by date
  const query = groq`*[_type == "post"] | order(publishedAt desc)`;
  const articles: Article[] = await client.fetch(query);
  return articles;
}


// 4. Make the component async and call the fetch function
export default async function HomePage() {
  const articles = await getArticles();

  return (
    <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Main Content Area */}
      <div className="lg:col-span-2">
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Grid Scale</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 5. Update the map function to use the new data structure */}
            {articles.slice(0, 3).map((article) => (
              <ArticleCard
                key={article._id}
                title={article.title}
                slug={article.slug.current} // Note: slug is now an object
                mainImage={article.mainImage} // Note: property name change
                publishedAt={article.publishedAt}
              />
            ))}
          </div>
        </section>
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Distributed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.slice(3).map((article) => (
              <ArticleCard
                key={article._id}
                title={article.title}
                slug={article.slug.current}
                mainImage={article.mainImage}
                publishedAt={article.publishedAt}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Sidebar */}
      <aside>
        <Sidebar />
      </aside>
    </div>
  );
}