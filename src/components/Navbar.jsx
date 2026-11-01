import { useEffect, useState } from "react";
import { Link } from "react-router";
import useSectionNav from "../hooks/useSectionNav";
import { ChefHat, Close, Menu } from "./Icons";

const links = [
  { label: "Collection", id: "collection" },
  { label: "The Method", id: "method" },
  { label: "Kitchen Notes", id: "notes" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const goToSection = useSectionNav();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled
              ? "border-line/80 bg-paper/85 shadow-ink backdrop-blur-xl"
              : "border-transparent bg-paper/40 backdrop-blur-md"
          }`}
        >
          {/* Wordmark */}
          <Link
            to="/"
            className="group flex items-center gap-2.5"
            aria-label="RecipeFinder home"
          >
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-ink text-ivory transition-transform duration-500 group-hover:rotate-[-8deg]">
              <ChefHat className="h-[18px] w-[18px]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
            </span>
            <span className="leading-none">
              <span className="block font-serif text-[1.22rem] tracking-tight text-ink">
                Recipe<span className="italic text-slate">Finder</span>
              </span>
              <span className="eyebrow mt-1 block text-[0.5rem] text-muted">
                Ink &amp; Ivory Kitchen
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => goToSection(link.id)}
                className="link-underline text-[0.82rem] font-medium tracking-wide text-graphite transition-colors hover:text-ink"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goToSection("collection")}
              className="group hidden items-center gap-2 rounded-full bg-ink px-4 py-2 text-[0.78rem] font-medium tracking-wide text-ivory transition-all duration-300 hover:bg-ink-soft hover:shadow-ink sm:flex"
            >
              Browse recipes
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12h15" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-ivory md:hidden"
            >
              {open ? (
                <Close className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/35 backdrop-blur-sm transition-opacity duration-400 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-x-3 top-[5.4rem] origin-top overflow-hidden rounded-3xl border border-line bg-paper p-2 shadow-ink-lg transition-all duration-400 ${
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-3 scale-[0.98] opacity-0"
          }`}
        >
          <div className="flex flex-col p-2">
            {links.map((link, i) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  setOpen(false);
                  goToSection(link.id);
                }}
                style={{ transitionDelay: `${60 + i * 45}ms` }}
                className={`flex items-center justify-between border-b border-border/70 py-3.5 text-left font-serif text-2xl text-ink transition-all duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                {link.label}
                <span className="eyebrow text-muted">
                  0{i + 1}
                </span>
              </button>
            ))}
            <Link
              to="/"
              onClick={() => {
                setOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`flex items-center justify-between py-3.5 text-left font-serif text-2xl text-ink transition-all delay-200 duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              Home
              <span className="eyebrow text-muted">04</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                goToSection("collection");
              }}
              className={`mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-[0.8rem] font-medium tracking-wide text-ivory transition-all delay-200 duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              Browse recipes
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12h15" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
