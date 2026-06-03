# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> Expo SDK 56 introduced breaking changes. Read the versioned docs at
> https://docs.expo.dev/versions/v56.0.0/ before writing or changing any Expo/RN code.

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml`).

- `pnpm start` — start the Metro dev server (then press `i` / `a` / `w`)
- `pnpm ios` / `pnpm android` / `pnpm web` — launch directly on a target
- `pnpm lint` — `expo lint` (ESLint via the Expo config)
- `pnpm reset-project` — moves the starter into `app-example/` and scaffolds a blank `app/`

No test runner is configured. `tsc` runs in strict mode (`tsconfig.json`).

## Architecture

Fresh `create-expo-app` starter renamed to HogarFlow. Universal app targeting iOS, Android, and web (static output).

- **Routing**: `expo-router` file-based routing rooted at `src/app/`. `src/app/_layout.tsx` is the root layout; routes are `index.tsx` (Home) and `explore.tsx` (Explore). `typedRoutes` is enabled, so route strings are type-checked — keep `href` values in sync with filenames.
- **Path aliases**: `@/*` → `src/*` and `@/assets/*` → `assets/*` (see `tsconfig.json`). Use these, not relative paths.
- **Platform splitting**: Metro resolves `*.web.tsx` over `*.tsx` on web. This is the core pattern here — e.g. `app-tabs.tsx` renders native `NativeTabs` while `app-tabs.web.tsx` renders a custom `expo-router/ui` tab bar. When adding cross-platform UI, follow this split rather than branching on `Platform.OS` inside one file. Same applies to hooks (`use-color-scheme.ts` / `use-color-scheme.web.ts`).
- **Theming**: `src/constants/theme.ts` is the single source of truth — `Colors` (light/dark), `Spacing` scale, `Fonts` (platform-selected), and layout constants (`MaxContentWidth`, `BottomTabInset`). Consume colors via the `useTheme()` hook, not by importing `Colors` raw, unless you specifically need the non-reactive value. `ThemedText` / `ThemedView` wrap RN primitives and pull from the theme — prefer them over bare `Text`/`View`. Web font CSS variables live in `src/global.css`, imported once from `theme.ts`.
- **Experiments enabled** (`app.json`): React Compiler (`reactCompiler`) and `typedRoutes`. React Compiler auto-memoizes — do not hand-roll `useMemo`/`useCallback` for memoization reasons.
- **Splash/animation**: `AnimatedSplashOverlay` (mounted in the root layout) uses `react-native-reanimated` Keyframes with `react-native-worklets` (`scheduleOnRN`) to cross back to the JS thread.
