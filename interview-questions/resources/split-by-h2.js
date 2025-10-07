#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Input and output paths (per user request)
const inputFile = path.join(__dirname, 'interview-questions.md');
const outputDir = path.resolve(__dirname, '..'); // /interview-questions

// Ensure input exists
if (!fs.existsSync(inputFile)) {
  console.error(`Input file not found: ${inputFile}`);
  process.exit(1);
}

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  console.error(`Output directory not found: ${outputDir}`);
  process.exit(1);
}

// Helpers
const h2Regex = /^##\s+(.+)$/;
const detailsOpenRegex = /^:::\s+details\b/;
const detailsCloseRegex = /^:::\s*$/;

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[+]/g, 'plus') // handle C++ etc.
    .replace(/#/g, 'sharp') // handle C# etc.
    .replace(/[^a-z0-9\s-_]/g, '') // remove punctuation except spaces, hyphen, underscore
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

function splitByH2(content) {
  const lines = content.split('\n');
  const sections = [];
  let current = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Start of a new H2 section
    const m = line.match(h2Regex);
    if (m) {
      // Push previous
      if (current) {
        sections.push(current);
      }
      current = { title: m[1].trim(), content: [] };
      // Keep the H2 heading inside the file
      current.content.push(line);
      continue;
    }

    // If inside a section, capture content (skip details containers)
    if (current) {
      if (detailsOpenRegex.test(line) || detailsCloseRegex.test(line)) {
        continue; // strip VitePress details wrappers
      }
      current.content.push(line);
    }
  }

  // Push last section
  if (current) sections.push(current);

  return sections;
}

function writeSections(sections) {
  if (sections.length === 0) {
    console.warn('No H2 sections found.');
    return 0;
  }

  let written = 0;
  for (const section of sections) {
    const name = slugify(section.title);
    const filePath = path.join(outputDir, `${name}.md`);
    const content = section.content.join('\n').trimEnd() + '\n';
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Wrote: ${filePath}`);
    written++;
  }
  return written;
}

function main() {
  console.log(`Input: ${inputFile}`);
  console.log(`Output dir: ${outputDir}`);

  const content = fs.readFileSync(inputFile, 'utf8');
  const sections = splitByH2(content);
  console.log(`Found ${sections.length} H2 sections.`);
  const count = writeSections(sections);
  console.log(`Done. Generated ${count} files.`);
}

main();
