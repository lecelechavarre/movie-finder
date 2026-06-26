export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-6">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="rounded-full border border-slate-700/80 bg-slate-900/90 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-sm text-slate-300">
        Page {page} of {totalPages || 1}
      </span>
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={totalPages && page >= totalPages}
        className="rounded-full border border-slate-700/80 bg-slate-900/90 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
