# GoPuff App Design System

This document is the source of truth for new screens and components in this app. Reuse the tokens in [`src/constants/theme.ts`](./src/constants/theme.ts) instead of introducing one-off colors, spacing, radii, or control sizes.

## Product direction

The interface is fast, friendly, bold, and delivery-focused:

- Use generous white space and high-contrast black typography.
- Use mint green for primary accents and important navigation states.
- Use rounded cards and pill-shaped controls.
- Keep product browsing visual: packshots, short labels, and horizontal carousels.
- Prefer concise uppercase or italic-black labels for major actions and section headings.

## Tokens

### Colors

| Token | Value | Use |
| --- | --- | --- |
| `GOPUFF_COLORS.action` | `#1010F5` | Primary buttons, selected actions, checkout |
| `GOPUFF_COLORS.primary` | `#8000FF` | Accent actions and active input borders |
| `GOPUFF_COLORS.black` | `#111111` | Primary text and icons |
| `GOPUFF_COLORS.grayText` | `#666666` | Supporting text |
| `GOPUFF_COLORS.mutedText` | `#777777` | Secondary labels and metadata |
| `GOPUFF_COLORS.borderLight` | `#E5E7EB` | Dividers and subtle borders |
| `GOPUFF_COLORS.selectedBackground` | `#8000FF` | Selected navigation/filter rows |
| `GOPUFF_COLORS.infoBackground` | `#8000FF` | Informational panels |
| `GOPUFF_COLORS.discount` | `#4BE39A` | Discount badges |
| `GOPUFF_COLORS.pageBackground` | `#FAFAFA` | Results and light page backgrounds |
| `GOPUFF_COLORS.overlay` | `rgba(0, 0, 0, 0.68)` | Modal backdrop |

### Typography

Use `GOPUFF_FONTS`:

- `regular`: default body copy, labels, and product names.
- `medium`: emphasized supporting text.
- `bold`: navigation and important values.
- `black`: hero headings and primary action labels.
- `family`: use when a component needs the platform-specific family string.

Type scale:

| Role | Size | Weight/style |
| --- | ---: | --- |
| Page heading | 30–40 | black, italic |
| Section heading | 22–30 | black, italic |
| Body | 15–18 | regular |
| Supporting text | 13–15 | regular |
| Button label | 14–19 | black, italic |

## Layout and spacing

Use `GOPUFF_SPACING` rather than arbitrary values:

- `xs` 4: icon/text micro-gap.
- `sm` 8: compact control gaps.
- `md` 12: inline control gaps.
- `lg` 16: card padding and row spacing.
- `xl` 24: modal and section padding.
- `xxl` 32: page padding.
- `section` 48: separation between major sections.

Desktop content should use responsive flex layouts. At `GOPUFF_SIZES.desktopBreakpoint` (768px), switch to the mobile layout. Keep mobile bottom-fixed actions clear of content with equivalent bottom padding.

## Components

### Buttons

- Primary: `GOPUFF_COLORS.action`, white text, `GOPUFF_SIZES.controlHeight`, `GOPUFF_RADII.pill`.
- Compact primary: `GOPUFF_SIZES.compactControlHeight`.
- Large primary: `GOPUFF_SIZES.largeControlHeight`.
- Secondary: white surface, `GOPUFF_COLORS.borderDark` border, same pill radius.
- Use short, uppercase, italic-black labels for actions such as `CHECKOUT`, `SAVE`, and `MY BAG`.

### Cards

- Product cards use `GOPUFF_SIZES.productCardWidth` × `GOPUFF_SIZES.productCardHeight`.
- Use `GOPUFF_RADII.md` and `GOPUFF_SHADOWS.card`.
- Keep the image area visually clean and preserve room for badges and quantity controls.
- Product carousels must include trailing right padding so the final card is fully scrollable.

### Modals

- Use a transparent React Native `Modal`.
- Apply `GOPUFF_COLORS.overlay` to the backdrop.
- Use a white surface, `GOPUFF_RADII.lg`, and `GOPUFF_SHADOWS.modal`.
- Keep the header and footer fixed; put long content in a nested `ScrollView`.
- On mobile, use nearly full width with page-safe horizontal padding.

### Navigation

- Top navigation remains white with compact rounded controls.
- Desktop category drawers split categories and subcategories 50/50.
- Mobile drawers use the full viewport width.
- New page-level screens should open with scroll position at the top.

## Implementation example

```tsx
import { GOPUFF_COLORS, GOPUFF_FONTS, GOPUFF_RADII, GOPUFF_SIZES, GOPUFF_SPACING } from '../constants/theme';

const styles = StyleSheet.create({
  primaryButton: {
    height: GOPUFF_SIZES.controlHeight,
    paddingHorizontal: GOPUFF_SPACING.xl,
    borderRadius: GOPUFF_RADII.pill,
    backgroundColor: GOPUFF_COLORS.action,
  },
  primaryButtonText: {
    fontFamily: GOPUFF_FONTS.black,
    fontSize: 16,
    fontStyle: 'italic',
    color: GOPUFF_COLORS.white,
  },
});
```

## Rules for new screens

1. Import tokens from `src/constants/theme.ts`.
2. Do not add a new color, radius, spacing value, or button height without a clear product requirement.
3. Use the shared [`ProductCard`](./src/components/ProductCard.tsx) for product grids and carousels.
4. Use existing modal, navigation, and cart interaction patterns.
5. Validate desktop and mobile layouts.
6. Run `npx tsc --noEmit` before considering the screen complete.
