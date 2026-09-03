# RETRO

Interview knowledge archive for **DSA**, **high-level design**, and **low-level design**.

This is a v0.1 we can deepen in flight. Each topic is a structured article (why it matters, theory, how it works, when to use it, interview tips, pitfalls, practice), not a title list.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Layout

- `content/dsa`, `content/hld`, `content/lld` — topic source of truth
- `content/schema.ts` — `Topic` shape
- `content/catalog.ts` — search, grouping, lookups
- `app/` — home, track index, topic page, search
- Progress (`Unread` / `Learning` / `Known`) is stored in the browser only

To add or deepen a topic, edit the matching file under `content/` and keep the `Topic` fields filled.

## Tracks

| Track | What lives there |
| --- | --- |
| DSA | Search, sort, graphs, DP, strings, and the rest of the interview core |
| HLD | Quality attributes, distributed models, building blocks, classic system designs |
| LLD | OOP, SOLID, patterns, class design, classic object designs |
