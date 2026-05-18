interface Product {
    id: number;
    name: string;
    price: number;
}

function getProduct(id: number): Product {
    return {
        id: id,
        name: `Product ${id}`,
        price: id * 10
    };
}

const product = getProduct(1);
console.log(`Product ID: ${product.id}, Name: ${product.name}, Price: ${product.price}`);
// console.log(`Product ID: ${product.id}, Name: ${product.category}, Price: ${product.price}`);


function showProductDetails(name: string, price: number): void {
    console.log(`ShowProductDetails() Product Name: ${name}, Price: ${price}`);
}

showProductDetails(product.name, product.price);
// showProductDetails(product.category, product.price);

// TypeScript uses the Type Annotation to specify explicit types for identifiers
// such as variables, function parameters, and return types.
// This helps catch type-related errors during development and provides better code readability.
// Uses the syntax as identifier: type
let productName: string = "Sample Product";
let productPrice: number;
productPrice = 99.99;
const productId: number = 12345;


// productName=true;            // Error: Type 'boolean' is not assignable to type 'string'.

// for arrays, we can use the type annotation to specify the type of elements in the array.
// let arrayType: type[];
let names: string[] = ["Alice", "Bob", "Charlie"];

// Object type annotation
let person:
    {
        name: string;
        age: number
    };

person = {
    name: "John Doe",
    age: 30
};

person.name = "Jane Doe";        // Valid
// person.age = "thirty";        // Error: Type 'string' is not assignable to type 'number'.    

// Function type annotation
function add(a: number, b: number, result: string): number {
    console.log(result);
    return a + b;
}

let greeting: (name: string) => void;
greeting = (name: string) => {
    console.log(`Hello, ${name}!`);
}

greeting("Alice");
// greeting();                 // Error: Expected 1 arguments, but got 0.