// =============== Typescript Intersection Types ===================
// Intersection type creates a new type by combining multiple types.
// The new type has all the properties and methods of the combined types.
// type  typeB = typeA & typeC

interface BusinessPartner {
    name: string;
    credit: number;
}

interface Identity {
    id: number;
    name: string;
}

interface Contact {
    email: string;
    phone: number;
}

// ========= define a new type that combines the above three interfaces ==========

type Employee = Identity & Contact;
type Customer = BusinessPartner & Contact;

let emp1: Employee = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: 1234567890
};

let cust1: Customer = {
    name: "Jane Smith",
    credit: 5000,
    email: "jane.smith@example.com",
    phone: 9876543210
};

type salesEmployee = BusinessPartner & Identity & Contact;

let salesEmp1: salesEmployee = {
    id: 2,
    name: "Alice Johnson",
    credit: 3000,
    email: "alice.johnson@example.com",
    phone: 1122334455
};



// ================== Type Guard =================
// Type Guards - type guards are used to narrow down the type of a variable within a specific block of code.
// Type guards can be implemented using the typeof operator, instanceof operator, or custom type guard functions.

type alphanumeric = string | number;

function add(a: alphanumeric, b: alphanumeric): alphanumeric {
    if (typeof a === "string" && typeof b === "string") {
        return a + b;             // concatenation
    }
    else if (typeof a === "number" && typeof b === "number") {
        return a + b;             // addition
    }

    throw new Error("Invalid types for addition");
}


// ================= instanceof Type Guard ==================
class ProductCustomer {
    isCreditAllowed(): boolean {
        return true;
    }
}

class Supplier {
    isInStock(): boolean {
        return true;
    }
}

type BusinessEntity = ProductCustomer | Supplier;

function processEntity(entity: BusinessEntity) {
    if (entity instanceof ProductCustomer) {
        console.log("Processing Product Customer");
        console.log("Credit Allowed: " + entity.isCreditAllowed());
    }
    else if (entity instanceof Supplier) {
        console.log("Processing Supplier");
        console.log("In Stock: " + entity.isInStock());
    }
}


// ================= in Operator Type Guard ===================
// in Operator - used to check if a property exists in an object.
// It can be used as a type guard to narrow down the type of an object based on the
// presence of a specific property.

function isProductCustomer(entity: BusinessEntity): string {
    let message: string = "";
    if ('isCreditAllowed' in entity) {
        message = "Processing Product Customer";
    }
    else if ('isInStock' in entity) {
        message = "Processing Supplier";
    }
    return message;
}


// ================== user define Type Guard ==================
// user defines type guards - A user-defined type guard is a function that returns a boolean value
// and has a type predicate in its return type.  

function isSupplier(entity: BusinessEntity): entity is Supplier {
    return entity instanceof Supplier;
}

function isCustomer(entity: BusinessEntity): entity is ProductCustomer {
    return entity instanceof ProductCustomer;
}

function processEntityWithUserDefinedGuard(entity: BusinessEntity): string {
    let message: string = "";
    if (isCustomer(entity)) {
        message = "Processing Product Customer";
    }
    else if (isSupplier(entity)) {
        message = "Processing Supplier";
    }
    return message;
}



// =============== Type Assertions ====================
// Type Assertions- Type assertions are used to tell the compiler about the type of a variable when the compiler cannot infer it.
// You can use the 'as' keyword or angle bracket <> syntax for type assertions.

let someValue: any = "This is a string";

// Using 'as' keyword
let strLength1: number = (someValue as string).length;

// Using angle bracket <> syntax
let strLength2: number = (<string>someValue).length;

let price = 100;
// let priceAsString: string = price as string; //This will cause an error because 'number' cannot be directly asserted to 'string' without an intermediate step.    