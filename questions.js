
/**
 * Q1. Write a function that takes a string as input and returns the string reversed. 
 * Please implement reverse function or method by yourself .
 * Example: Given s = "hello", return "olleh". 
 */
export function reverseString(str) {
  let newStr = "";
  for (let i = str.length - 1; i >= 0; --i) {
    newStr += str[i];
  }
  return newStr;
}

