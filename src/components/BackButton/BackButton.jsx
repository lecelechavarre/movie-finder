import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/95 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
    >
      <FaChevronLeft className="h-4 w-4" /> Back
    </button>
  );
}
