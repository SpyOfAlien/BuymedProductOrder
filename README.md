### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
app/
  globals.css
  layout.tsx
  page.tsx
components/
  feature/
    cart/
      cart-item.tsx
    product/
      product-item.tsx
  ui/
    button.tsx
contexts/
  cart-context.tsx
hooks/
  use-debounce.ts
lib/
  utils.ts
  api/
    products.ts
  mock/
    products.ts
types/
  cart.ts
```

### Why this structure

Follows **feature-based architecture** combined with **atomic design principles** for scalability and maintainability:

- **`components/`**:
  - `ui/`: Reusable UI components (buttons, inputs, cards) following atomic design
  - `feature/`: Feature-specific components organized by domain (cart, product)
- **`contexts/`**: React Context providers for global state management
- **`hooks/`**: Custom React hooks for shared logic and side effects
- **`lib/`**:
  - `api/`: API integration functions
  - `mock/`: Mock data for development and testing
  - `utils.ts`: Utility functions
- **`types/`**: TypeScript type definitions for type safety

This organization promotes:

- **Separation of concerns**: UI, business logic, and data layers are clearly separated
- **Reusability**: UI components can be reused across features
- **Scalability**: Easy to add new features without affecting existing code
- **Maintainability**: Related code is co-located, making it easier to find and modify
- **TODO**: For a real-world project, pages-level components would be added and organized using Next.js Route Groups feature for better code splitting and organization, but this project keeps it simple for demonstration purposes

## Component Structure

This application follows **Composition Pattern** combined with **Atomic Design** principles

### Composition Pattern

The application uses **Component Composition** to create flexible, reusable components:

**Example: ProductList Component**

```tsx
<ProductList initialProducts={products}>
  <div className="flex gap-4 mb-6">
    <ProductListSearch />
    <ProductListFilter />
  </div>
  <ProductListContent />
</ProductList>
```

## State Management

### Composition-Based State Management

- Uses a composition-based state management approach with React Context API and custom hooks.
- When the app grows larger, consider using Redux and Zustand to manage global state.

**Benefits of this approach:**

- **Simplicity**: No external dependencies required - leverages built-in React features
- **Type Safety**: Full TypeScript support with proper type inference
- **Composability**: Easy to compose and reuse state logic across components
- **Performance**: Can be optimized using React's built-in memoization (useMemo, useCallback)
- **Testing**: Custom hooks can be tested in isolation, improving testability

## Responsive design decisions

- Mobile-first approach
- Single column on mobile, multi-column on desktop
- Sticky order summary on desktop let use always see their Summary
- TODO: Sticky Order Summary in bottom of mobile/tablet
