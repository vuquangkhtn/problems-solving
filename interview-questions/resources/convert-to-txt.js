#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Input and output file paths
const inputFile = path.join(__dirname, 'interview-questions.md');
const outputFile = path.join(__dirname, 'Interview-Questions.txt');

// Ensure the input file exists
if (!fs.existsSync(inputFile)) {
  console.error(`Input file not found: ${inputFile}`);
  process.exit(1);
}

// Regular expressions for parsing the markdown file
const categoryRegex = /^## (.+)$/;
const questionRegex = /^### (.+)$/;
const metadataRegex = /<!-- id: (.+), noteType: (.+) -->/;

// Function to generate a random ID with the same length as the original IDs (10 characters)
function generateRandomId() {
  // Define the character set to use for the ID
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  // Generate a random 10-character ID
  let id = '';
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    id += chars[randomIndex];
  }

  return id;
}

// Function to parse the markdown file
function parseMarkdownFile(filePath) {
  try {
    // Read the file content
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Split the content into lines
    const lines = fileContent.split('\n');

    // Initialize variables
    const questions = [];
    let currentCategory = '';
    let currentQuestion = '';
    let currentId = '';
    let currentNoteType = 'Basic-66869'; // Default note type
    let currentAnswer = '';
    let isReadingAnswer = false;
    let foundMetadata = false;

    // Process each line
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Skip VitePress details container markers
      if (/^:::\s+details\b/.test(line) || line.trim() === ':::') {
        continue;
      }

      // Check if it's a category line
      const categoryMatch = line.match(categoryRegex);
      if (categoryMatch) {
        // If we were reading an answer, save the previous question
        if (isReadingAnswer && currentQuestion) {
          // If no ID was found, generate a random one
          if (!currentId) {
            currentId = generateRandomId();
          }

          questions.push({
            id: currentId,
            noteType: currentNoteType,
            category: `Interview Quesions::${currentCategory}`,
            questionText: currentQuestion,
            answerText: currentAnswer.trim(),
          });

          // Reset variables
          currentAnswer = '';
          currentId = '';
          currentNoteType = 'Basic-66869'; // Reset to default
          isReadingAnswer = false;
          foundMetadata = false;
        }

        currentCategory = categoryMatch[1];
        continue;
      }

      // Check if it's a question line
      const questionMatch = line.match(questionRegex);
      if (questionMatch) {
        // If we were reading an answer, save the previous question
        if (isReadingAnswer && currentQuestion) {
          // If no ID was found, generate a random one
          if (!currentId) {
            currentId = generateRandomId();
          }

          questions.push({
            id: currentId,
            noteType: currentNoteType,
            category: `Interview Quesions::${currentCategory}`,
            questionText: currentQuestion,
            answerText: currentAnswer.trim(),
          });
        }

        // Start a new question
        currentQuestion = questionMatch[1];
        currentAnswer = '';
        currentId = ''; // Reset ID
        currentNoteType = 'Basic-66869'; // Reset to default
        isReadingAnswer = false;
        foundMetadata = false;
        continue;
      }

      // Check if it's a metadata line
      const metadataMatch = line.match(metadataRegex);
      if (metadataMatch) {
        // Extract and sanitize ID: remove surrounding double quotes if present
        let extractedId = metadataMatch[1].trim();
        if (extractedId.startsWith('"') && extractedId.endsWith('"')) {
          extractedId = extractedId.slice(1, -1);
        }
        currentId = extractedId;
        currentNoteType = metadataMatch[2];
        isReadingAnswer = true;
        foundMetadata = true;
        continue;
      }

      // If we have a question but no metadata yet, and we're at the line after the question,
      // start reading the answer even without metadata
      if (
        currentQuestion &&
        !foundMetadata &&
        !isReadingAnswer &&
        i > 0 &&
        lines[i - 1].match(questionRegex)
      ) {
        isReadingAnswer = true;
      }

      // If we're reading an answer, add the line to the current answer
      if (isReadingAnswer) {
        // Skip empty lines at the beginning of the answer
        if (currentAnswer === '' && line.trim() === '') {
          continue;
        }

        // Add the line to the answer
        currentAnswer += (currentAnswer ? '\n' : '') + line;
      }
    }

    // Add the last question if there is one
    if (isReadingAnswer && currentQuestion) {
      // If no ID was found, generate a random one
      if (!currentId) {
        currentId = generateRandomId();
      }

      questions.push({
        id: currentId,
        noteType: currentNoteType,
        category: `Interview Quesions::${currentCategory}`,
        questionText: currentQuestion,
        answerText: currentAnswer.trim(),
      });
    }

    return questions;
  } catch (error) {
    console.error('Error parsing file:', error);
    return [];
  }
}

// Function to generate the tab-separated file
function generateTabSeparatedFile(questions, outputPath) {
  try {
    const sanitizeId = (id) => {
      if (typeof id !== 'string') return id;
      const trimmed = id.trim();
      return trimmed.startsWith('"') && trimmed.endsWith('"') ? trimmed.slice(1, -1) : trimmed;
    };
    // Ensure each field is a single line with encoded line breaks and no tabs
    const sanitizeField = (text) => {
      if (typeof text !== 'string') return text;
      return text
        .replace(/\r?\n|\r/g, '\\n') // encode newlines as literal tokens
        .replace(/\t/g, ' ') // replace tabs with space
        .replace(/\s+/g, ' ') // collapse consecutive whitespace
        .trim();
    };
    // Create the header
    const header = [
      '#separator:tab',
      '#html:false',
      '#guid column:1',
      '#notetype column:2',
      '#deck column:3',
      '#tags column:6',
    ].join('\n');

    // Create the content
    const content = questions
      .map((q) => {
        return [
          sanitizeId(q.id),
          sanitizeField(q.noteType),
          sanitizeField(q.category),
          sanitizeField(q.questionText),
          sanitizeField(q.answerText),
          '', // Empty column for tags
        ].join('\t');
      })
      .join('\n');

    // Combine header and content
    const fileContent = header + '\n' + content;

    // Write to file
    fs.writeFileSync(outputPath, fileContent);

    return true;
  } catch (error) {
    console.error('Error generating file:', error);
    return false;
  }
}

// Main function
async function main() {
  console.log(`Input file: ${inputFile}`);
  console.log(`Output file: ${outputFile}`);

  console.log('Parsing markdown file...');
  const questions = parseMarkdownFile(inputFile);

  console.log(`Found ${questions.length} questions.`);

  // Log a few questions to verify ID generation
  if (questions.length > 0) {
    console.log('Sample questions:');
    for (let i = 0; i < Math.min(3, questions.length); i++) {
      console.log(
        `Question ${i + 1}: ID=${questions[i].id}, Question=${questions[i].questionText.substring(0, 30)}...`
      );
    }
  }

  console.log('Generating tab-separated file...');
  const success = generateTabSeparatedFile(questions, outputFile);

  if (success) {
    console.log(`Successfully converted to tab-separated file. Output file: ${outputFile}`);

    // Verify the file was created
    if (fs.existsSync(outputFile)) {
      const stats = fs.statSync(outputFile);
      console.log(`File size: ${stats.size} bytes`);
    } else {
      console.error(`Warning: Output file not found after writing: ${outputFile}`);
    }
  } else {
    console.error('Failed to generate tab-separated file.');
  }
}

// Run the script
main().catch((err) => {
  console.error('Error executing script:', err);
  process.exit(1);
});
