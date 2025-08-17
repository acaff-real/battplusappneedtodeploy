// app/articles/[slug]/page.tsx
import Sidebar from "@/components/SideBar";
import Image from "next/image";
import { groq } from 'next-sanity';
import { client } from '@/sanity/client';
import { urlForImage } from "@/sanity/image"; 
import { PortableText } from '@portabletext/react';

export async function generateStaticParams() {
  const query = groq`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`;
  const slugs: { slug: string }[] = await client.fetch(query);
  
  // Map the array of objects to an array of objects with the 'slug' key
  return slugs.map((item) => ({
    slug: item.slug,  
  }));
}

// MOCK DATA and FUNCTION

async function getArticleData(slug: string) {
  const query = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    mainImage,
    publishedAt,
    "author": author->name, // Assumes you have an author reference
    body
  }`;

  const article = await client.fetch(query, { slug });
  return article;
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleData(params.slug);

  return (
    <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Main Article Content */}
      <div className="lg:col-span-2">
        <article className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <header>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {article.title}
            </h1>
            <div className="text-sm text-gray-500 mt-4 dark:text-gray-400">
              {/* Display author if it exists */}
              {article.author && <span>By {article.author} | </span>}
              <span>
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
            </div>
          </header>

          <div className="my-8 border-t border-gray-200 dark:border-gray-700"></div>
          
          {/* Use urlForImage for the Sanity image object */}
          <Image 
            src={urlForImage(article.mainImage).url()} 
            alt={article.title} 
            width={1200} 
            height={600}
            className="w-full rounded-lg mb-8"
          />

          {/* Use the PortableText component to render the body */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <PortableText value={article.body} />
          </div>
        </article>
      </div>

      {/* Sidebar */}
      <aside>
        <Sidebar />
      </aside>
    </div>
  );
}