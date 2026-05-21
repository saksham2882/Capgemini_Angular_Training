function add(num1: number, num2: number): number {
    return num1 + num2;
}

let sum = add(5, 10);
console.log(`Sum: ${sum}`);

// let sum2= add('1','2');        // Error: Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)

// function with return type void
function logMessage(message: string): void {
    console.log(`Log: ${message}`);
}
logMessage("This is a log message.");


let ans = function multiply(num1: number, num2: number): number {
    return num1 * num2;
}
console.log(`Product: ${ans(5, 10)}`);


// --------------- function with optional parameter -------------------------
// optional parameter must come after the required parameters,
// and it is denoted by a '?' symbol after the parameter name.
function greet(name: string, greeting?: string): string {
    if (greeting) {
        return `${greeting}, ${name}!`;
    } else {
        return `Hello, ${name}!`;
    }
}
console.log(greet("Alice"));
console.log(greet("Bob", "Good morning"));


// --------------- function with default parameter --------------------------
// default parameters don't need to appear after the required parameters,
// and they are denoted by an '=' symbol followed by the default value.
function greetWithDefault(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
}
console.log(greetWithDefault("Charlie"));
console.log(greetWithDefault("Dave", "Good evening"));


// NOTE: when a default parameter appears before the required parameter , you need to pass
// undefined for the default parameter to use its default value.
function greetWithDefaultFirst(greeting: string = "Hello", name: string): string {
    return `${greeting}, ${name}!`;
}
console.log(greetWithDefaultFirst(undefined, "Eve"));
console.log(greetWithDefaultFirst("Hi", "Frank"));



// --------------- function with rest parameters -----------------------------
// A Rest parameter allows to pass zero or more arguments of the specified type to a function.
// It is denoted by three dots '...' followed by the parameter name.
// NOTE: A function can have only one rest parameter, and it must be the last parameter in the function signature.
// type of rest parameter must be an array type, and it can be accessed within the function as an array.

function sumAll(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(`Sum of all numbers: ${sumAll(1, 2, 3, 4, 5)}`);
console.log(`Sum of all numbers: ${sumAll(10, 20)}`);
console.log(`Sum of all numbers: ${sumAll()}`);              // Output: Sum of all numbers: 0


function concatenateStrings(separator: string, ...strings: string[]): string {
    return strings.join(separator);
}

console.log(concatenateStrings(", ", "Apple", "Banana", "Cherry"));
console.log(concatenateStrings(" - ", "One", "Two", "Three", "Four"));
console.log(concatenateStrings(" | "));            // Output:      


// -------------- rest parameters with different types ------------------------
function logMessages(...messages: (string | number)[]): void {
    messages.forEach(message => console.log(`Log: ${message}`));
}
logMessages("Hello", 42, "TypeScript", 3.14);
logMessages();                                                       // Output: (no logs, as no messages are provided)




// ---------------------- Function Overloading ---------------------------------
// Function overloading allows to define multiple function signatures
// for a single function and provide one implementation that can handle all the defined signatures.
// function overloading enables a function to handle different types of input parameters and return values, making it more flexible and versatile.
// additionally the typescript compiler uses the function signatures to perform
// compile-time type checking to ensure type safety when calling the overloaded function.

function addition(x: number, y: number): number;
function addition(x: string, y: string): string;
function addition(x: number, y: number, z: number): number;

function addition(a: any, b: any, c?: any): any {
    if (typeof a == 'number' && typeof b == 'number' && (c === undefined || typeof c == 'number')) {
        return a + b + (c || 0);
    }
    else if (typeof a == 'string' && typeof b == 'string') {
        return a.concat(b);
    }
    else
        throw new Error("Invalid arguments. Both arguments must be either numbers or strings.");
}

console.log(`Sum: ${addition(5, 10)}`);
console.log(`Concatenation: ${addition("Hello, ", "World!")}`);
//console.log(addition(5, "10"));                             // Error: Invalid arguments. Both arguments must be either numbers or strings.
console.log(`Sum of three numbers: ${addition(1, 2, 3)}`);