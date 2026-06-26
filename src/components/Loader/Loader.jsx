export default function Loader({ message = 'Loading movies...' }) {
  return (
    <div className="grid min-h-[55vh] place-items-center px-4 text-center text-slate-200">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-700 border-t-primary" />
        <p className="max-w-lg text-sm text-slate-300">{message}</p>
      </div>
    </div>
  );
}
