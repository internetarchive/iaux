import { Range } from './search-models';

export class SearchHelper {
  /**
   * Get the intersection of two ranges and return a range or undefined if they do not intersect
   *
   * @param range1
   * @param range2
   *
   * @returns Range|undefined
   */
  static getIntersection(range1: Range, range2: Range): Range | undefined {
    // get the range with the smaller starting point (min) and greater start (max)
    const minRange: Range = range1.startIndex < range2.startIndex ? range1 : range2;
    const maxRange = minRange === range1 ? range2 : range1;

    // min ends before max starts -> no intersection
    if (minRange.endIndex < maxRange.startIndex) {
      return undefined; // the ranges don't intersect
    }

    const endIndex = minRange.endIndex < maxRange.endIndex ? minRange.endIndex : maxRange.endIndex;
    return new Range(maxRange.startIndex, endIndex);
  }
}
