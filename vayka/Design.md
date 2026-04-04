# Design System Document: Organic Editorialism

## 1. Overview & Creative North Star
**Creative North Star: The Fluid Curator**
This design system rejects the rigid, boxy constraints of traditional web frameworks in favor of a "Fluid Curator" aesthetic. It is designed to feel like a high-end, tactile travel journal where digital interfaces breathe with the rhythm of the natural world.

By merging the authoritative presence of high-contrast editorial serifs with the softness of organic, hyper-rounded containers, we move away from "software" and toward "experience." We break the template through **intentional asymmetry**, **overlapping glass layers**, and a complete **rejection of hard lines**. The layout should feel like it was composed by a human hand, not a grid-engine, favoring masonry-style flows that allow content to sit at varying heights and depths.

---

## 2. Colors & Surface Philosophy
The palette is a sophisticated interplay of deep aquatic teals (`primary`), sun-bleached sands (`secondary`), and lush botanical greens (`tertiary`).

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders are strictly prohibited for sectioning or containment. Boundaries must be defined through:
- **Tonal Transitions:** Transitioning from `surface` to `surface-container-low`.
- **The Depth Stack:** Placing a `surface-container-lowest` element on top of a `surface-container` background.
- **Backdrop Blurs:** Using blur to create a "perceived" edge without a stroke.

### Surface Hierarchy & Nesting
Treat the interface as a physical stack of semi-translucent materials.
- **Base Layer:** `surface` (#faf9f6) or `surface-dim` (#dbdad7).
- **Secondary Content Areas:** `surface-container` (#efeeeb).
- **Interactive Floating Cards:** `surface-container-lowest` (#ffffff) to provide the highest contrast against the warm sand backgrounds.

### The Glass & Gradient Rule
To achieve the "High-End Magazine" feel, use **Glassmorphism** for navigation bars and floating action menus:
- **Effect:** Background color at 60% opacity with a `24px` backdrop-blur.
- **Signature Gradient:** For primary CTAs, use a linear gradient from `primary` (#003434) to `primary-container` (#004d4d) at a 135-degree angle. This adds a "jewel-toned" depth that flat colors lack.

---

## 3. Typography
The typographic soul of this system lies in the tension between the traditional serif and the modern sans-serif.

* **Display & Headlines (Noto Serif):** High-contrast and elegant. Use `display-lg` for hero moments to evoke the feeling of a magazine masthead. These should always feel "heavy" and authoritative.
* **Body & UI (Plus Jakarta Sans):** Airy and clean. Used for all functional text. The generous tracking in `body-lg` ensures readability against complex glass backgrounds.
* **Hierarchy as Brand:** Use `title-lg` in `primary` (#003434) to anchor sections. Use `label-sm` in `secondary` (#645e49) for metadata, emphasizing the "soft sand" tones for secondary information.

---

## 4. Elevation & Depth
We eschew the standard Material Design shadows in favor of **Ambient Light Layering**.

* **The Layering Principle:** Instead of a shadow, place a `surface-container-highest` card inside a `surface` section. The change in value (from #faf9f6 to #e3e2e0) creates a "recessed" or "elevated" look naturally.
* **Ambient Shadows:** For floating elements (like modals or hovered cards), use an extra-diffused shadow: `0px 20px 40px rgba(26, 28, 26, 0.06)`. The tint is derived from `on-surface`, making the shadow feel like a natural light occlusion rather than a grey smudge.
* **The Ghost Border Fallback:** If accessibility requires a container edge, use the `outline-variant` token at **15% opacity**. It must be felt, not seen.
* **Glassmorphism Depth:** When stacking glass, increase the backdrop-blur value by `8px` for every layer "closer" to the user.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary-container`), white text, `xl` (3rem/48px) border-radius.
- **Secondary:** `secondary-container` fill with `on-secondary-container` text. No border.
- **Tertiary:** Ghost style. No background; text-only using `primary` color with a subtle hover state using `surface-container-high`.

### Cards & Masonry
- **Structure:** Use `xl` (3rem) border-radii for all cards.
- **Layout:** Cards in a feed should use asymmetrical masonry (varying heights).
- **Dividers:** **Forbidden.** Use a `spacing-8` (2.75rem) vertical gap or a subtle shift to `surface-container-low` to separate content blocks.

### Input Fields
- **Styling:** Soft `surface-container` background with an `xl` border-radius.
- **Focus State:** Instead of a thick border, use a subtle `2px` glow using `surface-tint` at 20% opacity.
- **Labels:** Always use `label-md` floating above the input, never inside.

### Chips & Tags
- **Selection Chips:** Use `tertiary-container` for an organic green "active" state.
- **Visuals:** Thin-line minimalist icons (1.5px stroke weight) should accompany the text.

---

## 6. Do’s and Don’ts

### Do
- **Do** use asymmetrical margins. If the left margin is `spacing-12`, try a right margin of `spacing-16` for hero text to create editorial tension.
- **Do** lean into the `xl` (3rem) corner radius. It should feel intentionally "round" and organic.
- **Do** use `primary-fixed-dim` for subtle backgrounds behind dark teal text to ensure AAA contrast while maintaining the color story.

### Don’t
- **Don’t** use a 1px solid border, ever.
- **Don’t** use sharp corners (0px-12px). They break the "Organic" promise.
- **Don’t** use pure black (#000000). Use `on-surface` (#1a1c1a) to keep the palette soft and natural.
- **Don’t** align everything to a rigid center. Allow images to bleed off the edge of the viewport or overlap into text containers to create depth.