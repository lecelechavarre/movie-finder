import { ratingColor } from '../../utils/ratingColor.js';

export default function RatingBadge({ score }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ratingColor(score)}`}>
      {score ? score.toFixed(1) : 'N/A'}
    </span>
  );
}
