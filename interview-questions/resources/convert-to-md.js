#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Input and output file paths
const inputFile = path.join(__dirname, 'Interview-Questions.txt');
const outputFile = path.join(__dirname, 'interview-questions.md');

// Function to read and parse the tab-separated file
function parseInterviewQuestions(filePath) {
  try {
    // Read the file content
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Split the content into lines
    const lines = fileContent.split('\n');

    // Skip the header lines (first 6 lines)
    const dataLines = lines.slice(6);

    // Parse each line
    const questions = [];

    const decodeField = (text) => {
      if (typeof text !== 'string') return text;
      return text.replace(/\\n/g, '\n');
    };

    for (const line of dataLines) {
      if (line.trim() === '') continue; // Skip empty lines

      // Split by tabs
      const columns = line.split('\t');

      // Ensure we have at least 5 columns
      if (columns.length >= 5) {
        const question = {
          id: columns[0],
          noteType: columns[1],
          category: columns[2],
          questionText: decodeField(columns[3]),
          answerText: decodeField(columns[4]),
        };

        questions.push(question);
      }
    }

    return questions;
  } catch (error) {
    console.error('Error parsing file:', error);
    return [];
  }
}

// Function to group questions by category
function groupByCategory(questions) {
  const groupedQuestions = {};

  for (const question of questions) {
    if (!groupedQuestions[question.category]) {
      groupedQuestions[question.category] = [];
    }

    groupedQuestions[question.category].push(question);
  }

  return groupedQuestions;
}

// Function to generate markdown content
function generateMarkdown(groupedQuestions) {
  let markdown = '# Interview Questions\n\n';

  // Add a note about the hidden metadata
  markdown +=
    '<!-- This file was generated from a tab-separated file. Each question contains hidden metadata (ID and note type) in HTML comments. -->\n\n';

  // Process each category
  for (const category in groupedQuestions) {
    // Extract the category name (after the :: if present)
    const categoryParts = category.split('::');
    const categoryName = categoryParts.length > 1 ? categoryParts[1] : category;

    markdown += `## ${categoryName}\n\n`;

    // Process each question in the category
    for (const question of groupedQuestions[category]) {
      // Add the question as H3
      markdown += `### ${question.questionText}\n`;

      // Add hidden metadata in HTML comment
      markdown += `<!-- id: ${question.id}, noteType: ${question.noteType} -->\n\n`;

      // Add the answer
      markdown += `${question.answerText}\n\n`;
    }
  }

  return markdown;
}

// Main function
async function main() {
  console.log('Parsing interview questions...');
  const questions = parseInterviewQuestions(inputFile);

  console.log(`Found ${questions.length} questions.`);

  console.log('Grouping questions by category...');
  const groupedQuestions = groupByCategory(questions);

  console.log('Generating markdown...');
  const markdown = generateMarkdown(groupedQuestions);

  // Wrap each H2 section in VitePress details containers and keep H2 inside
  function wrapH2Sections(content) {
    const lines = content.split('\n');
    const result = [];
    let i = 0;

    // Copy everything until first H2 or existing details
    while (i < lines.length && !/^##\s+/.test(lines[i]) && !/^::: details\s+/.test(lines[i])) {
      result.push(lines[i]);
      i++;
    }

    while (i < lines.length) {
      const line = lines[i];

      // Handle already wrapped details: ensure H2 exists inside
      const detailsMatch = line.match(/^::: details\s+(.+)$/);
      if (detailsMatch) {
        const title = detailsMatch[1].trim();
        result.push(line);

        // Ensure a blank line after details header
        if (lines[i + 1] && lines[i + 1].trim() !== '') {
          result.push('');
        }
        // Insert H2 heading inside details if missing
        let nextIdx = i + 1;
        while (nextIdx < lines.length && lines[nextIdx].trim() === '') {
          nextIdx++;
        }
        const expectedHeading = `## ${title}`;
        if (nextIdx >= lines.length || lines[nextIdx].trim() !== expectedHeading) {
          result.push(expectedHeading);
        }

        // Advance and copy content until details close
        i++;
        while (i < lines.length && lines[i].trim() !== ':::') {
          result.push(lines[i]);
          i++;
        }
        if (i < lines.length && lines[i].trim() === ':::') {
          result.push(lines[i]);
          i++;
        }
        continue;
      }

      // Wrap H2 sections, keeping the H2 inside the details content
      if (/^##\s+/.test(line)) {
        const title = line.replace(/^##\s+/, '').trim();
        // Open details container
        result.push(`::: details ${title}`);
        result.push('');
        // Keep original H2 inside the details content
        result.push(line);

        // Collect section content until next H2 or EOF
        i++;
        while (i < lines.length && !/^##\s+/.test(lines[i])) {
          result.push(lines[i]);
          i++;
        }

        // Close details container
        result.push(':::');
      } else {
        // Safety: pass-through any unexpected lines
        result.push(line);
        i++;
      }
    }

    return result.join('\n');
  }

  console.log('Wrapping H2 sections in details containers...');
  const wrapped = wrapH2Sections(markdown);

  console.log('Writing to output file...');
  fs.writeFileSync(outputFile, wrapped.endsWith('\n') ? wrapped : `${wrapped}\n`);

  console.log(`Successfully converted to markdown. Output file: ${outputFile}`);
}

// Run the script
main().catch((err) => {
  console.error('Error executing script:', err);
  process.exit(1);
});
