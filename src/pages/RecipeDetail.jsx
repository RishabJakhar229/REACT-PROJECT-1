import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import CheckableList from "../components/CheckableList";
import Footer from "../components/Footer";
import InkField from "../components/InkField";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Flame,
  Leaf,
  Sparkle,
  Star,
  Users,
  Utensils,
} from "../components/Icons";
import useLoading from "../hooks/useLoading";

const pad = (n) => String(n).padStart(2, "0");

function ProgressRing({ percent }) {
  const radius = 25;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative grid h-[64px] w-[64px] shrink-0 place-items-center rounded-full bg-ivory/60">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="var(--color-ivory-deep)"
          strokeWidth="3"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * percent) / 100}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <span className="figures-old absolute font-serif text-[1.02rem] text-ink">
        {percent}%
      </span>
    </div>
  );
}

function Stars({ rating = 0, className = "h-3.5 w-3.5" }) {
  return (
    <span className="relative inline-flex" aria-hidden="true">
      <span className="flex gap-0.5 text-line">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`${className} shrink-0`} />
        ))}
      </span>
      <span
        className="absolute inset-y-0 left-0 flex gap-0.5 overflow-hidden text-ink"
        style={{ width: `${Math.min(100, (rating / 5) * 100)}%` }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`${className} shrink-0`} />
        ))}
      </span>
    </span>
  );
}

function RecipeDetail() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  const { loading, startLoading, stopLoading } = useLoading();

  const [progress, setProgress] = useState({
    ingredients: { done: 0, total: 0 },
    method: { done: 0, total: 0 },
  });
  const [showBar, setShowBar] = useState(false);

  const onIngredientsProgress = useCallback((done, total) => {
    setProgress((prev) =>
      prev.ingredients.done === done && prev.ingredients.total === total
        ? prev
        : { ...prev, ingredients: { done, total } },
    );
  }, []);

  const onMethodProgress = useCallback((done, total) => {
    setProgress((prev) =>
      prev.method.done === done && prev.method.total === total
        ? prev
        : { ...prev, method: { done, total } },
    );
  }, []);

  async function fetchRecipe() {
    startLoading()
    try {
      const { data } = await axios.get(`https://dummyjson.com/recipes/${id}`);
      console.log(data);
      setRecipe(data);
    } catch (error) {
      setErrorMsg("Could not load recipe details. Please try again.");
    }
    stopLoading();
  }

  useEffect(() => {
    fetchRecipe();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const totalDone = progress.ingredients.done + progress.method.done;
  const totalItems = progress.ingredients.total + progress.method.total;
  const percent = totalItems
    ? Math.round((totalDone / totalItems) * 100)
    : 0;

  function jumpTo(target) {
    const node = document.getElementById(target);
    if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-8">
        <div className="skeleton-shimmer h-3 w-40 rounded-full" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="skeleton-shimmer h-[340px] rounded-[1.6rem]" />
          <div className="space-y-4 pt-6">
            <div className="skeleton-shimmer h-2.5 w-24 rounded-full" />
            <div className="skeleton-shimmer h-10 w-4/5 rounded-xl" />
            <div className="skeleton-shimmer h-10 w-3/5 rounded-xl" />
            <div className="skeleton-shimmer h-2.5 w-48 rounded-full" />
            <div className="skeleton-shimmer mt-6 h-24 w-full rounded-2xl" />
            <div className="skeleton-shimmer h-12 w-56 rounded-full" />
          </div>
        </div>
      </main>
    );
  }

  if (errorMsg) {
    return (
      <main className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[0.78rem] font-medium tracking-wide text-graphite transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to the collection
        </Link>

        <div className="mt-10 rounded-[1.6rem] border border-line bg-card px-6 py-16 text-center shadow-ink">
          <span className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full bg-ivory text-graphite">
            <Flame className="h-5 w-5" />
          </span>
          <p className="font-serif text-2xl text-ink">
            {errorMsg || "Recipe not found."}
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
            This page didn&apos;t come out of the oven. Head back and pick
            another recipe.
          </p>
        </div>
      </main>
    );
  }

  const totalTime = (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);

  return (
    <div className="text-text">
      {/* floating cooking bar */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4 transition-all duration-500 ${
          showBar ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-full border border-line bg-paper/92 px-2.5 py-1.5 shadow-ink-lg backdrop-blur-xl sm:px-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ivory font-serif text-[0.66rem] tabular-nums text-ink">
            {percent}
          </span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-ivory-deep">
            <div
              className="h-full rounded-full bg-ink transition-[width] duration-700 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="flex items-center gap-0.5 text-[0.62rem] uppercase tracking-[0.14em] text-graphite">
            <button
              type="button"
              onClick={() => jumpTo("ingredients")}
              className="rounded-full px-2 py-1.5 transition-colors hover:bg-ivory hover:text-ink"
            >
              Ingredients
            </button>
            <span className="text-mist">·</span>
            <button
              type="button"
              onClick={() => jumpTo("method")}
              className="rounded-full px-2 py-1.5 transition-colors hover:bg-ivory hover:text-ink"
            >
              Method
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-5 pb-28 pt-7 sm:px-8">
        {/* breadcrumb */}
        <nav className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-muted">
          <Link to="/" className="transition-colors hover:text-ink">
            Home
          </Link>
          <span className="text-mist">/</span>
          <Link to="/" className="transition-colors hover:text-ink">
            Collection
          </Link>
          <span className="text-mist">/</span>
          <span className="max-w-[10rem] truncate text-graphite sm:max-w-none">
            {recipe.name || "Recipe"}
          </span>
        </nav>

        {/* hero */}
        <section className="mt-6 grid items-start gap-9 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          {/* image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[1.7rem] border border-border bg-ivory p-2.5 shadow-ink-lg">
              <div className="relative overflow-hidden rounded-[1.2rem] bg-ink">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="h-[280px] w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.04] sm:h-[400px]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/0 to-ink/10" />

                <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-ink/50 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-ivory backdrop-blur-md">
                  {recipe.cuisine}
                </span>

                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/92 px-3 py-1.5 text-[0.7rem] font-medium text-ink backdrop-blur-md">
                    <Clock className="h-3.5 w-3.5" />
                    {totalTime} mins total
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/50 px-3 py-1.5 text-[0.7rem] text-ivory backdrop-blur-md">
                    <Users className="h-3.5 w-3.5" />
                    serves {recipe.servings}
                  </span>
                </div>
              </div>
            </div>

            {/* stamp */}
            <div className="absolute -right-4 -top-4 z-10 hidden rotate-[-6deg] flex-col items-center rounded-2xl border border-line bg-paper px-4 py-3 shadow-ink sm:flex">
              <span className="eyebrow text-[0.5rem] text-muted">
                difficulty
              </span>
              <span className="mt-1 font-serif text-lg leading-none text-ink">
                {recipe.difficulty}
              </span>
            </div>
          </div>

          {/* copy */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-ink/40" />
              <span className="eyebrow text-slate">
                {recipe.mealType?.[0] ?? "recipe"} · {recipe.cuisine}
              </span>
            </div>

            <h1 className="mt-4 font-serif text-[2.75rem] leading-[1.02] tracking-[-0.005em] text-ink sm:text-[3.55rem]">
              {recipe.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Stars rating={recipe.rating} />
              <span className="text-[0.8rem] font-medium tabular-nums text-ink">
                {recipe.rating}
              </span>
              <span className="text-[0.78rem] text-muted">
                ({recipe.reviewCount} reviews)
              </span>
              <span className="hidden h-3 w-px bg-line sm:block" />
              <span className="text-[0.78rem] text-muted">
                {totalItems > 0
                  ? `${totalItems} things to tick`
                  : "ready to cook"}
              </span>
            </div>

            {/* meta */}
            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 rounded-[1.25rem] border border-border bg-card p-4 shadow-ink sm:grid-cols-4 sm:gap-x-2">
              {[
                { icon: Clock, label: "Prep", value: `${recipe.prepTimeMinutes} m` },
                { icon: Flame, label: "Cook", value: `${recipe.cookTimeMinutes} m` },
                { icon: Users, label: "Serves", value: recipe.servings },
                {
                  icon: Utensils,
                  label: "Calories",
                  value: `${recipe.caloriesPerServing}`,
                },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.label}
                    className="flex items-center gap-2.5 rounded-xl px-1 py-1  transition-colors sm:flex-col sm:items-start sm:gap-1.5 sm:border-l sm:border-border sm:pl-3 sm:first:border-l-0 sm:first:pl-1"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-slate" />
                    <div>
                      <dt className="eyebrow text-[0.5rem] text-muted">
                        {m.label}
                      </dt>
                      <dd className="figures-old mt-1 font-serif text-[1.15rem] leading-none text-ink">
                        {m.value}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>

            {/* tags */}
            {recipe.tags?.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-1.5">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line bg-paper px-2.5 py-1 text-[0.66rem] uppercase tracking-[0.12em] text-graphite transition-colors hover:border-ink/35 hover:text-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => jumpTo("ingredients")}
                className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[0.8rem] font-medium tracking-wide text-ivory transition-all duration-400 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-ink-lg"
              >
                Start cooking
                <ArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => jumpTo("method")}
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-[0.8rem] font-medium tracking-wide text-ink transition-all duration-400 hover:border-ink/45 hover:bg-ivory/60"
              >
                <Utensils className="h-4 w-4" />
                Read the method
              </button>
            </div>
          </div>
        </section>

        {/* cook-along strip */}
        <section className="mt-10 flex flex-col gap-5 border-y border-line py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <ProgressRing percent={percent} />
            <div>
              <p className="eyebrow text-[0.52rem] text-muted">
                Cook along
              </p>
              <p className="mt-1.5 font-serif text-[1.38rem] leading-none text-ink">
                {percent === 100
                  ? "Ready to plate"
                  : totalDone > 0
                    ? "Nicely underway"
                    : "Nothing ticked yet"}
              </p>
              <p className="mt-1.5 text-[0.72rem] text-muted">
                {totalDone} of {totalItems} ticked
              </p>
            </div>
          </div>

          <div className="grid flex-1 gap-x-8 gap-y-3 sm:max-w-[19rem] sm:grid-cols-2">
            {[
              {
                label: "Ingredients",
                data: progress.ingredients,
                target: "ingredients",
              },
              { label: "Method", data: progress.method, target: "method" },
            ].map((row) => (
              <button
                key={row.label}
                type="button"
                onClick={() => jumpTo(row.target)}
                className="group text-left"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.64rem] uppercase tracking-[0.14em] text-graphite">
                    {row.label}
                  </span>
                  <span className="text-[0.66rem] tabular-nums text-muted">
                    {row.data.done}/{row.data.total}
                  </span>
                </div>
                <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-ivory-deep">
                  <div
                    className="h-full rounded-full bg-slate transition-[width] duration-500 ease-out group-hover:bg-ink"
                    style={{
                      width: `${
                        row.data.total
                          ? (row.data.done / row.data.total) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* checklists */}
        <section className="mt-8 grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <div id="ingredients" className="scroll-mt-28">
            <CheckableList
              key={`ing-${id}`}
              label="Ingredients"
              items={recipe.ingredients}
              storageKey={`recipefinder-${id}-ingredients`}
              onProgress={onIngredientsProgress}
              accent="ink"
            />
            <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-dashed border-line bg-paper/60 px-4 py-3.5">
              <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-slate" />
              <p className="text-[0.76rem] leading-relaxed text-graphite">
                <span className="font-medium text-ink">Mise en place —</span>{" "}
                gather and tick everything before you turn on the heat.
              </p>
            </div>
          </div>

          <div id="method" className="scroll-mt-28">
            <CheckableList
              key={`step-${id}`}
              label="Method"
              items={recipe.instructions}
              storageKey={`recipefinder-${id}-instructions`}
              numbered
              accent="slate"
              onProgress={onMethodProgress}
            />
            <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-dashed border-line bg-paper/60 px-4 py-3.5">
              <Sparkle className="mt-0.5 h-4 w-4 shrink-0 text-slate" />
              <p className="text-[0.76rem] leading-relaxed text-graphite">
                <span className="font-medium text-ink">Your place is kept —</span>{" "}
                ticks are saved on this device, so you can walk away mid-simmer.
              </p>
            </div>
          </div>
        </section>

        {/* closing */}
        <section className="relative mt-16 overflow-hidden rounded-[1.8rem] bg-ink px-6 py-12 shadow-ink-lg sm:px-12">
          <InkField
            uid={`closing-${id}`}
            tone="light"
            className="pointer-events-none absolute -right-24 -top-24 h-[30rem] w-[30rem] opacity-40 animate-drift"
          />
          <div className="relative flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">
            <div>
              <p className="eyebrow text-ivory/45">
                {recipe.mealType?.join(" · ")}
              </p>
              <h2 className="mt-3 max-w-md font-serif text-[2.1rem] leading-[1.12] text-ivory sm:text-[2.6rem]">
                {percent === 100 ? (
                  <>
                    Plated. <span className="italic text-mist">Enjoy it.</span>
                  </>
                ) : (
                  <>
                    Back to the <span className="italic text-mist">archive.</span>
                  </>
                )}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/"
                className="group inline-flex items-center gap-2.5 rounded-full bg-ivory px-6 py-3.5 text-[0.8rem] font-medium tracking-wide text-ink transition-all duration-400 hover:-translate-y-0.5 hover:bg-paper"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-400 group-hover:-translate-x-1" />
                All recipes
              </Link>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center gap-2 rounded-full border border-ivory/25 px-6 py-3.5 text-[0.8rem] font-medium tracking-wide text-ivory transition-all duration-400 hover:border-ivory/60 hover:bg-white/5"
              >
                Back to top
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <p className="mt-8 text-center text-[0.7rem] uppercase tracking-[0.2em] text-muted">
          Recipe {pad(Number(id) || 1)} · {recipe.cuisine} kitchen ·{" "}
          {recipe.difficulty}
        </p>
      </main>

      <Footer />
    </div>
  );
}

export default RecipeDetail;
