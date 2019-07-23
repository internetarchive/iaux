import { findKey, reduce } from 'lodash';

/**
 * Gets browser computed style of element
 *
 * @param { DOM element } element-
 * @param { array } attributes - list of attributes you want to get from the element
 *  @return { object } of attributes & their values
 */
export const getComputedStyles = (element, attributes = []) => {
  if (!window) return null;
  const computedStyles = window.getComputedStyle(element);
  const parsedStyles = reduce(attributes, (allAttributes, attr, key) => {
    allAttributes = allAttributes || {};

    const thisAttr = computedStyles[attr] || null;
    if (thisAttr) {
      allAttributes[attr] = parseFloat((thisAttr.split('px'))[0]);
    }
    return allAttributes;
  }, {});

  return parsedStyles;
};

/**
 * Gets full calculated width of element, including left & right margins
 *
 * @param { DOM elememnt } element
 */
export const calculateElementWidth = (element) => {
  if (!window) return null;
  const { offsetWidth } = element;
  const { marginLeft, marginRight } = getComputedStyles(element, ['marginLeft', 'marginRight']);

  return marginLeft + offsetWidth + marginRight;
};

export const getPageToShow = ({
  currentPage,
  scrollThresholds,
  viewportFlush
}) => {
  const matchingThresholds = reduce(scrollThresholds,
    (matches, threshold, key) => {
      matches = matches || {};
      const { low, high } = threshold;
      const isInThreshold = viewportFlush >= low && viewportFlush <= high;
      if (isInThreshold) {
        matches[key] = threshold;
      }
      return matches;
    },
    {});

  const isOnSamePage = !!matchingThresholds[currentPage];
  const pageToShow = isOnSamePage
    ? currentPage
    : findKey(
      scrollThresholds,
      th => viewportFlush >= th.low && viewportFlush <= th.high
    );

  return pageToShow;
};

/**
 * Creates a K:V dictionary of the scroll range of each page
 *
 * @param { number } numberOfColumns
 * @param { number } numberOfPages
 * @param { number } clientWidth
 * @param { boolean } columnsAreOdd
 * @param { number } childWidth
 *
 * @return { object } scrollThreshold
 */
export const getScrollThresholdsByPage = ({
  numberOfColumns,
  numberOfPages,
  clientWidth,
  columnsAreOdd,
  childWidth,
}) => {
  const scrollThresholds = {};

  for (let i = 0; i < numberOfPages; i++) {
    const page = i + 1;
    const previousThreshold = scrollThresholds[page - 1] || {};
    const { high: prevHigh } = previousThreshold;
    const currentLowThreshold = prevHigh && prevHigh + 1;
    let low = currentLowThreshold || clientWidth * (page - 1);
    let high = clientWidth * page;

    if (columnsAreOdd) {
      // odd number of columns need threshold overlap between the last 2 pages

      const columnsMultiplier = Math.ceil(numberOfColumns / numberOfPages);
      const cw = Math.ceil(childWidth);

      const isSecondToLastPage = page === numberOfPages - 1;
      const isLastPage = page === numberOfPages;

      if (isSecondToLastPage && columnsAreOdd) {
        high = Math.ceil((clientWidth * page) + (cw * columnsMultiplier));
      }

      if (isLastPage && columnsAreOdd && page > 1) {
        low = prevHigh - 2 - (cw * (columnsMultiplier + 1));
      }
    }

    scrollThresholds[page] = {
      low,
      high
    };
  }

  return scrollThresholds;
};

/**
 * Takes the flexbox column wrap pagination container and
 * calculates the pertinent information. we need like:
 *
 * @param { DOM element} element
 * @return { object }
 *  - numberOfColumns - number of columns created by flexbox
 *  - numberOfPages - numberOfPages we have
 *  - scrollThresholds - K:V dictionary of the scroll range of each page
 */
export const calculateDimensions = (paginationContainer) => {
  const {
    scrollWidth, clientWidth, offsetWidth, firstElementChild
  } = paginationContainer;
  const numberOfColumns = Math.floor(
    scrollWidth / firstElementChild.offsetWidth
  );

  const columnsAreOdd = !!(numberOfColumns % 2);
  const widthCanAccept3Columns = clientWidth >= 1168;
  const extraWideViewHasOverflow = widthCanAccept3Columns && (numberOfColumns > 3) && (numberOfColumns < 6);

  const numberOfPages = columnsAreOdd || extraWideViewHasOverflow
    ? Math.ceil((scrollWidth / clientWidth).toFixed(1))
    : Math.round((scrollWidth / clientWidth).toFixed(1));

  const childWidth = calculateElementWidth(firstElementChild);

  const scrollThresholds = getScrollThresholdsByPage({
    numberOfColumns,
    numberOfPages,
    clientWidth,
    columnsAreOdd,
    childWidth,
    offsetWidth
  });

  const dimensionsToReturn = {
    numberOfColumns,
    numberOfPages,
    scrollThresholds,
  };
  return dimensionsToReturn;
};
