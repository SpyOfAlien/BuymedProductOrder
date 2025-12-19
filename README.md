### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

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

Uses a composition-based state management approach with React Context API and custom hooks. In real app may consider using Redux and Zustand

## Key Features Implementation

### Debounced Search

- Search input debounced by 300ms
- Reduces unnecessary API calls
- Implemented with `useDebounce` hook

### Responsive Design

- Mobile-first approach
- Single column on mobile, multi-column on desktop
- Sticky order summary on desktop
- TODO: Sticky Order Summary in bottom of mobile/tablet
