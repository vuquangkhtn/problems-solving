import { defineConfig } from 'vitepress';

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
    ],

    // Sidebar configuration
    sidebar: {
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
            { text: 'Authentication vs Authorization', link: '/knowledges/Authentication-vs-authorization' },
          ],
        },
        {
          text: 'Research & Comparisons',
          items: [{ text: 'Webpack vs Vite', link: '/knowledges/fun-research/webpack-vs-vite' }],
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
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
});
