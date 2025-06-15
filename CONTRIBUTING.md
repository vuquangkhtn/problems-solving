# 🤝 Contributing to Problem Solving Algorithms Repository

We welcome contributions to this comprehensive collection of algorithms, data structures, and problem-solving solutions! This guide will help you get started with contributing to our TypeScript/JavaScript monorepo.

## 🎆 Ways to Contribute

### 1. 🐛 Bug Reports
- Report bugs in existing algorithm implementations
- Identify performance issues or incorrect solutions
- Point out documentation errors or unclear explanations

### 2. ✨ Feature Requests
- Suggest new algorithms to implement
- Request additional problem categories (LeetCode, CodeForces, etc.)
- Propose new system design patterns
- Request visualization tools or interactive features

### 3. 📄 Code Contributions
- Implement new algorithms and data structures
- Add HackerRank problem solutions
- Create system design implementations
- Optimize existing solutions for better performance
- Add comprehensive test cases

### 4. 📚 Documentation
- Improve README files
- Add algorithm explanations and complexity analysis
- Create tutorial content
- Add code comments and JSDoc documentation

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18+)
- Yarn package manager
- Git
- TypeScript knowledge
- Understanding of algorithms and data structures

### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/problems-solving.git
cd problems-solving

# Install dependencies
yarn install

# Run tests to ensure everything works
yarn test

# Start development
yarn dev
```

## 📋 Project Structure Guidelines

### Adding New Algorithms

1. **Choose the appropriate workspace:**
   - `codespaces/hackerrank/` - For HackerRank-specific problems
   - `codespaces/MergeInterval/` - For interval-related algorithms
   - `codespaces/system-design/` - For system design implementations

2. **File naming convention:**
   - Use descriptive names: `two-sum.ts`, `merge-intervals.ts`
   - For HackerRank problems: match the problem name exactly

3. **Code structure:**
   ```typescript
   /**
    * Problem: [Problem Name]
    * Difficulty: Easy/Medium/Hard
    * Time Complexity: O(n)
    * Space Complexity: O(1)
    * 
    * Description: Brief problem description
    * 
    * @param {type} param - Parameter description
    * @returns {type} Return value description
    */
   export function algorithmName(param: type): returnType {
     // Implementation with clear comments
   }

   // Test cases
   if (import.meta.vitest) {
     const { test, expect } = import.meta.vitest;
     
     test('algorithmName - basic cases', () => {
       expect(algorithmName(input)).toBe(expectedOutput);
     });
   }
   ```

### Documentation Standards

- **Algorithm Explanation**: Include problem statement and approach
- **Complexity Analysis**: Always specify time and space complexity
- **Edge Cases**: Document and test edge cases
- **Examples**: Provide clear input/output examples

## 🔄 Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/algorithm-name
# or
git checkout -b fix/bug-description
# or  
git checkout -b docs/improvement-description
```

### 2. Make Your Changes
- Follow TypeScript best practices
- Write clean, readable code
- Add comprehensive tests
- Update documentation

### 3. Quality Checks
```bash
# Run linting
yarn lint

# Fix linting issues
yarn lint:fix

# Format code
yarn format

# Type checking
yarn type-check

# Run tests
yarn test
```

### 4. Commit Your Changes
```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add binary search algorithm with O(log n) complexity"
# or
git commit -m "fix: correct edge case in merge intervals solution"
# or
git commit -m "docs: improve README with usage examples"
```

### 5. Submit a Pull Request
1. Push your branch: `git push origin feature/algorithm-name`
2. Create a Pull Request on GitHub
3. Fill out the PR template completely
4. Wait for code review and address feedback

## 🎨 Code Style Guidelines

### TypeScript/JavaScript Standards
- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable and function names
- Prefer `const` over `let` when possible
- Use arrow functions for simple operations

### Algorithm Implementation
- Optimize for readability first, then performance
- Include inline comments for complex logic
- Handle edge cases explicitly
- Use descriptive variable names

### Testing
- Write tests for all new algorithms
- Test edge cases and boundary conditions
- Use descriptive test names
- Include performance tests for complex algorithms

## 📝 Pull Request Guidelines

### PR Title Format
- `feat: add [algorithm name] implementation`
- `fix: resolve [issue description]`
- `docs: improve [documentation area]`
- `perf: optimize [algorithm name] performance`
- `test: add tests for [algorithm name]`

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New algorithm implementation  
- [ ] Performance improvement
- [ ] Documentation update
- [ ] Test addition

## Algorithm Details (if applicable)
- **Problem Source**: HackerRank/LeetCode/etc.
- **Difficulty**: Easy/Medium/Hard
- **Time Complexity**: O(?)
- **Space Complexity**: O(?)
- **Category**: Dynamic Programming/Graphs/etc.

## Testing
- [ ] Tests pass locally
- [ ] Added new tests for new functionality
- [ ] Tested edge cases

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console.log statements left in code
```

## 🎯 Algorithm Categories We're Looking For

### High Priority
- **LeetCode Top 150** - Popular interview questions
- **Dynamic Programming** - More complex DP problems
- **Graph Algorithms** - Advanced graph problems
- **System Design** - Scalable system implementations

### Medium Priority
- **String Algorithms** - Advanced pattern matching
- **Tree Algorithms** - Balanced trees, tries
- **Mathematical Algorithms** - Number theory, geometry
- **Bit Manipulation** - Efficient bit operations

### Future Scope
- **Machine Learning Algorithms** - Basic ML implementations
- **Cryptographic Algorithms** - Hashing, encryption
- **Parallel Algorithms** - Multi-threading concepts

## 💆 Code Review Process

1. **Automated Checks**: PR must pass all CI/CD checks
2. **Code Review**: At least one maintainer review required
3. **Testing**: All tests must pass
4. **Documentation**: Adequate documentation required
5. **Performance**: No significant performance regressions

## 🎓 Learning Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Algorithm Design Manual](https://www.algorist.com/)
- [LeetCode Patterns](https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns)
- [System Design Primer](https://github.com/donnemartin/system-design-primer)

## 💬 Community

- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Code of Conduct**: Be respectful and constructive

## 🎆 Recognition

Contributors will be:
- Added to the contributors list
- Mentioned in release notes
- Invited to become maintainers (for significant contributions)

---

**Thank you for contributing to our problem-solving algorithms repository! Your contributions help developers worldwide improve their coding skills and prepare for technical interviews.**

