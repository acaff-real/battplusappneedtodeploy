// components/ArticleCard.tsx
import Image from 'next/image';
import Link from 'next/link';
// 1. Import the urlForImage helper and the Sanity Image type
import { urlForImage } from '@/sanity/image';
import type { Image as SanityImage } from 'sanity';

// 2. Update the 'shape' of the props
type Props = {
  title: string;
  slug: string;
  mainImage: SanityImage; // Use the SanityImage type for the image object
  publishedAt: string;
};

export default function ArticleCard({ title, slug, mainImage, publishedAt }: Props) {
  return (
    <article className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/articles/${slug}`} className="block group">
        <div className="overflow-hidden">
          {/* 3. Use the 'mainImage' and 'title' props directly */}
          <Image
            src={urlForImage(mainImage).url()}
            alt={title}
            width={600} // Adjusted for a more standard card size
            height={400}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-500">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
            {new Date(publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </Link>
    </article>
  );
}