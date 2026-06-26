export default function Footer() {
  return (
    <footer className="border-t border-slate-800/70 bg-slate-950/80 py-6 text-center text-sm text-slate-400 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p>Movie Finder © {new Date().getFullYear()}. Built with React, Tailwind CSS and TMDB.</p>
      </div>
    </footer>
  );
}
