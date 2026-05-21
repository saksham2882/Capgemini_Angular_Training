// interfaces - Typescript interfaces defines the contract within the code.
// They also provide the explicit names for type checking and code readability.

// ========== traditional way of defining an object type ============
function getFullName(person: { firstName: string, lastName: string }): string {
    return `${person.firstName} ${person.lastName}`;
}
const person = { firstName: "John", lastName: "Doe" };
console.log(getFullName(person));                    // Output: John Doe



// =============== using interface to define the object type ================
interface Person {
    firstName: string;
    lastName: string;

    // optional property
    age?: number;

    // readonly property
    readonly id: number;
}


function getFullNameWithInterface(person: Person): string {
    if (person.age) {
        console.log(`Age: ${person.age}`);
    }
    return `${person.firstName} ${person.lastName}`;
}

const personWithInterface: Person = { firstName: "Jack", lastName: "Doe", age: 30, id: 1 };
console.log(getFullNameWithInterface(personWithInterface));                  // Output: Jack Doe and Age: 30


const personWithoutAge: Person = { firstName: "Jane", lastName: "Doe", id: 2 };
console.log(getFullNameWithInterface(personWithoutAge));                     // Output: Jane Doe




// ================ interface with function types ====================
// Example 1:
interface MathOperation {
    (a: number, b: number): number;
}

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;

console.log(add(5, 3));             // Output: 8
console.log(subtract(5, 3));        // Output: 2


// Example 2:
interface StringFormat {
    (str: string, isUpperCase: boolean): string;
}

let format: StringFormat;
format = function (str: string, isUpperCase: boolean): string {
    return isUpperCase ? str.toUpperCase() : str.toLowerCase();
}

console.log(format("Hello World", true));              // Output: HELLO WORLD
console.log(format("Hello World", false));             // Output: hello world




// =============== class implementing an interface ======================
interface Shape {
    area(): number;
}

class Circle implements Shape {

    constructor(public radius: number) {
        this.radius = radius;
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }
}

const circle = new Circle(5);
console.log(`Area of the circle: ${circle.area()}`);                    // Output: Area of the circle: 78.53981633974483



class Rectangle implements Shape {

    constructor(public width: number, public height: number) {
        this.width = width;
        this.height = height;
    }

    area(): number {
        return this.width * this.height;
    }
}

const rectangle = new Rectangle(4, 6);
console.log(`Area of the rectangle: ${rectangle.area()}`);             // Output: Area of the rectangle: 24




// ================= extend interface =======================
interface ColoredShape extends Shape {
    color: string;
    doColor(color: string): void;
}

class ColoredCircle implements ColoredShape {

    constructor(public radius: number, public color: string) {
        this.radius = radius;
        this.color = color;
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }

    doColor(color: string): void {
        this.color = color;
        console.log(`Circle color changed to: ${this.color}`);
    }
}

const coloredCircle = new ColoredCircle(5, "red");
console.log(`Area of the colored circle: ${coloredCircle.area()}`);
coloredCircle.doColor("blue");                                             // Output: Circle color changed to: blue




// ================ interface can extend multiple interfaces =====================
interface ColoredShapeWithBorder extends ColoredShape, Shape {
    borderWidth: number;
    doBorderWidth(width: number): void;
}

class ColoredRectangle implements ColoredShapeWithBorder {

    constructor(public width: number, public height: number, public color: string, public borderWidth: number) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.borderWidth = borderWidth;
    }

    area(): number {
        return this.width * this.height;
    }

    doColor(color: string): void {
        this.color = color;
        console.log(`Rectangle color changed to: ${this.color}`);
    }

    doBorderWidth(width: number): void {
        this.borderWidth = width;
        console.log(`Rectangle border width changed to: ${this.borderWidth}`);
    }
}

const coloredRectangle = new ColoredRectangle(4, 6, "green", 2);
console.log(`Area of the colored rectangle: ${coloredRectangle.area()}`);
coloredRectangle.doColor("yellow");
coloredRectangle.doBorderWidth(4);




// =============== Interface can extend the class =================
class PersonClass {

    constructor(public name: string, public age: number) {
        this.name = name;
        this.age = age;
    }
}

interface EmployeeInterface extends PersonClass {
    employeeId: number;
    doWork(): void;
}

class EmployeeClass extends PersonClass implements EmployeeInterface {

    constructor(name: string, age: number, public employeeId: number) {
        super(name, age);
        this.employeeId = employeeId;
    }

    doWork(): void {
        console.log(`${this.name} is working.`);
    }
}

const employee = new EmployeeClass("John Doe", 30, 12345);
employee.doWork();                                      // Output: John Doe is working.



class EmployeeImpl implements EmployeeInterface {
    name: string;
    age: number;
    employeeId: number;

    constructor(name: string, age: number, employeeId: number) {
        this.name = name;
        this.age = age;
        this.employeeId = employeeId;
    }

    doWork(): void {
        console.log(`${this.name} is working.`);
    }
}

const employeeImpl = new EmployeeImpl("Jane Doe", 28, 54321);
employeeImpl.doWork();                                  // Output: Jane Doe is working.