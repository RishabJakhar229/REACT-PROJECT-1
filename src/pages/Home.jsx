import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import CheckableList from "../components/CheckableList";
import Footer from "../components/Footer";
import InkField from "../components/InkField";
import RecipeCard from "../components/RecipeCard";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Close,
  Dot,
  Flame,
  Leaf,
  Search,
  Sparkle,
  Star,
} from "../components/Icons";
import useLoading from "../hooks/useLoading";
import useReveal from "../hooks/useReveal";

const POUR_STEPS = [
  "Weigh the flour and set the kettle to a low simmer.",
  "Fold the butter in slowly until the dough turns silk.",
  "Rest the bowl under a cloth for twenty quiet minutes.",
  "Shape, score, and bake until the crust sings.",
];

const NOTES = [
  {
    n: "01",
    icon: Flame,
    title: "Read the whole method first",
    body: "Before a single pan warms, read the steps end to end. A recipe is a story — knowing the ending makes the middle calmer.",
  },
  {
    n: "02",
    icon: Leaf,
    title: "Mise en place, always",
    body: "Weigh, chop and line everything up before you begin. Cooking gets gentler when the ingredients are already listening.",
  },
  {
    n: "03",
    icon: Clock,
    title: "Trust the rest",
    body: "Most dishes are finished off the heat. Let the pan sit, let the dough relax, let the sauce settle into itself.",
  },
];

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { loading, startLoading, stopLoading } = useLoading();

  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const heroReveal = useReveal({ delay: 40 });
  const featureReveal = useReveal({ delay: 160 });
  const methodReveal = useReveal();
  const notesReveal = useReveal();

  async function fetchRecipes(skipCount, query) {
    startLoading();
    try {
      let url = `https://dummyjson.com/recipes?limit=6&skip=${skipCount}`;
      if (query) {
        url = `https://dummyjson.com/recipes/search?limit=6&skip=${skipCount}&q=${query}`;
      }
      const { data } = await axios.get(url);
      setRecipes((prev) =>
        skipCount === 0 ? data.recipes : [...prev, ...data.recipes],
      );
      setTotal(data.total);
    } catch (error) {
      setErrorMsg("Please try again later.");
    }
    stopLoading();
  }

  useEffect(() => {
    fetchRecipes(0);
  }, []);

  function handleSearch(e) {
    // console.log(e.target);
    e.preventDefault();

    const form = new FormData(e.target);
    let query = form.get("query").trim();
    console.log("sfsdf");
    setSearchQuery(query);
    setSearchInput(query);
    // if (query) {
    fetchRecipes(0, query);
    // }
  }

  function searchForTerm(term) {
    const next = searchQuery === term ? "" : term;
    setSearchInput(next);
    setSearchQuery(next);
    fetchRecipes(0, next);
  }

  // ---- purely presentational derivations ----
  const featured = recipes[0];
  const cuisines = new Set(recipes.map((r) => r.cuisine)).size;
  const avgRating = recipes.length
    ? (recipes.reduce((a, r) => a + (r.rating || 0), 0) / recipes.length).toFixed(1)
    : "—";

  function handleHeroPointer(e) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  }

  function focusSearch() {
    const input = document.getElementById("recipe-search");
    if (input) {
      input.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => input.focus({ preventScroll: true }), 380);
    }
  }

  return (
    <div className="text-text">
      {/* ───────────────────────────── HERO ───────────────────────────── */}
      <section
        onPointerMove={handleHeroPointer}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        className="relative mx-auto max-w-6xl px-5 pb-10 pt-10 sm:px-8 sm:pt-16"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10">
          {/* copy */}
          <div {...heroReveal} className={`${heroReveal.className}`}>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-ink/40" />
              <span className="eyebrow text-slate">A quiet recipe index</span>
            </div>

            <h1 className="mt-6 font-serif text-[3.35rem] leading-[0.92] tracking-[-0.02em] text-ink sm:text-[4.4rem] lg:text-[4.9rem]">
              Cook slowly,
              <br />
              <span className="italic text-slate">tick things off.</span>
            </h1>

            <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-graphite">
              An ink-washed collection of everyday recipes. Search the archive,
              read the method like a letter, then work through the ingredients
              and steps one satisfying tick at a time.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={focusSearch}
                className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[0.82rem] font-medium tracking-wide text-ivory transition-all duration-400 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-ink-lg"
              >
                Find a recipe
                <ArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1" />
              </button>

              <a
                href="#method"
                className="group inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-6 py-3.5 text-[0.82rem] font-medium tracking-wide text-ink transition-all duration-400 hover:border-ink/45 hover:bg-ivory/60"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full border border-ink/25 transition-colors group-hover:border-ink/50">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12.5 4.5 4.5L19 6.5" />
                  </svg>
                </span>
                How ticking works
              </a>
            </div>

            {/* stats */}
            <dl className="mt-11 grid max-w-md grid-cols-3 gap-4 border-t border-line/80 pt-6">
              {[
                { k: "Recipes", v: total || "—" },
                { k: "Cuisines", v: cuisines || "—" },
                { k: "Avg. rating", v: avgRating },
              ].map((s) => (
                <div key={s.k}>
                  <dd className="font-serif text-[1.7rem] leading-none text-ink">
                    {s.v}
                  </dd>
                  <dt className="eyebrow mt-2 text-[0.55rem] text-muted">
                    {s.k}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          {/* ink composition */}
          <div
            {...featureReveal}
            className={`relative ${featureReveal.className}`}
          >
            <div className="relative h-[430px] overflow-hidden rounded-[2rem] bg-ink shadow-ink-lg sm:h-[520px]">
              {/* the wash itself, pooled low and to the right */}
              <InkField
                uid="hero"
                tone="light"
                className="pointer-events-none absolute -bottom-28 -right-24 h-[26rem] w-[26rem] opacity-60 animate-drift sm:h-[32rem] sm:w-[32rem]"
              />
              {/* vignette so the type stays legible */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_10%_0%,rgba(23,22,20,0.55),transparent_62%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_85%_95%,rgba(23,22,20,0.35),transparent_60%)]" />

              {/* ruled hairlines, like a notebook page */}
              <div className="pointer-events-none absolute inset-x-0 top-[38%] h-px bg-ivory/10" />
              <div className="pointer-events-none absolute inset-x-0 top-[70%] h-px bg-ivory/8" />

              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-6">
                <span className="eyebrow rounded-full border border-ivory/25 px-3 py-1.5 text-[0.55rem] text-ivory/70 backdrop-blur-sm">
                  Est. kitchen 2026
                </span>
                <span className="h-2 w-2 animate-breathe rounded-full bg-ivory/70" />
              </div>

              {/* statement */}
              <div className="absolute left-5 top-[4.6rem] max-w-[17rem] sm:left-6 sm:top-[5.6rem] sm:max-w-[19rem]">
                <p className="font-serif text-[1.65rem] leading-[1.15] text-ivory sm:text-[2.1rem]">
                  Good food is
                  <br />
                  <span className="italic text-mist">mostly patience.</span>
                </p>
                <p className="mt-3.5 flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.22em] text-ivory/40">
                  <span className="h-px w-6 bg-ivory/30" />
                  House note
                </p>
              </div>

              {/* rotating stamp */}
              <div className="absolute right-3 top-[9.5rem] hidden h-24 w-24 sm:right-5 sm:block">
                <svg
                  viewBox="0 0 100 100"
                  className="h-full w-full animate-spin-slow text-ivory/45"
                >
                  <defs>
                    <path
                      id="stampCircle"
                      d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
                    />
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r="47"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.7"
                  />
                  <text
                    fill="currentColor"
                    fontSize="8.2"
                    letterSpacing="2.6"
                    fontFamily="Inter, sans-serif"
                  >
                    <textPath href="#stampCircle">
                      INK &amp; IVORY · COOK SLOWLY ·
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* paper label */}
              <div
                className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5"
                style={{
                  transform: `translate3d(${tilt.x * -8}px, ${tilt.y * -6}px, 0)`,
                  transition: "transform 400ms cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {featured ? (
                  <Link
                    to={`/recipe/${featured.id}`}
                    className="group block rounded-[1.2rem] border border-white/40 bg-paper/95 p-4 backdrop-blur-xl transition-colors hover:bg-paper"
                  >
                    <div className="flex items-center justify-between">
                      <p className="eyebrow text-[0.5rem] text-muted">
                        Today&apos;s plate
                      </p>
                      <p className="inline-flex items-center gap-1.5 text-[0.66rem] text-graphite">
                        <Star className="h-3 w-3 text-ink" />
                        {featured.rating}
                      </p>
                    </div>

                    <div className="mt-2 flex items-end justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate font-serif text-[1.35rem] leading-tight text-ink">
                          {featured.name}
                        </p>
                        <p className="mt-1.5 text-[0.7rem] text-graphite">
                          {featured.cuisine} · {featured.difficulty} ·{" "}
                          {featured.prepTimeMinutes + featured.cookTimeMinutes}{" "}
                          min
                        </p>
                      </div>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-ivory transition-transform duration-400 group-hover:rotate-45">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="mt-3.5 flex items-center gap-3 border-t border-dashed border-line pt-3 text-[0.66rem] text-graphite">
                      <span className="inline-flex items-center gap-1.5">
                        <Check className="h-3 w-3 text-slate" />
                        {featured.ingredients?.length ?? 0} ingredients
                      </span>
                      <span className="text-mist">·</span>
                      <span>{featured.instructions?.length ?? 0} steps</span>
                      <span className="text-mist">·</span>
                      <span className="hidden sm:inline">tick as you go</span>
                    </div>
                  </Link>
                ) : (
                  <div className="rounded-[1.2rem] border border-white/40 bg-paper/90 p-4">
                    <div className="skeleton-shimmer h-2 w-16 rounded-full" />
                    <div className="skeleton-shimmer mt-3 h-4 w-3/4 rounded-full" />
                    <div className="skeleton-shimmer mt-2 h-2 w-24 rounded-full" />
                    <div className="skeleton-shimmer mt-4 h-2 w-full rounded-full" />
                  </div>
                )}
              </div>
            </div>

            {/* corner accents */}
            <div className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 rounded-tr-[2rem] border-r border-t border-ink/20" />
            <div className="pointer-events-none absolute -bottom-3 -left-3 h-16 w-16 rounded-bl-[2rem] border-b border-l border-ink/20" />
          </div>
        </div>
      </section>

      {/* ─────────────────────────── MARQUEE ─────────────────────────── */}
      <div className="relative overflow-hidden border-y border-line/80 bg-ivory/50 py-3.5">
        <div className="marquee-mask">
          <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-8">
                {(recipes.length
                  ? recipes.map((r) => r.name)
                  : ["Baking", "Simmering", "Searing", "Resting", "Plating"]
                ).map((name, i) => (
                  <span
                    key={`${copy}-${name}-${i}`}
                    className="flex items-center gap-8"
                  >
                    <span className="font-serif text-[0.98rem] italic text-graphite">
                      {name}
                    </span>
                    <Dot className="h-1.5 w-1.5 text-mist" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ────────────────────────── COLLECTION ────────────────────────── */}
      <main id="collection" className="mx-auto max-w-6xl px-5 pb-20 pt-14 sm:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-ink/40" />
            <span className="eyebrow text-slate">The archive</span>
          </div>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2 className="font-serif text-[2.6rem] leading-tight text-ink sm:text-[3rem]">
              The Collection
            </h2>
            <span className="inline-flex items-center gap-2 pb-1.5 text-[0.74rem] uppercase tracking-[0.14em] text-muted">
              <span className="h-1 w-1 rounded-full bg-mist" />
              {loading
                ? "Turning the pages…"
                : searchQuery
                  ? `“${searchQuery}”`
                  : `${total || "—"} recipes`}
            </span>
          </div>
        </div>

        {/* sticky search */}
        <div className="sticky top-[4.9rem] z-30 -mx-3 mt-7 bg-gradient-to-b from-background from-70% via-background/85 to-transparent px-3 pb-5 pt-2">
          <form
            onSubmit={handleSearch}
            className="group flex items-center gap-2 rounded-full border border-line bg-paper/90 p-1.5 pl-4 shadow-ink backdrop-blur-xl transition-all duration-400 focus-within:border-ink/40 focus-within:shadow-ink-lg"
          >
            <Search className="h-4 w-4 shrink-0 text-slate transition-colors group-focus-within:text-ink" />
            <input
              id="recipe-search"
              type="text"
              name="query"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by dish, cuisine or craving…"
              className="min-w-0 flex-1 bg-transparent py-2.5 text-[0.9rem] text-text outline-none placeholder:text-muted/80"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                  if (searchQuery) {
                    setSearchQuery("");
                    fetchRecipes(0, "");
                  }
                }}
                aria-label="Clear search"
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-ivory hover:text-ink"
              >
                <Close className="h-3.5 w-3.5" />
              </button>
            )}
            <button
              type="submit"
              className="group/btn inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.78rem] font-medium tracking-wide text-ivory transition-all duration-300 hover:bg-ink-soft"
            >
              <span>Search</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </button>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-1.5 px-1">
            <span className="eyebrow mr-1 text-[0.52rem] text-muted">
              Try
            </span>
            {["Chicken", "Pasta", "Dessert", "Seafood", "Vegetarian"].map(
              (term) => {
                const active = searchQuery.toLowerCase() === term.toLowerCase();
                return (
                  <button
                    key={term}
                    type="button"
                    onClick={() => searchForTerm(term)}
                    aria-pressed={active}
                    className={`rounded-full border px-3 py-1.5 text-[0.7rem] tracking-wide transition-all duration-300 ${
                      active
                        ? "border-ink bg-ink text-ivory"
                        : "border-line bg-paper/70 text-graphite hover:border-ink/40 hover:bg-paper hover:text-ink"
                    }`}
                  >
                    {term}
                  </button>
                );
              },
            )}
          </div>
        </div>

        {/* error */}
        {errorMsg && (
          <div className="mt-10 rounded-[1.4rem] border border-line bg-card px-6 py-14 text-center shadow-ink">
            <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-ivory text-graphite">
              <Flame className="h-5 w-5" />
            </span>
            <p className="font-serif text-2xl text-ink">{errorMsg}</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              The kitchen didn&apos;t answer this time. Refresh the page to try
              the archive again.
            </p>
          </div>
        )}

        {/* loading skeletons */}
        {!errorMsg && loading && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-[1.4rem] border border-border bg-card p-2.5 shadow-ink"
              >
                <div className="skeleton-shimmer h-52 rounded-[1.05rem]" />
                <div className="space-y-2.5 px-2 py-4">
                  <div className="skeleton-shimmer h-3 w-2/3 rounded-full" />
                  <div className="skeleton-shimmer h-2 w-1/3 rounded-full" />
                  <div className="skeleton-shimmer mt-4 h-2 w-full rounded-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* empty */}
        {!errorMsg && !loading && recipes.length === 0 && (
          <div className="mt-10 rounded-[1.4rem] border border-dashed border-line bg-paper/60 px-6 py-16 text-center">
            <span className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full bg-ivory text-graphite">
              <Search className="h-5 w-5" />
            </span>
            <p className="font-serif text-2xl text-ink">
              {`No recipes found for '${searchQuery}'`}
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              Try a broader word — “chicken”, “pasta”, “soup” — or clear the
              search to wander the whole archive.
            </p>
          </div>
        )}

        {/* grid */}
        {!errorMsg && !loading && recipes.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={index} />
            ))}
          </div>
        )}

        {/* load more */}
        {!errorMsg && recipes.length < total && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="dashed-rule w-full max-w-xs" />
            <button
              type="button"
              onClick={() => fetchRecipes(recipes.length, searchQuery)}
              disabled={loading}
              className="group inline-flex items-center gap-3 rounded-full border border-ink/25 px-7 py-3.5 text-[0.82rem] font-medium tracking-wide text-ink transition-all duration-400 hover:border-ink hover:bg-ink hover:text-ivory disabled:cursor-wait disabled:opacity-60"
            >
              {loading ? "Loading…" : "Load more recipes"}
              <span className="grid h-5 w-5 place-items-center rounded-full border border-current text-[0.6rem] tabular-nums opacity-70">
                {Math.min(6, total - recipes.length)}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1" />
            </button>
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              {recipes.length} of {total} shown
            </p>
          </div>
        )}
      </main>

      {/* ─────────────────────────── METHOD ─────────────────────────── */}
      <section
        id="method"
        className="relative overflow-hidden bg-ivory/60 py-20"
      >
        <div className="pointer-events-none absolute -right-40 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 opacity-[0.12]">
          <InkField uid="method" className="h-full w-full animate-drift" />
        </div>

        <div
          {...methodReveal}
          className={`relative mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center ${methodReveal.className}`}
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-ink/40" />
              <span className="eyebrow text-slate">The method</span>
            </div>
            <h2 className="mt-4 font-serif text-[2.5rem] leading-[1.02] text-ink sm:text-[3.2rem]">
              A recipe page that
              <br />
              <span className="italic text-slate">keeps your place.</span>
            </h2>
            <p className="mt-5 max-w-md text-[0.94rem] leading-relaxed text-graphite">
              Every ingredient and every step on the recipe page is a checkbox.
              Tick them as you go — the progress bar fills, the row settles into
              gray, and the list remembers where you left off.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Tap any ingredient to strike it through",
                "Work down the numbered method steps",
                "Reload tomorrow — ticks are still there",
              ].map((line, i) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-ink/25 font-serif text-[0.78rem] text-ink">
                    {i + 1}
                  </span>
                  <span className="text-[0.88rem] leading-relaxed text-graphite">
                    {line}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              to="/recipe/1"
              className="group mt-9 inline-flex items-center gap-2.5 text-[0.82rem] font-medium tracking-wide text-ink"
            >
              <span className="link-underline">Open a recipe and try it</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* live demo */}
          <div className="relative mt-8 lg:sticky lg:top-32 lg:mt-0">
            <div className="absolute -left-1 -top-7 z-10 hidden rotate-[-3deg] rounded-full border border-line bg-ivory px-3 py-1.5 text-[0.56rem] uppercase tracking-[0.2em] text-graphite shadow-ink sm:block">
              live demo — try ticking
            </div>
            <div className="rotate-[0.6deg] transition-transform duration-500 hover:rotate-0">
              <CheckableList
                label="Mise en place"
                items={POUR_STEPS}
                storageKey="recipefinder-demo-method"
                numbered
              />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────── NOTES ──────────────────────────── */}
      <section id="notes" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div
          {...notesReveal}
          className={`flex flex-wrap items-end justify-between gap-4 ${notesReveal.className}`}
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-ink/40" />
              <span className="eyebrow text-slate">Kitchen notes</span>
            </div>
            <h2 className="mt-3 max-w-lg font-serif text-[2.5rem] leading-[1.05] text-ink sm:text-[3rem]">
              Small habits, <span className="italic text-slate">better food.</span>
            </h2>
          </div>
          <p className="max-w-xs pb-2 text-[0.82rem] leading-relaxed text-muted">
            Three things worth remembering before the pan gets hot.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {NOTES.map((note, i) => {
            const Icon = note.icon;
            return (
              <article
                key={note.n}
                style={{ animationDelay: `${i * 90}ms` }}
                className="group animate-rise relative flex flex-col overflow-hidden rounded-[1.4rem] border border-border bg-card p-6 shadow-ink transition-all duration-500 hover:-translate-y-1 hover:border-ink/25 hover:shadow-ink-lg"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ivory text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-ivory">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-serif text-[2rem] leading-none text-ivory-deep transition-colors duration-500 group-hover:text-line">
                    {note.n}
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-[1.34rem] leading-snug text-ink">
                  {note.title}
                </h3>
                <p className="mt-2.5 text-[0.85rem] leading-relaxed text-graphite">
                  {note.body}
                </p>
              </article>
            );
          })}
        </div>

        {/* CTA band */}
        <div className="relative mt-16 overflow-hidden rounded-[1.8rem] bg-ink px-6 py-12 shadow-ink-lg sm:px-12">
          <InkField
            uid="cta"
            tone="light"
            className="pointer-events-none absolute -right-24 -top-24 h-[30rem] w-[30rem] opacity-40 animate-drift"
          />
          <div className="relative flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">
            <div>
              <p className="eyebrow text-ivory/45">Ready when you are</p>
              <h2 className="mt-3 max-w-md font-serif text-[2.1rem] leading-[1.08] text-ivory sm:text-[2.6rem]">
                Pick something, <span className="italic text-mist">pour something.</span>
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={focusSearch}
                className="group inline-flex items-center gap-2.5 rounded-full bg-ivory px-6 py-3.5 text-[0.82rem] font-medium tracking-wide text-ink transition-all duration-400 hover:-translate-y-0.5 hover:bg-paper"
              >
                <Search className="h-4 w-4" />
                Search the collection
              </button>
              <Link
                to={featured ? `/recipe/${featured.id}` : "/recipe/1"}
                className="group inline-flex items-center gap-2.5 rounded-full border border-ivory/25 px-6 py-3.5 text-[0.82rem] font-medium tracking-wide text-ivory transition-all duration-400 hover:border-ivory/60 hover:bg-white/5"
              >
                <Sparkle className="h-4 w-4" />
                Surprise me
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* floating back-to-top */}
      <BackToTop />
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-line bg-paper/90 text-ink shadow-ink backdrop-blur-md transition-all duration-500 hover:bg-ink hover:text-ivory ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowRight className="h-4 w-4 -rotate-90" />
    </button>
  );
}

export default Home;
