export default function GenreTag({ label }) {
  return (
    <span className="rounded-full border border-slate-700/90 bg-slate-900/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-300">
      {label}
    </span>
  );
}
