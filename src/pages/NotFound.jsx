import { Link } from "react-router";
import InkField from "../components/InkField";
import { ArrowLeft } from "../components/Icons";

function NotFound() {
  return (
    <main className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
      <div className="pointer-events-none absolute inset-0 -z-0 grid place-items-center">
        <InkField
          uid="notfound"
          className="h-[34rem] w-[34rem] opacity-[0.09] animate-breathe"
        />
      </div>

      <div className="relative">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-ink/40" />
          <span className="eyebrow text-slate">Off the menu</span>
          <span className="h-px w-8 bg-ink/40" />
        </div>

        <h1 className="mt-6 font-serif text-[6rem] leading-none tracking-[-0.03em] text-ink sm:text-[9rem]">
          4<span className="italic text-slate">0</span>4
        </h1>

        <h2 className="mt-4 font-serif text-2xl text-ink sm:text-3xl">
          This dish isn&apos;t on the menu.
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-[0.88rem] leading-relaxed text-graphite">
          The page you were looking for has been eaten. Wander back to the
          collection and pick something else.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[0.8rem] font-medium tracking-wide text-ivory transition-all duration-400 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-ink-lg"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-400 group-hover:-translate-x-1" />
            Back to the collection
          </Link>
          <Link
            to="/recipe/1"
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-[0.8rem] font-medium tracking-wide text-ink transition-all duration-400 hover:border-ink/45 hover:bg-ivory/60"
          >
            Open a random recipe
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
