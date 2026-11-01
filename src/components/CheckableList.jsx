import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Reset } from "./Icons";

const pad = (n) => String(n).padStart(2, "0");

/**
 * CheckableList
 * A tick-off list used for both ingredients and method steps.
 *
 * - click / Enter / Space toggles a row
 * - completed rows are tracked in localStorage per recipe so a half-cooked
 *   recipe survives a refresh
 * - exposes its progress through onProgress so the parent can show a total
 */
function CheckableList({
  label,
  items = [],
  storageKey,
  numbered = false,
  onProgress,
  accent = "ink",
}) {
  const reported = useRef("");

  const [done, setDone] = useState(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch {
      return new Set();
    }
  });

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...done]));
    } catch {
      /* storage unavailable — ignore */
    }
  }, [done, storageKey]);

  const percent = useMemo(
    () => (items.length ? Math.round((done.size / items.length) * 100) : 0),
    [done, items.length],
  );

  useEffect(() => {
    const stamp = `${done.size}/${items.length}`;
    if (!onProgress || reported.current === stamp) return;
    reported.current = stamp;
    onProgress(done.size, items.length);
  }, [done, items.length, onProgress]);

  function toggle(index) {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  function reset() {
    setDone(new Set());
  }

  const complete = items.length > 0 && done.size === items.length;

  return (
    <section
      aria-label={label}
      className="overflow-hidden rounded-[1.4rem] border border-border bg-card shadow-ink"
    >
      {/* header */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-ivory/45 px-4 py-4 sm:px-5">
        <div className="flex items-baseline gap-3">
          <h2 className="font-serif text-[1.6rem] leading-none text-ink">{label}</h2>
          <span className="text-[0.72rem] tabular-nums tracking-[0.14em] text-muted">
            {done.size}/{items.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden h-1 w-24 overflow-hidden rounded-full bg-ivory-deep sm:block">
            <div
              className={`h-full rounded-full transition-[width] duration-500 ease-out ${
                accent === "slate" ? "bg-slate" : "bg-ink"
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>
          <button
            type="button"
            onClick={reset}
            disabled={done.size === 0}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-graphite transition-all hover:border-ink hover:bg-ink hover:text-ivory disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-line disabled:hover:bg-transparent disabled:hover:text-graphite"
          >
            <Reset className="h-3 w-3" />
            Reset
          </button>
        </div>
      </header>

      {/* rows */}
      <ul className="divide-y divide-border/70">
        {items.map((item, index) => {
          const checked = done.has(index);
          return (
            <li key={`${item}-${index}`}>
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-pressed={checked}
                className={`ink-row group flex w-full items-start gap-3.5 px-4 py-3.5 text-left sm:px-5 ${
                  checked ? "bg-ivory/40" : "hover:bg-ivory/25"
                }`}
              >
                {/* tick */}
                <span
                  aria-hidden="true"
                  className={`relative mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-[7px] border transition-all duration-300 ${
                    checked
                      ? accent === "slate"
                        ? "border-slate bg-slate text-white"
                        : "border-ink bg-ink text-ivory"
                      : "border-line bg-paper text-transparent group-hover:border-slate/70"
                  }`}
                >
                  {checked && (
                    <Check
                      className={`tick-pop h-3.5 w-3.5 ${
                        accent === "slate" ? "text-white" : "text-ivory"
                      }`}
                    />
                  )}
                </span>

                {/* index for method steps */}
                {numbered && (
                  <span
                    aria-hidden="true"
                    className={`figures-old mt-px w-6 shrink-0 font-serif text-[1rem] transition-colors ${
                      checked ? "text-mist" : "text-slate"
                    }`}
                  >
                    {pad(index + 1)}
                  </span>
                )}

                <span className="relative flex-1 text-[0.92rem] leading-relaxed">
                  {/* strike-through that wipes in behind the words */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute left-0 top-[0.68em] h-px bg-mist transition-[width] duration-500 ease-out ${
                      checked ? "w-full" : "w-0"
                    }`}
                  />
                  <span
                    className={`relative transition-colors duration-300 ${
                      checked ? "text-muted" : "text-text"
                    }`}
                  >
                    {item}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* footer strip */}
      <div className="border-t border-border bg-ivory/30 px-4 py-3.5 sm:px-5">
        <div className="flex items-center justify-between gap-3 text-[0.7rem] tracking-wide text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                complete ? "bg-ink" : "bg-mist"
              }`}
            />
            {complete
              ? "All ticked — enjoy the plate."
              : "Tap a row to tick it off as you go."}
          </span>
          <span className="tabular-nums text-graphite">{percent}%</span>
        </div>
        <div className="mt-2.5 h-[3px] overflow-hidden rounded-full bg-ivory-deep">
          <div
            className={`h-full rounded-full transition-[width] duration-500 ease-out ${
              accent === "slate" ? "bg-slate" : "bg-ink"
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </section>
  );
}

export default CheckableList;
