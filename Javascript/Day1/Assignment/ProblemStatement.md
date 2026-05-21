# Tricky Pattern & Number Challenge
 
## Problem Statement
 
Create an interactive web application that generates **multiple dynamic patterns and number sequences** based on user input. The application must use **only conditional statements (if/else/switch) and loops (for/while)** in JavaScript.
  
---
  
## Requirements
 
### Part 1: Number Pyramid Generator
Create a number pyramid where:
- User inputs a number (1-10)
- Generate a pyramid pattern based on specific rules:
  - **Odd rows**: Numbers increment from 1
  - **Even rows**: Numbers decrement from the row number
  - **Middle row** (if exists): All numbers should be the same as the row number
  - **Multiples of 3**: Display with a star (*)
 
**Example**: Input = 5
```
1
2 1
*3 *3 *3
4 3 2 1
5 5 5 5 5
```
 
---
 
### Part 2: FizzBuzz Table Challenge
Create a table (3 columns × n rows) where:
- User inputs a range (10-100)
- For each number from 1 to input:
  - If divisible by **both 3 and 5**: Display "FizzBuzz" (background: purple)
  - If divisible by **3 only**: Display "Fizz" (background: blue)
  - If divisible by **5 only**: Display "Buzz" (background: green)
  - If **prime number**: Display number with (background: gold)
  - Otherwise: Display the number normally
- Arrange output in a 3-column table format
 
---
 
### Part 3: Smart Sum Calculator
Create a calculator that:
- User enters a number N (5-50)
- Calculate and display separately:
  1. Sum of **even** numbers from 1 to N
  2. Sum of **odd** numbers from 1 to N
  3. Sum of numbers divisible by **3 or 5** but NOT both
  4. Sum of **prime numbers** from 1 to N
- Display results with color coding (Green for highest sum, Red for lowest)
 
---
 
### Part 4: Reverse Pyramid with Conditions
Create a reverse pyramid where:
- User inputs a number (5-15)
- Generate descending pyramid with these rules:
  - Each row starts from the row number
  - Display only if: (row number × column position) is NOT a perfect square
  - Replace perfect squares with "■"
 
**Example**: Input = 5
```
5 5 5 5 5
4 * 4 *
* 3 *
*  *
5
```
 
---
 
## Technical Constraints
 
### JavaScript:
- NO array methods (map, filter, forEach, reduce, etc.)
-  NO built-in functions except Math.sqrt(), Math.floor()
-  ONLY use: for, while, do-while loops
-  ONLY use: if, else if, else, switch, ternary operators
-  Must write your own prime number checker function
-  Must write your own perfect square checker function
 
### HTML:
- Use semantic HTML5 elements
- Create separate sections for each part
- Include input validation messages
- Add "Clear All" and "Generate All" buttons           give code in same way veryyy basic