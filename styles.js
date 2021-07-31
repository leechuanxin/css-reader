const getStyles = (text) => {
  let stylesheet = text;
  const styles = [];
  while (stylesheet.length > 0) {
    const OPEN_BRACE_INDEX = stylesheet.indexOf('{');
    const CLOSE_BRACE_INDEX = stylesheet.indexOf('}');
    // no more existing styles, end loop
    if (OPEN_BRACE_INDEX === -1) {
      stylesheet = '';
    }
    // next valid style: has opening brace and close brace
    else if (CLOSE_BRACE_INDEX > OPEN_BRACE_INDEX) {
      styles.push(stylesheet.substring(OPEN_BRACE_INDEX, CLOSE_BRACE_INDEX + 1));
      stylesheet = stylesheet.substring(CLOSE_BRACE_INDEX + 1);
    }
    // no close brace detected
    else {
      styles.push(stylesheet.substring(OPEN_BRACE_INDEX));
      // end styles
      stylesheet = '';
    }
  }

  return styles;
};

export default getStyles;
