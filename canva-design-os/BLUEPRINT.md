# Canva Design OS — Notion Workspace Blueprint

Built 2026-07-28 in Grace's Notion workspace. This doc is the architecture
record: what exists, how it's structured, and where everything lives.

**Hub page:** https://app.notion.com/p/3ab6cc3b613f81d4a0d5ec47862df333

## What it is

A premium Notion workspace for recreating high-end visual styles in Canva:
30% Canva cheat sheet, 30% design school, 20% inspiration database, 20%
visual operating system. 11 interlinked databases, ~640 entries.

## Databases

| Database | Entries | Notion URL |
|---|---|---|
| ✨ Text Effects Library | 77 recipes | https://app.notion.com/p/7100d569e86244b88f1ceface6592621 |
| 📸 Photo Editing Recipes | 108 presets | https://app.notion.com/p/de7a884f18ad4f03932d4d27b9b80613 |
| 🎨 Color Palette Vault | 201 palettes | https://app.notion.com/p/762f685a0dc749d09d50a460e6713c1d |
| 🔍 Secret Canva Search Terms | 23 categories, ~450 terms | https://app.notion.com/p/fb7316238e8d4c0988c07b120d39de1c |
| 📐 Layout Systems | 12 brand layouts | https://app.notion.com/p/c309473d0e97419f973db0c12e71d6da |
| 🎬 Animation Recipes | 14 formulas | https://app.notion.com/p/1c63d3265f0f4ac3810ce74713ba045b |
| 🔤 Font Pairing Library | 150 pairings | https://app.notion.com/p/bb09b444faa446d59fb3b1ba4b8a7abd |
| 🖼️ Brand Reverse Engineering | 14 brands | https://app.notion.com/p/a1ae383ee25a483e89a07589dfe73796 |
| 💡 Design Recipes | 12 full recipes | https://app.notion.com/p/212c9bb8f9c84d17a0b956cb7c882211 |
| ⭐ Inspiration Database | 6 starters + how-to | https://app.notion.com/p/3f75ab80ed8548b98626f43b26d44e1f |
| 📚 Learning Hub | 20 lessons | https://app.notion.com/p/aa808bb4d7654fddbd67d00800aec591 |

## Schemas (key properties)

- **Text Effects**: Effect (title), Difficulty (★ select), Plan (Free/Pro),
  Style Tags (18-option multi-select), Fonts, Colors (hex), Best For,
  Seen On, Favorite. Page content = exact Canva settings + steps + a tip.
- **Photo Recipes**: Category (18 selects incl. Rhode-Inspired, Dark
  Academia), number columns for Brightness/Contrast/Highlights/Shadows/
  Saturation/Tint/Warmth/Clarity/Blur/Vignette, Grain (text), Vibe, Best For.
- **Palette Vault**: Mood Family (12 selects — organized by feeling, not
  color), Color Names, HEX Codes, Emotional Purpose, Pair With Fonts
  (cross-references Font Pairing entries), Photo Style (cross-references
  photo presets), Favorite.
- **Search Terms**: Category (title), Group (6 selects), Top 5 Terms,
  Pro Tip. Full term lists live in page content.
- **Layout Systems**: Vibe (multi), Best For, Signature Move, Difficulty.
  Content covers grid / hierarchy / spacing / typography / image placement /
  CTA / why it works / Canva recreation steps.
- **Font Pairings**: Heading Font, Body Font, Mood (multi), Best Industries,
  Similar Brands, Canva Availability (Both Free / Pro flags).
- **Design Recipes** (the connective tissue): Format, Mood, Difficulty +
  **relations** to Palette, Font Pairing, Text Effects, Photo Recipe, Brand
  Inspiration, and a **rollup** "Palette HEX" that surfaces linked palettes'
  hex codes directly on the recipe.
- **Learning Hub**: Track (10 selects — includes the full Design Psychology
  track), Level, Read Time, Key Takeaway.
- **Inspiration**: Brand, Industry, Mood, Color Palette, Fonts Spotted,
  Layout Style, Notes, Recreation Ideas, Difficulty, Source Link, Favorite.
  Includes a START HERE entry documenting the swipe-file workflow.

## Navigation flow

Dashboard (hub page) → three lanes:
1. **Create**: Design Recipes → follows relations out to every ingredient.
2. **Ingredients**: Palettes / Fonts / Search Terms picked by feeling.
3. **Study**: Layout Systems → Brand Breakdowns → Learning Hub.
Inspiration Database is the intake funnel; its "Recreation Ideas" column
routes saved references back into new Design Recipes.

## Remaining polish (blocked mid-build by Notion connector re-auth)

- [ ] Dashboard page content: welcome callout, 3-column quick nav,
      featured-design callout, sectioned database layout, favorites views
      (spec above; hub page currently shows default child-page list).
- [ ] Extra views: gallery on Text Effects & Inspiration, board-by-Category
      on Photo Recipes, board-by-Mood-Family on Palettes, board-by-Track on
      Learning Hub.

Both are cosmetic; all content and relations are live.
