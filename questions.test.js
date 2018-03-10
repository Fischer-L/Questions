import { 
  reverseString,
  isSquare,
  mergeIntervals,
  findWord,
  add
} from './questions';

describe("Q1: Reverse Strings", () => {
  it("should reverse strings", () => {
    const strings = [
      "", "a", "hello", "Reversed string"
    ];
    strings.forEach(s => {
      const reversed = s.split("").reverse().join("");
      expect(reverseString(s)).toBe(reversed);
    });
  });
});

describe("Q2: Is Square", () => {
  it("should judge square numbers to True", () => {
    const nums = [0, 1, 2, 5, 17, 55, 85, 190, 16.0];
    nums.forEach(n => expect(isSquare(n ** 2)).toBe(true));
  });

  it("should judge non-square numbers to False", () => {
    const nums = [-1, -2, -5, 17, 55, 85, 19.0, 16.1];
    nums.forEach(n => expect(isSquare(n)).toBe(false));
  });
});

describe("Q3: Merge Interval", () => {
  it("should merge interval overlapping only one interval", () => {
    const intervals = [[1, 3], [6, 9]];
    mergeIntervals([2, 5], intervals);
    expect(JSON.stringify(intervals)).toBe(JSON.stringify([[1, 5],[6, 9]]));
  });

  it("should merge interval overlapping multiple intervals", () => {
    const intervals = [[1, 2],[3, 5],[6, 7],[8, 10],[12, 16]];
    mergeIntervals([4, 9], intervals);
    expect(JSON.stringify(intervals)).toBe(JSON.stringify([[1, 2],[3, 10],[12, 16]]));
  });

  it("should merge interval across multiple intervals", () => {
    const intervals = [[1, 2],[4, 5],[6, 7],[8, 10],[12, 16]];
    mergeIntervals([3, 11], intervals);
    expect(JSON.stringify(intervals)).toBe(JSON.stringify([[1, 2],[3, 11],[12, 16]]));
  });

  it("should insert interval between intervals", () => {
    const intervals = [[1, 3], [8, 9]];
    mergeIntervals([6, 7], intervals);
    expect(JSON.stringify(intervals)).toBe(JSON.stringify([[1, 3], [6, 7], [8, 9]]));
  });

  it("should insert interval outside the lower bound of intervals", () => {
    const intervals = [[1, 3], [8, 9]];
    mergeIntervals([-1, 0], intervals);
    expect(JSON.stringify(intervals)).toBe(JSON.stringify([[-1, 0], [1, 3], [8, 9]]));
  });

  it("should insert interval outside the upper bound of intervals", () => {
    const intervals = [[1, 3], [8, 9]];
    mergeIntervals([11, 12], intervals);
    expect(JSON.stringify(intervals)).toBe(JSON.stringify([[1, 3], [8, 9], [11, 12]]));
  });

  it("should simply insert interval into an empty intervals", () => {
    const intervals = [];
    mergeIntervals([11, 12], intervals);
    expect(JSON.stringify(intervals)).toBe(JSON.stringify([[11, 12]]));
  });
});

describe("Q4: Find a Word in the Board", () => {
  const board = [ 
   ["A","B","C","E"], 
   ["S","F","C","S"], 
   ["A","D","E","E"] 
  ];

  it("should find words in the board", () => {
    const words = ["ABCCED", "SEE", "ADFS"];
    words.forEach(w => expect(findWord(w, board)).toBe(true));
  });

  it("should find words not in the board", () => {
    const words = ["ABCB", "SEECS", ""];
    words.forEach(w => expect(findWord(w, board)).toBe(false));
  });

  it("should find nothing in an empty board", () => {
    const words = ["ABCCED", "SEE", "ADFS"];
    words.forEach(w => expect(findWord(w, [])).toBe(false));
  });
});

describe("Q5: Sum of 2 intergers", () => {
  it("should add 2 intergers", () => {
    const nums = [[0, 0], [0, 1], [2, 3], [-2, 3], [2, -3], [-2, -3], [0, -1]];
    nums.forEach(([a, b]) => expect(add(a, b)).toBe(a + b));
  });
});
