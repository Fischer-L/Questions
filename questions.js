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

  // With `lowerRange` and `upperRange`, now we know the overlapping range of `newInterval`.
  // Say, `lowerRange` is [1, 2] and `upperRange` is [5,6].
  // The intervals from the #2 interval to the #5 interval overlap `newInterval`.
  let overlapStart = lowerRange[1];
  let overlapEnd = upperRange[0];
  let delCount = overlapEnd - overlapStart + 1;
  // Make a copy since the question dosen't expect `newInterval` gets changed.
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
   * ps: In case soemone wonders why put this funciton inside `mergeIntervals`.
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

/**
 * Q4. Given a 2D board and a word, find if the word exists in the grid. 
 * For example,
 * Given board = 
 * [ 
 *   ['A','B','C','E'], 
 *   ['S','F','C','S'], 
 *   ['A','D','E','E'] 
 * ] 
 * word = "ABCCED", -> returns true, 
 * word = "SEE", -> returns true, 
 * word = "ABCB", -> returns false. 
 *
 * @param word {String} The word to find
 * @param board {Array} the 2D board to search
 *
 * @return {boolean} True if found otherwise False
 */
export function findWord(word, board) {
  const MAX_ROW = board.length;
  const MAX_COL = MAX_ROW ? board[0].length : 0;
  for (let row = 0; row < MAX_ROW; ++row) {
    for (let col = 0; col < MAX_COL; ++col) {
      if (searchBoard(word, 0, board, row, col, MAX_ROW, MAX_COL)) {
        return true;
      } 
    }
  }
  return false;

  /**
   * Recursively search the board to see if a word exists inside the board.
   * ps: In case soemone wonders why put this funciton inside `findWord`.
   *     Because it is for the Q4 so put it inside the Q4.
   *
   * @param word {String} The same as `word` arg of `findWord`
   * @param wordIdx {Interge} The index of word's character currently being tested
   * @param board {Array} The same as `board` arg of `findWord`
   * @param row {Interge} The row index of the board's character currently being tested
   * @param col {Interge} The column index of the board's character currently being tested
   * @param MAX_ROW {Interge} The max of `row` can be (not included)
   * @param MAX_COL {Interge} The max of `col` can be (not included)
   *
   * @return {boolean} True if found otherwise False
   */
  function searchBoard(word, wordIdx, board, row, col, MAX_ROW, MAX_COL) {
    if (word && wordIdx === word.length) {
      return true;
    }
    if (!word || word[wordIdx] !== board[row][col]) {
      return false;
    }

    // Found the current character of the word inside the board.
    // Move to the next character.
    wordIdx++;
    let found = false;
    // Temporarily clear this character in the board to mark as *visited*.
    let c = board[row][col];
    board[row][col] = "null";
    if (row - 1 >= 0) {
      found = searchBoard(word, wordIdx, board, row - 1, col, MAX_ROW, MAX_COL);
    }
    if (!found && row + 1 < MAX_ROW) {
      found = searchBoard(word, wordIdx, board, row + 1, col, MAX_ROW, MAX_COL);
    }
    if (!found && col - 1 >= 0) {
      found = searchBoard(word, wordIdx, board, row, col - 1, MAX_ROW, MAX_COL);
    }
    if (!found && col + 1 < MAX_COL) {
      found = searchBoard(word, wordIdx, board, row, col + 1, MAX_ROW, MAX_COL);
    }
    // Restore the character.
    board[row][col] = c;
    return found;
  }
}

/**
 * Q5. Calculate the sum of two integers a and b, but you are not allowed to use the operator + and -. 
 * Example:
 * Given a = 1 and b = 2, return 3. 
 *
 * @param a {Interger} The interger to add
 * @param b {Interger} Another interger to add with `a`
 */
export function add(a, b) {
  // We do the bit operations here.
  // Assume 5 (0101) and 9 (1001),
  // 1. 5 ^ 9 gets the not-carry bits (1100)
  // 2. (5 & 9) then left shifting gets the carry bits (0010)
  // 3. (1100) & (0010) gets 0 so we know no more carry bits
  // 4. (1100) | (0010) gives 14 which is 5 + 9
  let c = 0;
  while ((a & b) !== 0) {
    c = (a & b) << 1;
    a = a ^ b;
    b = c;
  }
  return a | b;
}
