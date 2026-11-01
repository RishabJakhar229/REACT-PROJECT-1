# RecipeFinder — Ink & Ivory Kitchen

A React + Vite recipe browser built on the [DummyJSON recipes API](https://dummyjson.com/docs/recipes).
Search the collection, open a recipe, and tick off ingredients and method steps as you cook.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Pages

| Route           | What it is                                                                    |
| --------------- | ----------------------------------------------------------------------------- |
| `/`             | Home — ink-wash hero, search + quick filters, recipe posters, cooking notes    |
| `/recipe/:id`   | Recipe detail — cook-along progress, checkable ingredient & method lists      |
| `*`             | 404                                                                            |

## Design system

Three colours do all the work: **charcoal black**, **cool gray**, **soft ivory**.
Everything is defined once as Tailwind v4 theme tokens in `src/index.css` — change a
value there and the whole site follows.

| Token            | Value     | Used for                                  |
| ---------------- | --------- | ----------------------------------------- |
| `--color-ink`    | `#171614` | Charcoal: buttons, hero panel, footer     |
| `--color-text`   | `#201f1c` | Body copy                                 |
| `--color-slate`  | `#5b646b` | Cool gray: italics, icons, secondary bars |
| `--color-muted`  | `#7a828a` | Cool gray: captions, meta                 |
| `--color-background` | `#f2eee4` | Soft ivory page ground                 |
| `--color-paper`  | `#f8f5ed` | Navbar, floating surfaces                 |
| `--color-ivory`  | `#e9e3d6` | Chips, row washes, quiet fills            |
| `--font-serif`   | Instrument Serif | Headlines                          |
| `--font-sans`    | Inter            | Interface text                     |

The "ink wash" blooms are generated in the browser with an SVG turbulence filter
(`src/components/InkField.jsx`) — no image files, and they tint to either ivory on
charcoal or charcoal on ivory via the `tone` prop.

## The checklist

`src/components/CheckableList.jsx` powers both lists. Each row is a real button
(`aria-pressed`), the strike-through wipes in behind the text, and the state is
persisted to `localStorage` under:

- `recipefinder-<id>-ingredients`
- `recipefinder-<id>-instructions`

Progress is reported up to the recipe page, which draws the ring, the two mini bars
and the floating cook-along bar.
