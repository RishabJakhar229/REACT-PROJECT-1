import { Link } from "react-router";
import { ArrowUpRight, Clock, Star } from "./Icons";

/**
 * Collection card — a small poster: the dish fills the frame, the caption
 * is set over the ink wash at the bottom.
 */
function RecipeCard({ recipe, index = 0 }) {
  const {
    id,
    prepTimeMinutes,
    cookTimeMinutes,
    image,
    name,
    cuisine,
    difficulty,
    rating,
    mealType,
  } = recipe;
  const totalTime = prepTimeMinutes + cookTimeMinutes;

  return (
    <Link
      to={`/recipe/${id}`}
      style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
      className="group animate-rise relative block overflow-hidden rounded-[1.35rem] border border-border bg-ink shadow-ink transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/40 hover:shadow-ink-lg"
    >
      {/* frame */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-[290px] w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07] sm:h-[310px]"
        />

        {/* ink wash so the caption reads */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10 opacity-95 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

        {/* top row */}
        <div className="absolute inset-x-4 top-4 flex items-start justify-between">
          <span className="rounded-full border border-white/25 bg-ink/40 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.18em] text-ivory backdrop-blur-md">
            {cuisine}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-ivory/90 px-2.5 py-1 text-[0.68rem] font-medium tabular-nums text-ink backdrop-blur-md">
            <Star className="h-2.5 w-2.5" />
            {rating}
          </span>
        </div>

        {/* caption */}
        <div className="absolute inset-x-4 bottom-4">
          <p className="text-[0.56rem] uppercase tracking-[0.24em] text-ivory/55 [text-shadow:0_1px_10px_rgba(23,22,20,0.6)]">
            {mealType?.[0] ?? "recipe"} · {difficulty}
          </p>

          <div className="mt-1.5 flex items-end justify-between gap-3">
            <h3 className="font-serif text-[1.48rem] leading-[1.15] text-ivory [text-shadow:0_1px_16px_rgba(23,22,20,0.5)]">
              {name}
            </h3>
            <span className="mb-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ivory/35 text-ivory transition-all duration-400 group-hover:rotate-45 group-hover:border-ivory group-hover:bg-ivory group-hover:text-ink">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* rule that draws on hover */}
          <div className="mt-3 h-px w-full bg-ivory/20">
            <div className="h-px w-0 bg-ivory/80 transition-all duration-700 ease-out group-hover:w-full" />
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[0.68rem] text-ivory/60">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {totalTime} mins
            </span>
            <span className="tabular-nums">
              {prepTimeMinutes} prep · {cookTimeMinutes} cook
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
