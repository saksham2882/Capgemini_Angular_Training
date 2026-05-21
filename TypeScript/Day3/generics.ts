// ================== Typescript Generics =====================
// Generics allows you to write the reusable and generalized forms of functions, classes and interfaces.
// It provides a way to create components that can work with any data type while still maintaining type safety.

function getRandomNumberElementFromArray(items: number[]): number {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

let numbers = [1, 2, 3, 4, 5];
let randomElement = getRandomNumberElementFromArray(numbers);
console.log(`Random Number: ${randomElement}`);


function getRandomElementFromStringArray(items: string[]): string {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}
let names = ["Alice", "Bob", "Charlie", "David"];
let randomName = getRandomElementFromStringArray(names);
console.log(`Random Name: ${randomName}`);


// using any type, this option works fine, it doesn't allow you to enforce the
// type of returned element, it simple words doesn't provide type safety,
// you can pass any array and it will return any element without any type checking.
function getRandomElementFromArray(items: any[]): any {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}
let randomElement1 = getRandomElementFromArray(numbers);
console.log(`Random Element from numbers array: ${randomElement1}`);
let randomElement2 = getRandomElementFromArray(names);
console.log(`Random Element from names array: ${randomElement2}`);



// solution to avoid code duplication and maintain type safety is to use generics,
// we can define a generic function that can work with any data type while still enforcing type safety.
function getRandomElementFromArrayGeneric<T>(items: T[]): T {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

let randomElement3 = getRandomElementFromArrayGeneric(numbers);
console.log(`Random Element from numbers array using generics: ${randomElement3}`);

let randomElement4 = getRandomElementFromArrayGeneric(names);
console.log(`Random Element from names array using generics: ${randomElement4}`);



// array of objects
interface Person {
    name: string;
    age: number;
}
let people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];
let randomPerson = getRandomElementFromArrayGeneric(people);
console.log(`Random Person: ${randomPerson.name}, Age: ${randomPerson.age}`);

// multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

let pair1 = pair<number, string>(1, "one");
console.log(`Pair: ${pair1[0]}, ${pair1[1]}`);

let pair2 = pair<string, boolean>("isActive", true);
console.log(`Pair: ${pair2[0]}, ${pair2[1]}`);

let pair3 = pair(42, { name: "Alice", age: 30 });
console.log(`Pair: ${pair3[0]}, ${pair3[1].name}, ${pair3[1].age}`);



// ================== generic constraints ===================
// sometimes we want to restrict the types that can be used with a generic function or class.
// we can use generic constraints to specify that a type parameter must extend a certain type or implement a certain interface.
interface HasLength {
    length: number;
}
function logLength<T extends HasLength>(item: T): void {
    console.log(`Length: ${item.length}`);
}
logLength("Hello, World!");       // Length: 13
logLength([1, 2, 3, 4, 5]);       // Length: 5
// logLength(45);                 // Error: Argument of type 'number' is not assignable to parameter of type 'HasLength'.



// =============== generic class ====================
class Box<T> {
    private content: T;
    constructor(content: T) {
        this.content = content;
    }
    getContent(): T {
        return this.content;
    }
}

let numberBox = new Box<number>(123);
console.log(`Number Box Content: ${numberBox.getContent()}`);

let stringBox = new Box<string>("Hello, Generics!");
console.log(`String Box Content: ${stringBox.getContent()}`);


// =============== generic interface =================
interface Repository<T> {
    getById(id: number): T;
    getAll(): T[];
}

class UserRepository implements Repository<Person> {
    private users: Person[] = [
        { name: "Alice", age: 30 },
        { name: "Bob", age: 25 },
        { name: "Charlie", age: 35 }
    ];
    getById(id: number): Person {
        return this.users[id];
    }
    getAll(): Person[] {
        return this.users;
    }
}

let userRepository = new UserRepository();
let user = userRepository.getById(1);
console.log(`User: ${user.name}, Age: ${user.age}`);

let allUsers = userRepository.getAll();
console.log("All Users:");
allUsers.forEach(user => {
    console.log(`Name: ${user.name}, Age: ${user.age}`);
});


class ProductRepository implements Repository<Product> {
    private products: Product[] = [
        { name: "Laptop", price: 999 },
        { name: "Smartphone", price: 499 },
        { name: "Tablet", price: 299 }
    ]
    getById(id: number): Product {
        return this.products[id];
    }
    getAll(): Product[] {
        return this.products;
    }
}
interface Product {
    name: string;
    price: number;
}

let productRepository = new ProductRepository();
let product = productRepository.getById(0);
console.log(`Product: ${product.name}, Price: ${product.price}`);

let allProducts = productRepository.getAll();
console.log("All Products:");
allProducts.forEach(product => {
    console.log(`Name: ${product.name}, Price: ${product.price}`);
});