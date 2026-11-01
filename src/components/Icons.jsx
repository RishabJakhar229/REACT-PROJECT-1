/**
 * A tiny hand-drawn icon set — all stroked, all inheriting currentColor.
 * Sizes come from className (h-4 w-4 etc.).
 */
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": "true",
};

export function Search(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </svg>
  );
}

export function ArrowRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 12H5" />
      <path d="m11 18-6-6 6-6" />
    </svg>
  );
}

export function ArrowUpRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function Clock(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function Star({ className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M12 2.75l2.7 5.66 6.05.82-4.42 4.27 1.1 6.15L12 16.7l-5.43 2.95 1.1-6.15L3.25 9.23l6.05-.82L12 2.75z" />
    </svg>
  );
}

export function Check(props) {
  return (
    <svg {...base} strokeWidth={2.2} {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function ChefHat(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 14.5V20h12v-5.5" />
      <path d="M6 14.5a4.5 4.5 0 0 1-1.4-8.6 4.2 4.2 0 0 1 7.4-1.2 4.2 4.2 0 0 1 7.4 1.2A4.5 4.5 0 0 1 18 14.5" />
      <path d="M9.5 17.5h5" />
    </svg>
  );
}

export function Flame(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3s5.5 4.2 5.5 9.2a5.5 5.5 0 0 1-11 0C6.5 9.6 8.7 7.6 9.7 6c.6 1.4 1.2 2 2 2.7.6-2 .3-4 .3-5.7Z" />
    </svg>
  );
}

export function Users(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19.5a5.8 5.8 0 0 1 11 0" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 6" />
      <path d="M17.6 14.2a5.8 5.8 0 0 1 3 5.3" />
    </svg>
  );
}

export function Leaf(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 4c-9 0-14 3.6-14 9.5A6.5 6.5 0 0 0 12.5 20C18.4 20 20 13 20 4Z" />
      <path d="M4 21c2.5-6.5 7-10.5 12-13" />
    </svg>
  );
}

export function Sparkle(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5c.8 4.3 2.2 5.7 6.5 6.5-4.3.8-5.7 2.2-6.5 6.5-.8-4.3-2.2-5.7-6.5-6.5 4.3-.8 5.7-2.2 6.5-6.5Z" />
      <path d="M18.5 15.5c.4 1.9 1.1 2.6 3 3-1.9.4-2.6 1.1-3 3-.4-1.9-1.1-2.6-3-3 1.9-.4 2.6-1.1 3-3Z" />
    </svg>
  );
}

export function Reset(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 10a8 8 0 1 1 2.4 7.2" />
      <path d="M4 4.5V10h5.5" />
    </svg>
  );
}

export function Menu(props) {
  return (
    <svg {...base} strokeWidth={1.8} {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h12" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function Close(props) {
  return (
    <svg {...base} strokeWidth={1.8} {...props}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function Utensils(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3v7.5a2.5 2.5 0 0 0 5 0V3" />
      <path d="M9.5 10.5V21" />
      <path d="M17 3c-1.4 1.6-2 3.6-2 6.2 0 1.7.7 2.8 2 2.8s2-1.1 2-2.8c0-2.6-.6-4.6-2-6.2Z" />
      <path d="M17 12v9" />
    </svg>
  );
}

export function Bookmark(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 4.5h11a1 1 0 0 1 1 1V21l-6.5-4-6.5 4V5.5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export function Dot(props) {
  return (
    <svg viewBox="0 0 8 8" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="4" cy="4" r="2.4" />
    </svg>
  );
}
