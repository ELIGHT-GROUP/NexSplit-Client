
---

## 1️⃣ Install Zustand

```bash
npm install zustand
```

---

## 2️⃣ Create a theme store

```ts
// themeStore.ts
import { create } from 'zustand';

type ThemeState = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light'
    }))
}));
```

---

## 3️⃣ Use the store in your component

```tsx
// App.tsx
import React from 'react';
import { useThemeStore } from './themeStore';

export default function App() {
  const { theme, toggleTheme } = useThemeStore();

  const styles = {
    backgroundColor: theme === 'light' ? '#fff' : '#111',
    color: theme === 'light' ? '#000' : '#fff',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={styles}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} theme
      </button>
    </div>
  );
}
```

---

## 4️⃣ (Optional) Persist theme in `localStorage`

```ts
// themeStore.ts with persistence
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeState = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light'
        }))
    }),
    { name: 'theme-storage' } // key in localStorage
  )
);
```

This way, the theme will **survive page refreshes**.

---

If you want, I can also show you how to integrate this Zustand theme store with **TailwindCSS** or **MUI** so your entire UI respects the theme setting. That would make it a real-world dark mode setup.
