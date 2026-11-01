import { useEffect, useRef, useState } from "react";

/**
 * useReveal — adds a soft fade/slide-in the first time an element enters
 * the viewport. Purely presentational; content is always rendered.
 */
export default function useReveal({ delay = 0, threshold = 0.12 } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return {
    ref,
    className: `reveal ${shown ? "reveal-show" : ""}`,
    style: { transitionDelay: `${delay}ms` },
  };
}
