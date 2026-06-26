import { Link } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout.jsx';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="grid min-h-[60vh] place-items-center px-4 text-center">
        <div className="max-w-xl rounded-[2rem] border border-slate-800/90 bg-slate-950/90 p-12 shadow-glow">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">404</p>
          <h1 className="mt-4 text-5xl font-semibold text-white">Page not found</h1>
          <p className="mt-4 text-slate-300">The page you were looking for does not exist or has been moved.</p>
          <Link to="/" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-red-600">
            Go home
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
