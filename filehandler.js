import { getStyles, getPropsTally, getHexColorTally } from './styles.js';

const handleFileRead = (error, content) => {
  let string = '';
  let cssColorTally = {};
  let cssPropsTally = {};
  // retrieve styles
  const styles = getStyles(content);
  // remove braces from styles
  const trimmedStyles = styles.map((style) => style.substring(1, style.length - 1).trim());
  // get tally of all properties in a stylesheet
  cssPropsTally = getPropsTally(trimmedStyles);
  // get tally of all colors in a stylesheet
  cssColorTally = getHexColorTally(trimmedStyles);

  // read all entries in COLOR_TALLY_ARR
  // combine in a string to be printed
  const colorTallyArr = Object
    .entries(cssColorTally)
    .sort((a, b) => b[1] - a[1]);

  // read all entries in COLOR_TALLY_ARR
  // combine in a string to be printed
  const cssPropsTallyArr = Object
    .entries(cssPropsTally)
    .sort((a, b) => b[1] - a[1]);

  if (colorTallyArr.length > 0) {
    string += '-------\ncolours:\n-------\n';
  }
  for (let i = 0; i < colorTallyArr.length; i += 1) {
    string += `${colorTallyArr[i][0]}: ${colorTallyArr[i][1]}`;
    string += '\n';
  }
  if (cssPropsTallyArr.length > 0) {
    string += '-------\nstyles:\n-------\n';
  }
  for (let i = 0; i < cssPropsTallyArr.length; i += 1) {
    string += `${cssPropsTallyArr[i][0]}: ${cssPropsTallyArr[i][1]}`;
    if (i !== cssPropsTallyArr.length - 1) {
      string += '\n';
    }
  }

  console.log(string);
};

export default handleFileRead;
