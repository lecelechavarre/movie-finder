import { useFavorites } from '../../context/FavoritesContext.jsx';

export default function Toast() {
  const { toast } = useFavorites();
  if (!toast) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 max-w-sm rounded-3xl border border-slate-700/80 bg-slate-950/95 px-5 py-4 text-sm text-slate-100 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
      <p>{toast}</p>
    </div>
  );
}
