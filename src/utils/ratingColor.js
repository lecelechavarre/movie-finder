export function ratingColor(score) {
  if (score >= 7) return 'bg-emerald-500 text-emerald-950';
  if (score >= 5) return 'bg-amber-400 text-slate-950';
  return 'bg-rose-500 text-white';
}
