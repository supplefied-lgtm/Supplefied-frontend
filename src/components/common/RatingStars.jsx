import { Star, StarHalf } from 'lucide-react';

export default function RatingStars({ rating = 5, count, size = "sm" }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.4;
  const iconSize = size === "lg" ? "w-5 h-5" : size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-amber-400">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <Star key={i} className={`${iconSize} fill-amber-400 text-amber-400`} />;
          }
          if (i === fullStars && hasHalf) {
            return <StarHalf key={i} className={`${iconSize} fill-amber-400 text-amber-400`} />;
          }
          return <Star key={i} className={`${iconSize} text-slate-300`} />;
        })}
      </div>
      <span className="text-xs font-bold text-slate-800">{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-xs text-slate-500 font-medium">({count})</span>
      )}
    </div>
  );
}
