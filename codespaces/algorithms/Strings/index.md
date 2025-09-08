# String Algorithms and Patterns

## Overview

String manipulation is one of the most fundamental and frequently tested topics in coding interviews. This guide covers essential string algorithms, common patterns, and optimization techniques that every software engineer should master.

## Core String Operations

### Basic Operations
- **Length**: `s.length` - O(1)
- **Access**: `s[i]` or `s.charAt(i)` - O(1)
- **Substring**: `s.substring(start, end)` - O(n)
- **Concatenation**: `s1 + s2` - O(n + m)
- **Comparison**: `s1 === s2` - O(min(n, m))

### String Building
```typescript
// Inefficient - creates new string each time
let result = "";
for (let i = 0; i < n; i++) {
    result += chars[i]; // O(n²) total
}

// Efficient - use array and join
const parts: string[] = [];
for (let i = 0; i < n; i++) {
    parts.push(chars[i]);
}
const result = parts.join(""); // O(n) total
```

## Common String Patterns

### 1. Character Frequency Analysis
**Use Case**: Anagrams, character counting, permutations

```typescript
function getCharFrequency(s: string): Map<string, number> {
    const freq = new Map<string, number>();
    
    for (const char of s) {
        freq.set(char, (freq.get(char) || 0) + 1);
    }
    
    return freq;
}

function areAnagrams(s1: string, s2: string): boolean {
    if (s1.length !== s2.length) return false;
    
    const freq1 = getCharFrequency(s1);
    const freq2 = getCharFrequency(s2);
    
    if (freq1.size !== freq2.size) return false;
    
    for (const [char, count] of freq1) {
        if (freq2.get(char) !== count) return false;
    }
    
    return true;
}
```

### 2. Sliding Window for Substrings
**Use Case**: Longest substring problems, pattern matching

```typescript
function lengthOfLongestSubstring(s: string): number {
    const seen = new Set<string>();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }
        
        seen.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

function minWindow(s: string, t: string): string {
    const targetFreq = getCharFrequency(t);
    const windowFreq = new Map<string, number>();
    
    let left = 0;
    let minLen = Infinity;
    let minStart = 0;
    let formed = 0;
    const required = targetFreq.size;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        windowFreq.set(char, (windowFreq.get(char) || 0) + 1);
        
        if (targetFreq.has(char) && windowFreq.get(char) === targetFreq.get(char)) {
            formed++;
        }
        
        while (left <= right && formed === required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            
            const leftChar = s[left];
            windowFreq.set(leftChar, windowFreq.get(leftChar)! - 1);
            
            if (targetFreq.has(leftChar) && windowFreq.get(leftChar)! < targetFreq.get(leftChar)!) {
                formed--;
            }
            
            left++;
        }
    }
    
    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}
```

### 3. Palindrome Patterns
**Use Case**: Palindrome detection, longest palindromic substring

```typescript
function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

function longestPalindrome(s: string): string {
    if (!s || s.length < 2) return s;
    
    let start = 0;
    let maxLen = 1;
    
    function expandAroundCenter(left: number, right: number): void {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const currentLen = right - left + 1;
            if (currentLen > maxLen) {
                start = left;
                maxLen = currentLen;
            }
            left--;
            right++;
        }
    }
    
    for (let i = 0; i < s.length; i++) {
        // Odd length palindromes
        expandAroundCenter(i, i);
        // Even length palindromes
        expandAroundCenter(i, i + 1);
    }
    
    return s.substring(start, start + maxLen);
}
```

### 4. String Matching Algorithms

#### KMP (Knuth-Morris-Pratt) Algorithm
```typescript
function buildLPS(pattern: string): number[] {
    const lps = new Array(pattern.length).fill(0);
    let len = 0;
    let i = 1;
    
    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    
    return lps;
}

function KMPSearch(text: string, pattern: string): number[] {
    const lps = buildLPS(pattern);
    const result: number[] = [];
    
    let i = 0; // text index
    let j = 0; // pattern index
    
    while (i < text.length) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }
        
        if (j === pattern.length) {
            result.push(i - j);
            j = lps[j - 1];
        } else if (i < text.length && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    
    return result;
}
```

#### Rabin-Karp Algorithm (Rolling Hash)
```typescript
function rabinKarp(text: string, pattern: string): number[] {
    const base = 256;
    const prime = 101;
    const result: number[] = [];
    
    const patternLen = pattern.length;
    const textLen = text.length;
    
    let patternHash = 0;
    let textHash = 0;
    let h = 1;
    
    // Calculate h = base^(patternLen-1) % prime
    for (let i = 0; i < patternLen - 1; i++) {
        h = (h * base) % prime;
    }
    
    // Calculate hash for pattern and first window
    for (let i = 0; i < patternLen; i++) {
        patternHash = (base * patternHash + pattern.charCodeAt(i)) % prime;
        textHash = (base * textHash + text.charCodeAt(i)) % prime;
    }
    
    // Slide the pattern over text
    for (let i = 0; i <= textLen - patternLen; i++) {
        if (patternHash === textHash) {
            // Check character by character
            let match = true;
            for (let j = 0; j < patternLen; j++) {
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) result.push(i);
        }
        
        // Calculate hash for next window
        if (i < textLen - patternLen) {
            textHash = (base * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + patternLen)) % prime;
            if (textHash < 0) textHash += prime;
        }
    }
    
    return result;
}
```

### 5. String Transformation
**Use Case**: Edit distance, string conversion

```typescript
function editDistance(s1: string, s2: string): number {
    const m = s1.length;
    const n = s2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],     // deletion
                    dp[i][j - 1],     // insertion
                    dp[i - 1][j - 1]  // substitution
                );
            }
        }
    }
    
    return dp[m][n];
}
```

## Advanced String Techniques

### 1. Trie (Prefix Tree)
```typescript
class TrieNode {
    children: Map<string, TrieNode> = new Map();
    isEndOfWord: boolean = false;
}

class Trie {
    private root: TrieNode;
    
    constructor() {
        this.root = new TrieNode();
    }
    
    insert(word: string): void {
        let current = this.root;
        
        for (const char of word) {
            if (!current.children.has(char)) {
                current.children.set(char, new TrieNode());
            }
            current = current.children.get(char)!;
        }
        
        current.isEndOfWord = true;
    }
    
    search(word: string): boolean {
        let current = this.root;
        
        for (const char of word) {
            if (!current.children.has(char)) {
                return false;
            }
            current = current.children.get(char)!;
        }
        
        return current.isEndOfWord;
    }
    
    startsWith(prefix: string): boolean {
        let current = this.root;
        
        for (const char of prefix) {
            if (!current.children.has(char)) {
                return false;
            }
            current = current.children.get(char)!;
        }
        
        return true;
    }
}
```

### 2. Suffix Array and LCP
```typescript
function buildSuffixArray(s: string): number[] {
    const n = s.length;
    const suffixes: Array<{index: number, suffix: string}> = [];
    
    for (let i = 0; i < n; i++) {
        suffixes.push({
            index: i,
            suffix: s.substring(i)
        });
    }
    
    suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));
    
    return suffixes.map(item => item.index);
}

function longestCommonPrefix(s1: string, s2: string): number {
    let i = 0;
    while (i < s1.length && i < s2.length && s1[i] === s2[i]) {
        i++;
    }
    return i;
}
```

## String Validation Patterns

### 1. Parentheses Validation
```typescript
function isValidParentheses(s: string): boolean {
    const stack: string[] = [];
    const pairs: Record<string, string> = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (const char of s) {
        if (char in pairs) {
            if (stack.length === 0 || stack.pop() !== pairs[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}
```

### 2. Regular Expression Matching
```typescript
function isMatch(s: string, p: string): boolean {
    const m = s.length;
    const n = p.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(false));
    
    dp[0][0] = true;
    
    // Handle patterns like a*, a*b*, a*b*c*
    for (let j = 2; j <= n; j += 2) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === '*') {
                dp[i][j] = dp[i][j - 2]; // Zero occurrences
                if (p[j - 2] === '.' || p[j - 2] === s[i - 1]) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j]; // One or more occurrences
                }
            } else if (p[j - 1] === '.' || p[j - 1] === s[i - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }
    
    return dp[m][n];
}
```

## Interview Tips

### Common String Interview Patterns
1. **Character Frequency**: Use HashMap/Map for counting
2. **Sliding Window**: For substring problems
3. **Two Pointers**: For palindromes and comparisons
4. **Dynamic Programming**: For edit distance and pattern matching
5. **Stack**: For parentheses and expression validation

### Optimization Strategies
1. **Avoid String Concatenation**: Use arrays and join
2. **Use Character Codes**: `charCodeAt()` for faster comparisons
3. **Early Termination**: Break loops when possible
4. **Space-Time Tradeoffs**: HashMap vs nested loops

### Edge Cases to Consider
- Empty strings
- Single character strings
- All same characters
- Unicode and special characters
- Case sensitivity
- Null/undefined inputs

## Practice Problems

### Easy
- Valid Anagram
- Valid Palindrome
- Implement strStr()
- Longest Common Prefix
- Reverse String

### Medium
- Longest Substring Without Repeating Characters
- Longest Palindromic Substring
- Group Anagrams
- String to Integer (atoi)
- Minimum Window Substring
- Valid Parentheses

### Hard
- Edit Distance
- Regular Expression Matching
- Wildcard Matching
- Shortest Palindrome
- Text Justification

## Time and Space Complexity

| Algorithm | Time | Space | Use Case |
|-----------|------|-------|----------|
| Character Frequency | O(n) | O(k) | Anagrams, counting |
| Sliding Window | O(n) | O(k) | Substring problems |
| KMP Search | O(n + m) | O(m) | Pattern matching |
| Rabin-Karp | O(n + m) | O(1) | Multiple pattern search |
| Edit Distance | O(n × m) | O(n × m) | String transformation |
| Trie Operations | O(m) | O(ALPHABET_SIZE × N × M) | Prefix matching |

Where:
- n = length of text
- m = length of pattern
- k = size of character set
- N = number of words
- M = average length of words

## Problem Implementations

This directory contains the following problem solutions:

### TypeScript Solutions
- **[Bear and Steady Gene](./Bear%20and%20Steady%20Gene.ts)** - Find minimum substring to make gene steady
- **[Sherlock and Anagrams](./Sherlock%20and%20Anagrams.ts)** - Count anagrammatic pairs in string
- **[Sherlock and the Valid String](./Sherlock%20and%20the%20Valid%20String.ts)** - Determine if string can be made valid

These implementations demonstrate practical applications of the string algorithms and patterns covered in this guide.