# Bahmansabz

A modern monorepo built with **Turborepo**, **Next.js**, and **Biome** for code quality.

## 🏗️ Architecture

This project is structured as a **Turborepo monorepo** with the following structure:

```
bahmansabz/
├── apps/
│   └── web/          # Next.js application
├── libs/             # Shared libraries
└── package.json      # Root workspace configuration
```

### Tech Stack

**Frontend (Web App)**
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Chakra UI v3** - Component library with theming and dark mode
- **next-themes** - Theme provider (light/dark) used with Chakra
- **Zustand** - Client-side auth state

**Development Tools**
- **Turborepo** - Monorepo build system
- **Biome** - Linting and formatting
- **Yarn 4** - Package manager

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.9.0 or higher
- **Yarn** 4.10.2 (recommended)
- **Git**

### Installation

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Start the development server:**
   ```bash
   yarn dev
   ```

The application will be available at:
- **Web App:** http://localhost:3000

## 📦 Available Scripts

### Root Level Commands

```bash
# Development
yarn dev                 # Start all applications in development mode
yarn build              # Build all applications for production
yarn lint               # Run linting across all packages
yarn lint:fix           # Fix linting issues automatically
yarn format             # Format code with Biome
yarn format:check       # Check code formatting
yarn typecheck          # Run TypeScript type checking

# Utilities
yarn clean              # Clean all build artifacts and node_modules
```

### Individual App Commands

**Web App:**
```bash
cd apps/web
yarn dev                # Start Next.js development server
yarn build              # Build Next.js for production
yarn start              # Start Next.js in production mode
yarn lint               # Run Biome linting
yarn typecheck          # Run TypeScript type checking
```

## 📁 Project Structure

- `apps/web/` - Next.js application
- `libs/` - Shared libraries and packages
- `turbo.json` - Turborepo pipeline configuration
- `biome.json` - Biome linting and formatting configuration

## 🎨 Chakra UI

The web app uses **Chakra UI v3** for layout and components, with **next-themes** for light/dark mode.

### Setup

- **Provider** (`app/provider.tsx`): Wraps the app with `ThemeProvider` (next-themes) and `ChakraProvider` using `defaultSystem`. Theme is driven by `attribute="class"` for dark mode.
- **Next.js**: `next.config.ts` uses `optimizePackageImports: ["@chakra-ui/react"]` so only used Chakra components are bundled.

### Where it’s used

| Area | Chakra usage |
|------|----------------|
| **Layout** | `Provider` (ChakraProvider + ThemeProvider) |
| **Header** | `Box`, `Flex`, `Heading`, `HStack`, `Link` (emerald header bar) |
| **Account nav** | `Box`, `Button`, `HStack`, `Link`, `Spinner`, `Text` (login/profile/logout) |
| **Home** | `Container`, `VStack`, `Heading`, `Text` (with `_dark` for gray text) |
| **Login** | `Box`, `Center`, `Heading`, `Spinner`, `VStack`; form uses `Field`, `Input`, `Stack`, `Button` |
| **Profile** | `Container`, `SimpleGrid`, `Box`, `VStack`, `Heading`, `Text` (cards with `_dark` borders/backgrounds) |

### Theming

- **Colors**: Emerald is used as the primary brand (e.g. header `emerald.700`, login button `colorScheme="emerald"`).
- **Dark mode**: Supported via `_dark` props (e.g. `_dark={{ bg: "gray.800", borderColor: "gray.700" }}`) and next-themes class.

---

## 🔐 Authentication

Auth is **cookie-based** with encrypted server-side session and **silent token refresh** in middleware.

### Flow overview

1. **Login**: User submits credentials → `loginAction` calls `NEXT_PUBLIC_API_URL/auth/login` → on success, `SetAuthCookieAction` stores an **encrypted JWT** in the `bahmansabz-session` cookie (httpOnly, secure, sameSite strict).
2. **Session cookie**: The cookie value is a **signed JWT** (HS256 via `jose`) containing access token, refresh token, and expiry timestamps. Decryption uses `JWT_SECRET`.
3. **Middleware** (`app/core/middleware/auth.ts`) runs on `/profile` and `/login`:
   - **No session** + protected route → redirect to `/login?callbackUrl=...`.
   - **Session present**: Decrypt; if **access token expired** but **refresh token valid** → POST to API `auth/refresh` → `SetAuthCookieAction` with new tokens → redirect to same URL so the next request has the new cookie.
   - **Refresh token expired** → delete cookie, redirect to `/login`.
   - **Valid session** on auth route (e.g. `/login`) → redirect to `/`.
4. **Client state**: Zustand store (`_stores/auth.store.ts`) holds `status` (loading | authenticated | unauthenticated) and `session`. On load it calls `GET /api/auth/session`; after login it calls `updateSession()` then redirects to profile.
5. **Logout**: Client calls `POST /api/auth/logout` (clears cookie), then `clearSession()` and redirect to home.

### Key pieces

| Piece | Role |
|-------|------|
| **Cookie** | `bahmansabz-session` (encrypted session JWT) |
| **Auth routes** | `/login` (middleware redirects authenticated users away) |
| **Protected routes** | `/profile` (and any path under it); add more in `auth.ts` if needed |
| **Server actions** | `loginAction`, `SetAuthCookieAction` (`_actions/auth-actions.ts`) |
| **Session utils** | `encryptSession` / `decryptSession`, `getEncryptedSessionFromAuthResponse` (`utils/session.ts`) |
| **API routes** | `GET /api/auth/session` (returns decrypted session or 401), `POST /api/auth/logout` (deletes cookie) |

### Environment

- **`NEXT_PUBLIC_API_URL`**: Base URL for auth API (login, refresh, `/auth/me`).
- **`JWT_SECRET`**: Used to sign/verify the session JWT; must be set in production.

---

## 🔧 Configuration

- **Turborepo**: Configured with tasks for `build`, `dev`, `lint`, `format`, and `typecheck`
- **Biome**: Configured with recommended rules and custom overrides for Next.js files
- **TypeScript**: Strict mode enabled with modern ES features

---

**Happy coding!** 🎉
