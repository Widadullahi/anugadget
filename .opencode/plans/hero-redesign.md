# Hero Section Redesign Plan

## Goal
Replace the current gold gradient hero with the dark luxury design from `src/assets/firstpage.png`.

## File to modify
`src/pages/Home.tsx`

---

## Step 1: Fix imports (lines 8-9)

Remove:
```tsx
import ThreeGadgetScene from "@/components/ThreeGadgetScene";
import ThreeVehicleScene from "@/components/ThreeVehicleScene";
import heroBanner from "@/assets/hero-banner.jpg";
```

Replace with:
```tsx
import heroBanner from "@/assets/hero-banner.jpg";
import logo from "@/assets/logo.png";
```

## Step 2: Replace hero section (lines 194-323)

Replace the entire `<section className="relative w-full overflow-hidden">` block with a new dark luxury design that includes:

1. Dark background (#0a0a0a) with gold radial glow
2. CSS gold chevron decorations on left/right edges
3. Centered logo + ANU GADGET branding
4. "WELCOME" banner with decorative gold lines
5. Heading with gold italic keywords
6. Two gold-bordered product cards (Gadgets + Vehicles)
7. CSS animations (fade-in, slide-in, hover glow)

## Step 3: Remove unused style tags and Three.js references

The old inline `<style>` block with 3D scene styles gets replaced with new animation keyframes.

---

## Full replacement code will be applied during implementation.
