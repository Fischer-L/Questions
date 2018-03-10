
/**
 * Q1. Write a function that takes a string as input and returns the string reversed. 
 * Please implement reverse function or method by yourself .
 * Example: Given s = "hello", return "olleh". 
 *
 * @param str {String} the string to reverse
 */
export function reverseString(str) {
  let newStr = "";
  for (let i = str.length - 1; i >= 0; --i) {
    newStr += str[i];
  }
  return newStr;
}

/**
 * Q2. Given a positive integer num, write a function which returns True if num is a perfect square else False. 
 * Note: Do not use any built-in library function such as sqrt. 
 * Example 1: 
 * Input: 16 
 * Returns: True 
 *
 * @param n {Number} the number to test if it is a sqaure number
 */
export function isSquare(n) {
  // Here we utilize the arithmetic progression.
  // Consider the sequence of { 1, 3, 5, ..., 2n - 1 }.
  // We know:
  // SUM = 1 + 3 + 5 + ... + (2n - 1) = (1 + 2n - 1) * n / 2 = n ** 2
  // So if the n is a square number, it will be the SUM of the squence.
  for (let i = 1; n > 0; i += 2) {
    n -= i;
  }
  return n === 0;
}

/**
 * Q3. Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary). 
 * You may assume that the intervals were initially sorted according to their start times. 
 * Example 1: 
 * Given intervals [1,3],[6,9], insert and merge [2,5] in as [1,5],[6,9]. 
 *  
 * Example 2: 
 * Given [1,2],[3,5],[6,7],[8,10],[12,16], insert and merge [4,9] in as [1,2],[3,10],[12,16]. 
 *  
 * This is because the new interval [4,9] overlaps with [3,5],[6,7],[8,10]. 
 *
 * @param newInterval {Array} the interval to merge into the intervals
 * @param intervals {Array} the sorted intervals into which the newInterval is merged.
 */
export function mergeIntervals(newInterval, intervals) {
  const L = intervals.length;
  if (L == 0) {
    intervals.push(newInterval);
    return;
  }
  let floor = 0;
  let ceiling = L - 1;
  let lowerRange = searchIntervals(newInterval[0], floor, ceiling, intervals);

  floor = lowerRange[1];
  let upperRange = searchIntervals(newInterval[1], floor, ceiling, intervals);

  // With `lowerRange` and `upperRange`, now we know the overlapping of `newInterval`.
  // Say, `lowerRange` is [1, 2] and `upperRange` is [5,6].
  // The intervals from the #2 interval to the #5 intervals overlap `newInterval`.
  let overlapStart = lowerRange[1];
  let overlapEnd = upperRange[0];
  let delCount = overlapEnd - overlapStart + 1;
  // Make a copy since the question dose expect `newInterval` gets changed.
  // And it is good not to mutate the input args.
  let merged = newInterval.slice();
  // Should check `undefined` in case that `newInterval` falls outsisde.
  if (intervals[overlapStart] !== undefined) {
    merged[0] = Math.min(merged[0], intervals[overlapStart][0]);
  }
  if (intervals[overlapEnd] !== undefined) {
    merged[1] = Math.max(merged[1], intervals[overlapEnd][1]);
  }
  // Do the in-place update because the question asks for that.
  intervals.splice(overlapStart, delCount, merged);

  /**
   * Search in the given sorted internvals, find the given number is located between which 2 intervals.
   * ps: In case soemone wonder why put this funciton inside `mergeIntervals`.
   *     Because it is for the Q3 so put it inside the Q3.
   * 
   * @param n {Number} the target number
   * @param floor {Number} the index of the intervals which is the lower bound(included) for searching.
   * @param ceiling {Number} the index of the intervals which is the upper bound(included) for searching.
   * @param intervals {Array} the sorted intervals where the search happens.
   *
   * @return {Array} The indexes of the 2 intervals between which n is.
   *                 For exmaple, there is the intervals of [[1,3], [5,7], [9,11]].
   *                 Given 8, then return [1,2].
   *                 Given 2, then return [0,0].
   *                 Given 0, then return [-1,0].
   *                 Given 12, then return [2,3].
   */
  function searchIntervals(n, floor, ceiling, intervals) {
    // Here do the binary search.
    const L = intervals.length;
    while (floor >= 0 && ceiling < L && floor <= ceiling) {
      let mid = Math.floor((floor + ceiling) / 2);
      let [a, b] = intervals[mid];
      if (a <= n && n <= b) {
        // The case that the n is exactly inside one interval.
        floor = ceiling = mid;
        break;
      } else if (n < a) {
        // The case that the n is in the left side of the mid interval.
        ceiling = mid - 1;
      } else {
        // The case that the n is in the right side of the mid interval.
        floor = mid + 1;
      }
    }
    return [ ceiling, floor ];
  }
}
