// components/Footer.tsx
export default function Footer() {
    return (
      <footer className="bg-slate-800 text-white dark:bg-slate-900">
        <div className="container mx-auto px-4 py-8 text-center">
          <p>&copy; {new Date().getFullYear()} battplus. All rights reserved.</p>
        </div>
      </footer>
    );
  }