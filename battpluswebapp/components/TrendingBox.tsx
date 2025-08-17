// components/TrendingBox.tsx
import Link from 'next/link';

// MOCK DATA - This will be replaced by a Sanity API call
const trendingArticles = [
  { slug: "tesla-grid-forming", title: "Tesla: 'We won't sell another battery in Australia that's not grid-forming'" },
  { slug: "fluence-biggest-deal", title: "Fluence lands its biggest deal globally for 2,000MWh BESS" },
  { slug: "arevon-california-bess", title: "Arevon Energy begins construction on 1,000MWh California BESS" },
];

export default function TrendingBox() {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Trending Now</h4>
      <ol className="space-y-4">
        {trendingArticles.map((article, index) => (
          <li key={article.slug} className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0">
            <span className="text-2xl font-bold text-teal-600 dark:text-teal-500">{index + 1}</span>
            <Link href={`/articles/${article.slug}`} className="font-semibold text-gray-800 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-500">
              {article.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}