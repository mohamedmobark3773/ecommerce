import { Star } from "lucide-react";

export function StarRating({
  rating,
  count,
  size = "sm",
}: {
  rating: number;
  count?: number;
  size?: "sm" | "md";
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`${size === "sm" ? "w-3.5 h-3.5" : "w-4.5 h-4.5"} ${
              i <= Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground font-medium">{rating}</span>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">
          ({count.toLocaleString("ar-EG")})
        </span>
      )}
    </div>
  );
}
