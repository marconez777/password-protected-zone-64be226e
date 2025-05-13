# Frontend Styling and Layout Documentation

This document focuses on the styling and layout technologies used in the frontend of our application.

## Core Technologies

### Tailwind CSS

Tailwind CSS is the primary styling framework used throughout the application. It provides utility-first CSS classes that allow for rapid UI development without writing custom CSS.

#### Key Features Used:
- **Responsive Design**: Using prefixes like `sm:`, `md:`, `lg:`, `xl:` to create responsive layouts
- **Flexbox & Grid**: Using `flex`, `grid` utilities for layout structures
- **Custom Color Palette**: Custom colors defined in the theme configuration
- **Dark Mode Support**: Theme variables configured for both light and dark modes

Example of a responsive card component using Tailwind:
```jsx
<div className="rounded-lg bg-background p-4 shadow-md sm:p-6 md:flex md:items-center md:justify-between">
  <h3 className="text-lg font-medium text-foreground md:text-xl">Card Title</h3>
  <p className="mt-2 text-sm text-muted-foreground md:mt-0">Card description goes here</p>
</div>
```

### CSS Variables

The application uses CSS variables (custom properties) for theming, defined in `src/index.css`. These variables control colors, spacing, borders, and other design tokens.

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 267 56% 60%;
  --primary-foreground: 0 0% 100%;
  /* and many more variables... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* dark theme variables... */
}
```

These variables are accessed in Tailwind using the `hsl()` function:

```css
.bg-background {
  background-color: hsl(var(--background));
}
```

## Component Libraries

### shadcn/ui Components

The application uses shadcn/ui components, which are built on top of Radix UI primitives. These components provide accessible, unstyled building blocks that are then styled with Tailwind CSS.

Key components used:
- Button
- Card
- Dialog
- Form elements
- Toast notifications
- Dropdowns and menus

Example of a shadcn/ui button:
```jsx
<Button variant="default" size="default">
  Click me
</Button>
```

### Tailwind CSS Configuration

The project extends Tailwind's default configuration in `tailwind.config.ts` with:

- Custom colors
- Extended theme properties
- Animation definitions
- Custom border radius values
- Container configurations

```js
// Example of color configuration in tailwind.config.ts
colors: {
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))'
  },
  // Other color definitions...
}
```

## Animation and Transitions

The application uses the `tailwindcss-animate` plugin to define animations:

- Accordion animations
- Fade in/out effects
- Scale animations
- Slide transitions

```jsx
// Example of animation usage
<div className="animate-fade-in">
  Content that fades in
</div>
```

## SVG Icons

The application uses Lucide React icons, which provide a consistent icon set throughout the interface.

```jsx
import { Home, Settings, User } from 'lucide-react';

// Usage example
<Button>
  <Home className="mr-2 h-4 w-4" />
  Home
</Button>
```

## Utility Functions

### CSS Class Utilities

The `cn()` utility function from `@/lib/utils` is used to conditionally combine class names:

```jsx
import { cn } from "@/lib/utils";

// Example usage
<div className={cn(
  "base-class", 
  condition && "conditional-class",
  className
)}>
  Content
</div>
```

## Responsive Design

The application follows a mobile-first approach with breakpoints defined in the Tailwind configuration:

- Default: Mobile (0px+)
- `sm`: Small screens (640px+)
- `md`: Medium screens (768px+)
- `lg`: Large screens (1024px+)
- `xl`: Extra large screens (1280px+)
- `2xl`: 2x Extra large screens (1536px+)

## Best Practices

1. **Component Organization**: UI components are organized in the `src/components/ui` directory
2. **Reusable Patterns**: Common patterns are abstracted into reusable components
3. **Consistent Spacing**: Using Tailwind's spacing scale for consistent margins and padding
4. **Color Consistency**: Using theme color variables instead of arbitrary color values
5. **Accessibility**: Using semantic HTML and ARIA attributes where appropriate

## Layout Structuring

The application uses a combination of:
- Flexbox for one-dimensional layouts
- CSS Grid for two-dimensional layouts
- Container classes for consistent content width
- Auto-margin centering for content alignment
