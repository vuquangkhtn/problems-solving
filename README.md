# Problem Solving Monorepo

This monorepo contains various problem-solving workspaces:

## Workspaces

- `@problem-solving/algorithms`: Implementation of various algorithms and data structures
- `@problem-solving/react`: React-based problem-solving implementations
- `@problem-solving/system-design`: System design problems and solutions

## Getting Started

```bash
# Install dependencies
yarn install

# Development
yarn dev       # Start all workspaces in development mode
yarn build     # Build all workspaces
yarn lint      # Lint all workspaces
yarn lint:fix  # Fix linting issues
yarn format    # Format code
```

## Workspace-specific Commands

You can run commands for specific workspaces:

```bash
yarn workspace @problem-solving/algorithms dev
yarn workspace @problem-solving/react dev
yarn workspace @problem-solving/system-design dev
```

## Tech Stack

- TypeScript
- React (for frontend implementations)
- ESLint & Prettier for code quality
- Yarn Workspaces for monorepo management

## Project Structure

```
.
├── codespaces/
│   ├── algorithms/     # Algorithms implementations
│   ├── react/         # React-based implementations
│   └── system-design/ # System design solutions
├── package.json       # Root package.json
├── tsconfig.base.json # Base TypeScript configuration
└── eslint.base.js    # Base ESLint configuration
```
