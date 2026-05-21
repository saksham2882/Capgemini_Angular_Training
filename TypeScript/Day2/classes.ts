// =============== ES6 allows to define a class =================
class Person {
    id: number;
    firstName: string;
    lastName: string;

    constructor(id: number, firstName: string, lastName: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

let person1 = new Person(1, "John", "Doe");
console.log(person1.getFullName());      // Output: John Doe


// =================== Three access modifiers in typescript ==================
class Employee {
    private id: number;                          // private: limits the access to the property within the class only
    protected firstName: string;                 // protected: allows access to the property within the class and its subclasses
    public lastName: string;

    // readonly property
    readonly department: string;

    constructor(id: number, firstName: string, lastName: string, department: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.department = department;
    }

    displayEmployeeInfo(): void {
        console.log(`ID: ${this.id}, Name: ${this.firstName} ${this.lastName}`);
    }

    getEmployeeId(): number {
        return this.id;                           // Accessing private property within the class
    }

    setEmployeeId(newId: number): void {
        if (newId > 0) {
            this.id = newId;                      // Modifying private property within the class
        }
        else {
            console.log("Invalid ID. ID must be a positive number.");
        }
    }
}


// =================== Inheritance ======================
class Manager extends Employee {
    managerLevel: string;
    static companyName: string = "Tech Solutions Inc.";       // Static property shared across all instances of Manager  

    constructor(id: number, firstName: string, lastName: string, department: string = "Management", managerLevel: string = "Senior") {
        super(id, firstName, lastName, department);
        this.managerLevel = managerLevel;
    }

    getProtectedFirstName(): string {
        return this.firstName;                                // Accessing protected property from the subclass
    }

    displayEmployeeInfo(): void {
        // super.displayEmployeeInfo();                       // Call the base class method to display ID and name
        console.log(`ID: ${this.getEmployeeId()}, Name: ${this.firstName} ${this.lastName}, Manager Level: ${this.managerLevel}`);
    }

    static displayCompanyInfo(): void {
        console.log(`Company Name: ${Manager.companyName}`);
    }
}


let employee1 = new Employee(1, "Alice", "Smith", "Engineering");
// console.log(employee1.id);                               // Error: Property 'id' is private and only accessible within class 'Employee'.
// console.log(employee1.firstName);                        // Error: Property 'firstName' is protected and only accessible within class 'Employee' and its subclasses.
console.log(employee1.lastName);                    // Output: Smith
employee1.displayEmployeeInfo();                            // Output: ID: 1, Name: Alice Smith


let manager1 = new Manager(2, "Bob", "Johnson", "Management");
// console.log(manager1.id);                                 // Error: Property 'id' is private and only accessible within class 'Employee'.
// console.log(manager1.firstName);                          // Error: Property 'firstName' is protected and only accessible within class 'Employee' and its subclasses.
console.log(manager1.lastName);                      // Output: Johnson
console.log(manager1.getProtectedFirstName());       // Output: Bob
manager1.displayEmployeeInfo();                              // Output: ID: 2, Name: Bob Johnson, Manager Level: Senior



// ================== Accessing readonly property ====================
console.log(employee1.department);                   // Output: Engineering
// employee1.department = "HR";                              // Error: Cannot assign to 'department' because it is a read-only property.


// const keyword is used to declare a variable that cannot be reassigned after its initial assignment.
const pi = 3.14;
// pi = 3.14159;                                             // Error: Cannot assign to 'pi' because it is a constant.


// ================ Static Example ===================
Manager.companyName = "Global Tech Inc.";                    // Modifying static property
console.log(Manager.companyName);                    // Output: Global Tech Inc.

//console.log(manager1.companyName);                         // Error: Property 'companyName' does not exist on type 'Manager'. Static properties are accessed through the class, not instances.
Manager.displayCompanyInfo();                                // Output: Company Name: Global Tech Inc.