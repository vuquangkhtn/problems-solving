# 🧩 Problem Solving Algorithms & Data Structures Repository

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)](https://yarnpkg.com/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)
[![GitHub Stars](https://img.shields.io/github/stars/YOUR_USERNAME/problems-solving?style=for-the-badge)](https://github.com/YOUR_USERNAME/problems-solving/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/YOUR_USERNAME/problems-solving?style=for-the-badge)](https://github.com/YOUR_USERNAME/problems-solving/network/members)

> **🎯 Master Coding Interviews & Competitive Programming** | **📚 Learn Data Structures & Algorithms** | **🚀 System Design Patterns**

A comprehensive **open-source collection** of problem-solving algorithms, data structures, and system design implementations in **TypeScript/JavaScript**. Perfect for **coding interview preparation**, **competitive programming**, and **computer science education**. This monorepo contains **500+ solutions** for various coding challenges including **HackerRank problems**, **LeetCode-style questions**, **algorithmic implementations**, and **scalable system design patterns**.

**🔍 Keywords**: `algorithms` `data-structures` `coding-interview` `hackerrank` `leetcode` `typescript` `javascript` `competitive-programming` `system-design` `interview-preparation` `computer-science` `software-engineering` `dynamic-programming` `graph-algorithms` `technical-interview`

## 📁 Project Structure

```
.
├── codespaces/
│   ├── hackerrank/           # HackerRank challenge solutions
│   │   ├── DynamicProgram/   # Dynamic programming problems
│   │   ├── Strings/          # String manipulation problems
│   │   ├── MultiPointers/    # Two-pointer technique problems
│   │   ├── Search/           # Search algorithm problems
│   │   ├── Sortings/         # Sorting algorithm problems
│   │   ├── Implementation/   # Implementation challenges
│   │   └── Constructive Algo/ # Constructive algorithms
│   ├── MergeInterval/        # Merge interval algorithm implementations
│   └── system-design/       # System design patterns and solutions
├── package.json              # Root package.json with workspace configs
├── tsconfig.base.json        # Base TypeScript configuration
└── eslint.base.js           # Base ESLint configuration
```

## 🚀 Workspaces

- **`@problem-solving/hackerrank`**: Comprehensive solutions to HackerRank challenges organized by category
- **`@problem-solving/algorithms`**: Implementation of classic algorithms and merge interval problems
- **`@problem-solving/system-design`**: System design problems, patterns, and architectural solutions

## 🛠️ Tech Stack

- **TypeScript/JavaScript** - Primary programming languages
- **Node.js** - Runtime environment
- **Yarn Workspaces** - Monorepo management
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting
- **ts-node** - TypeScript execution environment

## 🏁 Getting Started

### Prerequisites

- Node.js (version 18+)
- Yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd problems-solving

# Install dependencies for all workspaces
yarn install
```

### Development Commands

```bash
# Build all workspaces
yarn build

# Start development mode (runs React workspace)
yarn dev

# Lint all workspaces
yarn lint

# Fix linting issues across all workspaces
yarn lint:fix

# Format code in all workspaces
yarn format

# Type check all workspaces
yarn type-check

# Clean build artifacts
yarn clean
```

## 📝 Workspace-specific Commands

You can run commands for individual workspaces:

```bash
# HackerRank solutions
yarn workspace @problem-solving/hackerrank dev
yarn workspace @problem-solving/hackerrank build
yarn workspace @problem-solving/hackerrank lint

# Algorithm implementations
yarn workspace @problem-solving/algorithms dev
yarn workspace @problem-solving/algorithms build

# System design
yarn workspace @problem-solving/system-design dev
yarn workspace @problem-solving/system-design build
```

## 📚 Problem Categories

### HackerRank Solutions
- **Dynamic Programming**: Optimal substructure and overlapping subproblems
- **String Algorithms**: Pattern matching, anagrams, and string manipulation
- **Two Pointers**: Efficient array/string traversal techniques
- **Search Algorithms**: Binary search, linear search variations
- **Sorting Algorithms**: Custom sorting implementations and applications
- **Implementation**: Logic and simulation problems
- **Constructive Algorithms**: Building solutions step by step

### Core Algorithms
- **Merge Intervals**: Overlapping interval problems and solutions
- **Data Structures**: Implementation of fundamental data structures
- **Graph Algorithms**: Traversal, shortest path, and connectivity problems

### System Design
- **Scalability Patterns**: Load balancing, caching, database sharding
- **Architecture Patterns**: Microservices, event-driven architecture
- **Distributed Systems**: Consensus algorithms, fault tolerance

## 🧪 Running Solutions

Most solutions can be executed directly:

```bash
# Run a specific TypeScript solution
cd codespaces/hackerrank/DynamicProgram/CommonChild
ts-node index.ts

# Run JavaScript solutions
node solution.js
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-algorithm`)
3. Commit your changes (`git commit -am 'Add new algorithm implementation'`)
4. Push to the branch (`git push origin feature/new-algorithm`)
5. Create a Pull Request

### Code Style

- Follow TypeScript/JavaScript best practices
- Use meaningful variable and function names
- Add comments for complex algorithms
- Include time and space complexity analysis
- Ensure all linting rules pass

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

For questions or suggestions, please open an issue or reach out via email.

---

⭐ **Star this repository if you find it helpful!**
