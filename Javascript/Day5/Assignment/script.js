console.log("Hoisting Demonstration : ");
try {
    console.log("varVariable: ", varVar);
    var varVar = "I am var";
    console.log("letVariable: ", letVar);
    let letVar = "I am let";
} catch (e) {
    console.error(e);
}

const operationCounter = () => {
    let count = 0;
    return () => {
        count++;
        document.getElementById('operationsCount').innerText = count;
        return count;
    };
};
const trackOperation = operationCounter();


class Product {
    static idCounter = 1;
    #costPrice;

    constructor(name, category, price, quantity) {
        this.id = Product.generateId();
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
        this.lastUpdated = new Date().toISOString().split('T')[0];
        this.#costPrice = price * 0.7;
    }

    static generateId() {
        return `PRD${String(Product.idCounter++).padStart(3, '0')}`;
    }

    updateStock(amount) {
        this.quantity += amount;
        this.lastUpdated = new Date().toISOString().split('T')[0];
        trackOperation();
    }

    applyDiscount(percentage) {
        this.price -= this.price * (percentage / 100);
        trackOperation();
    }

    getDetails() {
        return `${this.name} (${this.category}) - Rs.${this.price} [Stock: ${this.quantity}]`;
    }
}

const inventory = new Map();
const categories = new Set();

const addProduct = (product) => {
    inventory.set(product.id, product);
    categories.add(product.category);
    trackOperation();
}

const initialData = [
    new Product("Wireless Mouse", "Electronics", 25.99, 50),
    new Product("USB Cable", "Electronics", 9.99, 120),
    new Product("Keyboard", "Electronics", 45.00, 30),
    new Product("T-Shirt", "Clothing", 15.99, 10),
    new Product("Jeans", "Clothing", 49.99, 5),
    new Product("Jacket", "Clothing", 89.99, 2),
    new Product("JavaScript Guide", "Books", 39.99, 15),
    new Product("HTML Handbook", "Books", 29.99, 25),
    new Product("Notebook", "Stationery", 4.99, 80),
    new Product("Pen Set", "Stationery", 12.99, 60)
];

const simulateAPICall = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(initialData);
        }, 1000);
    });
};

const initializeApp = async () => {
    document.getElementById('loader').style.display = 'flex';

    try {
        const data = await simulateAPICall();
        data.forEach(product => addProduct(product));
        updateUI();
    } catch (error) {
        console.error("Error: ", error);
    } finally {
        document.getElementById('loader').style.display = 'none';
    }
};

const applyBulkDiscount = (discountPercent, ...productIds) => {
    productIds.forEach(id => {
        const p = inventory.get(id);
        if (p) {
            p.applyDiscount(discountPercent);
        }
    });
    updateUI();
};


let filteredList = [];

const filterProducts = () => {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const minP = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxP = parseFloat(document.getElementById('maxPrice').value) || Infinity;

    let productsArray = [...inventory.values()];

    filteredList = productsArray.filter(p => {
        const { name, category: pCat, price } = p;

        const matchesSearch = name.toLowerCase().includes(searchTerm);
        const matchesCat = category === "All" || pCat === category;
        const matchesPrice = price >= minP && price <= maxP;

        return matchesSearch && matchesCat && matchesPrice;
    });

    currentPage = 1;
    renderPagination();
    trackOperation();
};

function* paginateGenerator(array, pageSize) {
    for (let i = 0; i < array.length; i += pageSize) {
        yield array.slice(i, i + pageSize);
    }
}

let currentPage = 1;
const item_per_page = 5;

const renderPagination = () => {
    const generator = paginateGenerator(filteredList, item_per_page);
    const pages = [...generator];

    if (pages.length === 0) {
        renderProductGrid([]);
        document.getElementById('curr').innerText = "0";
        return;
    }
    if (currentPage > pages.length) {
        currentPage = pages.length;
    }
    if (currentPage < 1) {
        currentPage = 1;
    }

    document.getElementById('curr').innerText = currentPage;
    renderProductGrid(pages[currentPage - 1]);
};


const renderProductGrid = (products) => {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = "";

    products.forEach(p => {
        const { id, name, category, price, quantity, lastUpdated } = p;

        let stockClass = "stock-high";
        if (quantity < 10) stockClass = "stock-low";
        else if (quantity < 30) stockClass = "stock-medium";

        const card = document.createElement('div');
        card.className = `product-card ${stockClass}`;
        card.innerHTML = `
            <h4>${name}</h4>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Price:</strong> Rs.${price.toFixed(2)}</p>
            <p><strong>Stock:</strong> ${quantity}</p>
            <p><strong>Last Updated:</strong> <small>${lastUpdated}</small></p>
            <div class="card-actions">
                <button onclick="updateQty('${id}', 1)">+1</button>
                <button onclick="updateQty('${id}', -1)">-1</button>
                <button class="btn-delete" onclick="deleteProduct('${id}')">Delete</button>
            </div>
        `;
        grid.appendChild(card);
    });
};

const updateDashboard = () => {
    const productsArr = [...inventory.values()];

    document.getElementById('totalProducts').innerText = productsArr.length;
    document.getElementById('totalCategories').innerText = categories.size;
    const totalValue = productsArr.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    document.getElementById('inventoryValue').innerText = `Rs.${totalValue.toFixed(2)}`;
};

const updateCategoryDropdown = () => {
    const select = document.getElementById('categoryFilter');
    select.innerHTML = '<option value="All">All Categories</option>';
    categories.forEach(cat => {
        select.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
};


const handleLowStock = (lowStockItems) => {
    const alertDiv = document.getElementById('stockAlerts');
    alertDiv.innerHTML = "";

    if (lowStockItems.length === 0) {
        alertDiv.innerHTML = "<p style='color:green'>All stock levels are optimal.</p>";
        return;
    }
    lowStockItems.forEach(item => {
        alertDiv.innerHTML += `<div class="alert-item">Low Stock: ${item.name} (${item.quantity} left)</div>`;
    });
};

const checkAlerts = (callback) => {
    const lowStock = [...inventory.values()].filter(p => p.quantity < 10);
    callback(lowStock);
};

const updateUI = () => {
    filterProducts();
    updateDashboard();
    updateCategoryDropdown();
    checkAlerts(handleLowStock);
};

window.updateQty = (id, amount) => {
    const product = inventory.get(id);
    if (product) {
        if (product.quantity + amount < 0) return;
        product.updateStock(amount);
        updateUI();
    }
};

window.deleteProduct = (id) => {
    inventory.delete(id);
    categories.clear();
    for (let p of inventory.values()) {
        categories.add(p.category);
    }
    trackOperation();
    updateUI();
};

document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const cat = document.getElementById('category').value;
    const price = parseFloat(document.getElementById('price').value);
    const qty = parseInt(document.getElementById('quantity').value);

    const newProd = new Product(name, cat, price, qty);
    addProduct(newProd);
    e.target.reset();
    updateUI();
});

document.getElementById('filterBtn').addEventListener('click', updateUI);
document.getElementById('searchInput').addEventListener('input', updateUI);
document.getElementById('categoryFilter').addEventListener('change', updateUI);

document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPagination();
    }
});

document.getElementById('next').addEventListener('click', () => {
    const totalPages = Math.ceil(filteredList.length / item_per_page);
    if (currentPage < totalPages) {
        currentPage++;
        renderPagination();
    }
});

initializeApp();