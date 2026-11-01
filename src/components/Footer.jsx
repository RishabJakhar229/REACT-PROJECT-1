import { Link } from "react-router";
import useSectionNav from "../hooks/useSectionNav";
import { ArrowUpRight, ChefHat } from "./Icons";

function Footer() {
  const goToSection = useSectionNav();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      <div className="mx-auto max-w-6xl px-5 pb-8 pt-16 sm:px-8">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ivory text-ink">
                <ChefHat className="h-[18px] w-[18px]" />
              </span>
              <span className="font-serif text-[1.35rem]">
                Recipe<span className="italic text-mist">Finder</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/60">
              A quiet index of things worth cooking. Read the method, tick the
              steps, and let the kitchen go still for a while.
            </p>
          </div>

          <div>
            <p className="eyebrow text-ivory/40">Wander</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => goToSection("collection")}
                  className="text-ivory/70 transition-colors hover:text-ivory"
                >
                  The collection
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToSection("method")}
                  className="text-ivory/70 transition-colors hover:text-ivory"
                >
                  Cooking method
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToSection("notes")}
                  className="text-ivory/70 transition-colors hover:text-ivory"
                >
                  Kitchen notes
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-ivory/40">Elsewhere</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  className="group inline-flex items-center gap-1.5 text-ivory/70 transition-colors hover:text-ivory"
                >
                  Home
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
              <li>
                <a
                  href="https://dummyjson.com/docs/recipes"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 text-ivory/70 transition-colors hover:text-ivory"
                >
                  Recipe archive
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 pt-6 text-[0.7rem] tracking-wide text-ivory/35 sm:flex-row sm:items-center">
          <p>© {year} RecipeFinder — brewed in charcoal &amp; ivory.</p>
          <p className="eyebrow text-[0.6rem]">Set in EB Garamond &amp; Source Sans 3</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
