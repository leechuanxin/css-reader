import { readFile } from 'fs';

const PATH = process.argv[2];

const handleFileRead = (error, content) => {
  // Split the content of our file by lines
  const lines = content.split('\n');

  // On a folder: illegal operation on a directory, read
  // On a file that does not exist: no such file or directory, open 'mystuff2.txt'
  // console.log("error:", error);

  // For each line, log the line number and the content of that line
  for (let i = 0; i < lines.length; i += 1) {
    const COLON_INDEX = lines[i].indexOf(':');
    const HASH_INDEX = lines[i].lastIndexOf('#');
    const SEMICOLON_INDEX = lines[i].lastIndexOf(';');
    if (COLON_INDEX >= 0 && HASH_INDEX > COLON_INDEX) {
      console.log(lines[i].substring(HASH_INDEX, SEMICOLON_INDEX));
    }
  }
};

readFile(PATH, 'utf8', handleFileRead);
