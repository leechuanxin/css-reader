import { rgbToHex } from './conversions.js';
import getStyles from './styles.js';

const handleFileRead = (error, content) => {
  console.log('content:', content);
  // Split the content of our file by lines
  const lines = content.split('\n');
  let string = '';
  const COLOR_TALLY = {};
  const CSS_PROPERTIES_TALLY = {};
  // retrieve styles
  const styles = getStyles(content);
  // remove braces from styles
  const trimmedStyles = styles.map((style) => style.substring(1, style.length - 1).trim());
  console.log('first functions tyles:', trimmedStyles);

  for (let i = 0; i < trimmedStyles.length; i += 1) {
    let styleStr = trimmedStyles[i];

    while (styleStr.length > 0) {
      const COLON_INDEX = styleStr.indexOf(':');
      if (COLON_INDEX > -1) {
        const CSS_PROPERTY_ARR = styleStr
          .substring(0, COLON_INDEX)
          .split(/\s+/);
        const CSS_PROPERTY = CSS_PROPERTY_ARR[CSS_PROPERTY_ARR.length - 1];
        if (CSS_PROPERTY in CSS_PROPERTIES_TALLY) {
          CSS_PROPERTIES_TALLY[CSS_PROPERTY] += 1;
        } else {
          CSS_PROPERTIES_TALLY[CSS_PROPERTY] = 1;
        }
        styleStr = styleStr.substring(COLON_INDEX + 1);
      } else {
        styleStr = '';
      }
    }
  }

  // console.log(styles);
  // console.log('CSS_PROPERTIES_TALLY:', CSS_PROPERTIES_TALLY);

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

  // read all entries in COLOR_TALLY_ARR
  // combine in a string to be printed
  const CSS_PROPERTIES_TALLY_ARR = Object
    .entries(CSS_PROPERTIES_TALLY)
    .sort((a, b) => b[1] - a[1]);

  if (COLOR_TALLY_ARR.length > 0) {
    string += '-------\ncolours:\n-------\n';
  }
  for (let i = 0; i < COLOR_TALLY_ARR.length; i += 1) {
    string += `${COLOR_TALLY_ARR[i][0]}: ${COLOR_TALLY_ARR[i][1]}`;
    string += '\n';
  }
  if (CSS_PROPERTIES_TALLY_ARR.length > 0) {
    string += '-------\nstyles:\n-------\n';
  }
  for (let i = 0; i < CSS_PROPERTIES_TALLY_ARR.length; i += 1) {
    string += `${CSS_PROPERTIES_TALLY_ARR[i][0]}: ${CSS_PROPERTIES_TALLY_ARR[i][1]}`;
    if (i !== CSS_PROPERTIES_TALLY_ARR.length - 1) {
      string += '\n';
    }
  }

  console.log(string);
};

export default handleFileRead;
