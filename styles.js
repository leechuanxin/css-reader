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
