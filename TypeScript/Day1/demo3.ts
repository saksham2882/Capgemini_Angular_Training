// Type Inference in TypeScript allows the compiler to automatically determine the type of a variable based on its initial value or usage.

let counter = 0;                      // TypeScript infers the type of 'counter' as 'number' based on the initial value assigned to it.

console.log(`Counter: ${counter}`);
//counter="abc";                      // Error: Type 'string' is not assignable to type 'number'.
console.log(`Counter: ${counter}`);


function getProduct(id: number) {
    // no return type annotation,
    // TypeScript infers the return type based on the returned object structure.
    return {
        id: id,
        name: `Product ${id}`,
        price: id * 10,
    };
}

const product2 = getProduct(1);
console.log(`Product ID: ${product2.id}, Name: ${product2.name}, Price: ${product2.price}`);


// Numbers In TypeScript can be represented in various formats, including decimal, hexadecimal, binary, and octal.
// Javascript 'Number' type is used to represent all these formats.
let decimal: number = 42;
let hexadecimal: number = 0x2a;           // Hexadecimal representation of 42
let binary: number = 0b101010;            // Binary representation of 42
let octal: number = 0o52;                 // Octal representation of 42
console.log(`Decimal: ${decimal}, Hexadecimal: ${hexadecimal}, Binary: ${binary}, Octal: ${octal}`);


// String In TypeScript can be represented using single quotes, double quotes, or template literals.
let singleQuoteString: string = "Hello, World!";
let doubleQuoteString: string = "Hello, TypeScript!";
let templateLiteralString: string = `The value of decimal is ${decimal}`;


// Boolean In TypeScript is represented using the 'boolean' type, which can have two values: 'true' or 'false'.
let isAvailable: boolean = true;
let isOutOfStock: boolean = false;
console.log(`Is Available: ${isAvailable}, Is Out of Stock: ${isOutOfStock}`);


// Object Types in TypeScript can be defined using interfaces or type aliases. They allow you to specify the structure of an object, including its properties and their types.
let employee: object;
employee = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    jobTitle: "Software Engineer",
};
console.log(`Employee: ${JSON.stringify(employee)}`);
// console.log(`Employee firstName ${employee.firstName} `);                // Error: Property 'firstName' does not exist on type 'object'.ts(2339    )
// employee = "This is a string, not an object";                         // Type 'string' is not assignable to type 'object'.ts(2322)


let employee2: {
    firstName: string;
    lastName: string;
    age: number;
    jobTitle: string;
} = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    jobTitle: "Software Engineer",
};


// Typescript has empty type , specified using {}
let vacantPosition: {};
// vacantPosition.title = "Software Engineer";                              // Error: Property 'title' does not exist on type '{}'.ts(2339)




// -----------------------------------

let numbers: number[] = [1, 2, 3, 4];
let fruits: Array<string> = ["Apple", "Banana", "Mango"];

console.log(numbers[0]);
console.log(fruits[2]);


let randomVal: any = 10;
randomVal = "Hello";                             // allowed
randomVal = true;                                // allowed

let uncertainValue: unknown = 10;
// console.log(uncertainValue.toFixed());        // Error: Object is of type 'unknown'




// ==============================================


// Tuple In TypeScript, a tuple is a fixed-length array that can contain elements of different types. It allows you to define an array with a specific number of elements and their corresponding types.
let skills: [string, number];
skills = ["TypeScript", 5];
console.log(`Skill: ${skills[0]}, Experience: ${skills[1]} years`);


// optional tuple elements can be defined using the '?' symbol, allowing you to omit certain elements when creating a tuple instance.
let employeeInfo: [string, number, string?];
employeeInfo = ["Alice", 28];
console.log(`Employee Name: ${employeeInfo[0]}, Age: ${employeeInfo[1]}, Department: ${employeeInfo[2] ?? "N/A"}`);


// Enum In TypeScript, an enum is a way to define a set of named constants. It allows you to create a collection of related values that can be used in your code.
enum Color {
    Red,
    Green,
    Blue
}
let favoriteColor: Color = Color.Green;
console.log(`Favorite Color: ${Color[favoriteColor]}`);                // Output: Favorite Color: Green    


// any type
let randomValue: any;
randomValue = 42;
console.log(`Random Value: ${randomValue}`);
randomValue = "Hello, TypeScript!";
console.log(`Random Value: ${randomValue}`);
randomValue = true;
console.log(`Random Value: ${randomValue}`);


// void type, absence of any type, is used to indicate that a function does not return a value.
function logMessage(message: string): void {
    console.log(`Log: ${message}`);
}
logMessage("This is a log message.");



// Type aliases - you can use type aliases to create new names for existing types,
// making your code more readable and maintainable.
// Type aliases can be used for primitive types, object types, union types, intersection types, and more.
// type alias = existing type ;
type stringType = string;
let firstName: stringType = "John";

type Employee = {
    id: number;
    name: string;
    department: string;
};

let employee3: Employee = {
    id: 1,
    name: "Alice",
    department: "Engineering"
};

console.log(`Employee ID: ${employee3.id}, Name: ${employee3.name}, Department: ${employee3.department}`);



// union types allow you to specify that a variable can hold values of multiple types. You can use the '|' operator to define a union type.
let identifier: number | string;
identifier = 123;
identifier = "ABC";
console.log(`Identifier: ${identifier}`);

type StringOrNumber = string | number;
let value: StringOrNumber;
value = "Hello";
console.log(`Value: ${value}`);
value = 42;
console.log(`Value: ${value}`);



// Intersection types allow you to combine multiple types into one. You can use the '&' operator to define an intersection type.
type Person = {
    name: string;
    age: number;
};
type EmployeeDetails = {
    employeeId: number;
    department: string;
};
type EmployeeInfo = Person & EmployeeDetails;
let employee4: EmployeeInfo = {
    name: "Bob",
    age: 35,
    employeeId: 1234,
    department: "HR"
};
console.log(`Employee Name: ${employee4.name}, Age: ${employee4.age}, Employee ID: ${employee4.employeeId}, Department: ${employee4.department}`);  