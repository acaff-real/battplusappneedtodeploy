// components/Sidebar.tsx
import NewsletterBox from "./NewsletterBox";
import TrendingBox from "./TrendingBox";

export default function Sidebar() {
  return (
    <aside className="space-y-8">
      <NewsletterBox />
      <TrendingBox />
    </aside>
  );
}