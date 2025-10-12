import { defineConfig } from 'vitepress';
import fs from 'fs';
import path from 'path';

// Build sidebar items from interview-questions directory, excluding resources
const iqDir = path.resolve(process.cwd(), 'interview-questions');
const preferredOrder = [
  'React',
  'JavaScript',
  'NodeJS',
  'Network and Security',
  'HTML/CSS',
  'Operation System',
  'General',
  'Design Patterns',
  'TypeScript',
  'FE Techniques',
];
const h2Regex = /^##\s+(.+)$/m;

function getFirstH2Title(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const m = content.match(h2Regex);
    return m ? m[1].trim() : null;
  } catch {
    return null;
  }
}

function generateInterviewSidebarItems() {
  const entries = fs.readdirSync(iqDir, { withFileTypes: true });
  const mdPattern = /\.md$/i; // regex filter for markdown files
  const files = entries
    .filter((e) => e.isFile() && mdPattern.test(e.name))
    .map((e) => {
      const filePath = path.join(iqDir, e.name);
      const title = getFirstH2Title(filePath) || e.name.replace(mdPattern, '');
      const link = `/interview-questions/${e.name.replace(mdPattern, '')}`;
      return { text: title, link };
    });

  // Sort by preferred order when possible, fallback to alphabetical
  const orderIndex = (title) => {
    const idx = preferredOrder.indexOf(title);
    return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
  };
  files.sort((a, b) => {
    const ai = orderIndex(a.text);
    const bi = orderIndex(b.text);
    if (ai !== bi) return ai - bi;
    return a.text.localeCompare(b.text);
  });

  return files;
}

export default defineConfig({
  title: 'Software Engineer Interview',
  description: 'Comprehensive knowledge base for software engineering interviews',

  // Base URL for GitHub Pages deployment
  base: '/problems-solving/',

  // Ignore dead links to prevent build failures
  ignoreDeadLinks: true,

  themeConfig: {
    // Navigation
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Knowledge Base', link: '/knowledges/' },
      { text: 'Algorithms', link: '/codespaces/algorithms/' },
      { text: 'System Design', link: '/codespaces/system-design/' },
      { text: 'Interview Questions', link: '/interview-questions/resources/interview-questions' },
    ],

    // Sidebar configuration
    sidebar: {
      '/interview-questions/': [
        {
          text: 'Interview Questions',
          items: [
            { text: 'All Questions', link: '/interview-questions/resources/interview-questions' },
            ...generateInterviewSidebarItems(),
          ],
        },
      ],
      '/knowledges/': [
        {
          text: 'Web Development Fundamentals',
          items: [
            { text: 'Web Developer Todo', link: '/knowledges/0. web-developer-todo' },
            { text: 'Loading a Website', link: '/knowledges/1. loading-a-website' },
            { text: 'JavaScript Execution', link: '/knowledges/2. javascript-execution' },
            { text: 'Web Performance', link: '/knowledges/3. web-performance' },
          ],
        },
        {
          text: 'Frontend Technologies',
          items: [
            { text: 'DOM Comparison Guide', link: '/knowledges/DOM-comparison' },
            { text: 'Module Systems', link: '/knowledges/4. module-systems' },
            { text: 'React', link: '/knowledges/5. react' },
            { text: 'TypeScript', link: '/knowledges/6. typescript' },
            { text: 'Bundlers', link: '/knowledges/7. bundler' },
            { text: 'Micro-Frontends', link: '/knowledges/8. microfrontend' },
          ],
        },
        {
          text: 'Security',
          items: [
            { text: 'Security Fundamentals', link: '/knowledges/Security Fundamentals' },
            {
              text: 'Authentication vs Authorization',
              link: '/knowledges/Authentication-vs-authorization',
            },
          ],
        },
        {
          text: 'Research & Comparisons',
          items: [{ text: 'Webpack vs Vite', link: '/knowledges/webpack-vs-vite' }],
        },
      ],
    },

    // Social links
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuquangkhtn/problems-solving' }],

    // Search
    search: {
      provider: 'local',
    },

    // Footer
    footer: {
      message: 'Software Engineer Interview Preparation',
      copyright: 'Copyright © 2024',
    },
  },

  // Markdown configuration
  markdown: {
    html: false,
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    // Strip HTML comments from rendering while keeping html disabled
    config: (md) => {
      md.core.ruler.push('strip_html_comments', (state) => {
        const tokens = state.tokens;
        for (let i = 0; i < tokens.length; i++) {
          const token = tokens[i];
          if (token.type === 'inline' && token.children) {
            token.children = token.children.filter((child) => {
              if (child.type === 'text') {
                const c = child.content.trim();
                if (c.startsWith('<!--') && c.endsWith('-->')) {
                  return false;
                }
              }
              return true;
            });
          }
        }
      });
    },
  },
});
