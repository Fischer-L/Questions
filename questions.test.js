import { 
  reverseString,
  isSquare
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
    const nums = [ 0, 1, 2, 5, 17, 55, 85, 190 ];
    nums.forEach(n => expect(isSquare(n ** 2)).toBe(true));
  });

  it("should judge non-square numbers to False", () => {
    const nums = [ -1, -2, -5, 17, 55, 85, 190 ];
    nums.forEach(n => expect(isSquare(n)).toBe(false));
  });
});
