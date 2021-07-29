import { readFile } from 'fs';

const PATH = process.argv[2];
const COLOR_TALLY = {};

const handleFileRead = (error, content) => {
  // Split the content of our file by lines
  const lines = content.split('\n');
  let string = '';

  // On a folder: illegal operation on a directory, read
  // On a file that does not exist: no such file or directory, open 'mystuff2.txt'
  // console.log("error:", error);

  // For each line, log the line number and the content of that line
  for (let i = 0; i < lines.length; i += 1) {
    const COLON_INDEX = lines[i].indexOf(':');
    const HASH_INDEX = lines[i].lastIndexOf('#');
    const SEMICOLON_INDEX = lines[i].lastIndexOf(';');
    // only retrieve hashed values after the colon (as css value)
    if (COLON_INDEX >= 0 && HASH_INDEX > COLON_INDEX) {
      // hex color values begin from hash, ends before semi-colon
      const HEX_COLOR = lines[i].substring(HASH_INDEX, SEMICOLON_INDEX);
      if (HEX_COLOR in COLOR_TALLY) {
        COLOR_TALLY[HEX_COLOR] += 1;
      } else {
        COLOR_TALLY[HEX_COLOR] = 1;
      }
    }
  }

  // render object as array of arrays:
  // 2-index sub-arrays containing key and value
  const COLOR_TALLY_ARR = Object.entries(COLOR_TALLY);
  for (let i = 0; i < COLOR_TALLY_ARR.length; i += 1) {
    string += `${COLOR_TALLY_ARR[i][0]}: ${COLOR_TALLY_ARR[i][1]}`;
    if (i !== COLOR_TALLY_ARR.length - 1) {
      string += '\n';
    }
  }

  console.log(string);
};

readFile(PATH, 'utf8', handleFileRead);
