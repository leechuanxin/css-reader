import { rgbToHex } from './conversions.js';

const handleFileRead = (error, content) => {
  // Split the content of our file by lines
  const lines = content.split('\n');
  let string = '';
  const COLOR_TALLY = {};

  // For each line, log the line number and the content of that line
  for (let i = 0; i < lines.length; i += 1) {
    // hex color matching
    // matches "#[any value from 0 - f, 3 characters to 6 characters]"
    const HEX_COLOR_ARR = lines[i].match(/#[a-f0-9]{3,6}/g);
    if (Array.isArray(HEX_COLOR_ARR) && HEX_COLOR_ARR.length > 0) {
      for (let j = 0; j < HEX_COLOR_ARR.length; j += 1) {
        let hexColorString = HEX_COLOR_ARR[j];
        // CSS color shorthand, convert #fff to #ffffff
        if (hexColorString.length === 4) {
          hexColorString = `#${hexColorString.substring(1).split('').map((s) => `${s}${s}`).join('')}`;
        }
        if (hexColorString in COLOR_TALLY) {
          COLOR_TALLY[hexColorString] += 1;
        } else {
          COLOR_TALLY[hexColorString] = 1;
        }
      }
    }

    // rgb color matching
    const RGB_COLOR_ARR = lines[i].match(/(rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)/g);
    if (Array.isArray(RGB_COLOR_ARR) && RGB_COLOR_ARR.length > 0) {
      for (let j = 0; j < RGB_COLOR_ARR.length; j += 1) {
        const HEX_STRING = rgbToHex(RGB_COLOR_ARR[j]);
        if (HEX_STRING in COLOR_TALLY) {
          COLOR_TALLY[HEX_STRING] += 1;
        } else {
          COLOR_TALLY[HEX_STRING] = 1;
        }
      }
    }
  }

  // read all entries in COLOR_TALLY_ARR
  // combine in a string to be printed
  const COLOR_TALLY_ARR = Object
    .entries(COLOR_TALLY)
    .sort((a, b) => b[1] - a[1]);
  for (let i = 0; i < COLOR_TALLY_ARR.length; i += 1) {
    string += `${COLOR_TALLY_ARR[i][0]}: ${COLOR_TALLY_ARR[i][1]}`;
    if (i !== COLOR_TALLY_ARR.length - 1) {
      string += '\n';
    }
  }

  console.log(string);
};

export default handleFileRead;
