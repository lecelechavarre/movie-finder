export default function ErrorMessage({ title = 'Something went wrong', message, actionText, onAction }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4 rounded-3xl border border-emerald-500/20 bg-slate-900/95 p-8 text-center shadow-lg shadow-slate-950/20">
      <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Oops</p>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      {message && <p className="max-w-xl text-slate-300">{message}</p>}
      {onAction && (
        <button
          onClick={onAction}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-red-600"
        >
          {actionText || 'Try again'}
        </button>
      )}
    </div>
  );
}
