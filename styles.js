import { rgbToHex } from './conversions.js';

/**
 * A function that returns the styles in the stylesheet, together with their braces
 * @param  text {string} the entire text content of file read
 * @return {array}   the content in an array, split into different styles
 */
export const getStyles = (text) => {
  let stylesheet = text;
  const styles = [];
  while (stylesheet.length > 0) {
    const openBraceIndex = stylesheet.indexOf('{');
    const closeBraceIndex = stylesheet.indexOf('}');
    // no more existing styles, end loop
    if (openBraceIndex === -1) {
      stylesheet = '';
    }
    // next valid style: has opening brace and close brace
    else if (closeBraceIndex > openBraceIndex) {
      styles.push(stylesheet.substring(openBraceIndex, closeBraceIndex + 1));
      stylesheet = stylesheet.substring(closeBraceIndex + 1);
    }
    // no close brace detected
    else {
      styles.push(stylesheet.substring(openBraceIndex));
      // end loop
      stylesheet = '';
    }
  }

  return styles;
};

/**
 * A function that tallies the count a CSS property appears
 * @param  arr {array} styles with braces and trailing/leading spaces removed
 * @return {object}   tally with number of appearances of all CSS properties
 */
export const getPropsTally = (arr) => {
  const propsTally = {};
  for (let i = 0; i < arr.length; i += 1) {
    let propsValueStr = arr[i];
    while (propsValueStr.length > 0) {
      const colonIndex = propsValueStr.indexOf(':');
      // background-color: #ffffff;
      // color: #000;
      if (colonIndex > -1) {
        const propArr = propsValueStr
          // get string from start up till next property (marked by colon)
          .substring(0, colonIndex)
          .trim()
          // remove whitespaces between value and next property (if any)
          .split(/\s+/);

        // if only property is found, propArr will have length 1
        // if CURRENT value and NEXT property are in string,
        // the last item of the split will be the property
        const prop = propArr[propArr.length - 1];
        if (prop in propsTally) {
          propsTally[prop] += 1;
        } else {
          propsTally[prop] = 1;
        }
        propsValueStr = propsValueStr.substring(colonIndex + 1);
      } else {
        propsValueStr = '';
      }
    }
  }

  return propsTally;
};

export const getHexColorTally = (arr) => {
  const colorTally = {};
  // For each line, log the line number and the content of that line
  for (let i = 0; i < arr.length; i += 1) {
    // hex color matching
    // matches "#[any value from 0 - f, 3 characters to 6 characters]"
    const hexColorArr = arr[i].match(/#[a-f0-9]{3,6}/g);
    // using .match, hexColorArr will be an array if there is length > 0
    // otherwise, it will be null. thus, no need for a length check
    if (Array.isArray(hexColorArr)) {
      for (let j = 0; j < hexColorArr.length; j += 1) {
        let hexColorString = hexColorArr[j];
        // CSS color shorthand, convert #fff to #ffffff
        if (hexColorString.length === 4) {
          hexColorString = `#${hexColorString.substring(1).split('').map((s) => `${s}${s}`).join('')}`;
        }
        if (hexColorString in colorTally) {
          colorTally[hexColorString] += 1;
        } else {
          colorTally[hexColorString] = 1;
        }
      }
    }

    // rgb color matching
    // matches "rgb([1 to 3 digit number], [1 to 3 digit number], [1 to 3 digit number])",
    // including any spaces between the characters
    const rgbColorArr = arr[i].match(/(rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)/g);
    // using .match, rgbColorArr will be an array if there is length > 0
    // otherwise, it will be null. thus, no need for a length check
    if (Array.isArray(rgbColorArr)) {
      for (let j = 0; j < rgbColorArr.length; j += 1) {
        const hexString = rgbToHex(rgbColorArr[j]);
        if (hexString in colorTally) {
          colorTally[hexString] += 1;
        } else {
          colorTally[hexString] = 1;
        }
      }
    }
  }

  return colorTally;
};
