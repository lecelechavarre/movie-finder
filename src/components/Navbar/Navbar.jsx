import { Link, NavLink } from 'react-router-dom';
import { FaFilm, FaHeart, FaSearch } from 'react-icons/fa';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Search', to: '/search' },
  { label: 'Favorites', to: '/favorites' }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-xl font-semibold tracking-wide text-white">
          <FaFilm className="h-6 w-6 text-primary" />
          <span>Movie Finder</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-primary text-slate-950' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/search"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-slate-950 shadow-glow transition hover:-translate-y-0.5 hover:bg-red-600"
        >
          <FaSearch /> Search
        </Link>
      </div>
    </header>
  );
}
