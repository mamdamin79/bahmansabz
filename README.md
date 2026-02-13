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

## 🔧 Configuration

- **Turborepo**: Configured with tasks for `build`, `dev`, `lint`, `format`, and `typecheck`
- **Biome**: Configured with recommended rules and custom overrides for Next.js files
- **TypeScript**: Strict mode enabled with modern ES features

---

**Happy coding!** 🎉
