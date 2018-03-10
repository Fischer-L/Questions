
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

/*
 * Q2. Given a positive integer num, write a function which returns True if num is a perfect square else False. 
 * Note: Do not use any built-in library function such as sqrt. 
 * Example 1: 
 * Input: 16 
 * Returns: True 
 */
export function isSquare(n) {
  for (let i = 1; n > 0; i += 2) {
    n -= i;
  }
  return n === 0;
}
