import { reverseString } from './questions';

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
