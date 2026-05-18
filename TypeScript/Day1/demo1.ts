let message:string = "Hello World!"

function showMsg() {
    let res = document.getElementById("msg");
    res!.innerHTML = message;
}

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
//console.log(`Product ID: ${product.id}, Name: ${product.category}, Price: ${product.price}`);

function showProductDetails(name: string, price: number): void {
    console.log(`ShowProductDetails() Product Name: ${name}, Price: ${price}`);
}

showProductDetails(product.name, product.price);
//showProductDetails(product.category, product.price);