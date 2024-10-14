// Define everything in the global scope

// Product class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// ShoppingCartItem class
class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

// ShoppingCart class
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity = 1) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new ShoppingCartItem(product, quantity));
    }
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.product.id !== productId);
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  displayCart() {
    this.items.forEach(item => {
      console.log(`${item.product.name} - Quantity: ${item.quantity} - Total: $${item.getTotalPrice()}`);
    });
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }
}

// Create product instances
const product1 = new Product(1, "Laptop", 1000);
const product2 = new Product(2, "Headphones", 200);
const product3 = new Product(3, "Mouse", 50);

// Initialize shopping cart
const cart = new ShoppingCart();

// Add product to cart function
function addToCart(productId) {
  let product;
  switch (productId) {
    case 1:
      product = product1;
      break;
    case 2:
      product = product2;
      break;
    case 3:
      product = product3;
      break;
  }
  cart.addItem(product, 1);
  updateCartUI();
}

// Update the cart display function
function updateCartUI() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalSpan = document.getElementById('cart-total');

  // Clear the current cart items display
  cartItemsDiv.innerHTML = '';

  // Add each cart item to the display
  cart.items.forEach(item => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.className = 'cart-item';

    // Display product name, quantity, and remove button
    cartItemDiv.innerHTML = `
      <span>${item.product.name} - Quantity: ${item.quantity}</span>
      <button onclick="removeFromCart(${item.product.id})">Remove</button>
    `;

    cartItemsDiv.appendChild(cartItemDiv);
  });

  // Update the total price
  cartTotalSpan.innerText = cart.getTotalPrice();
}

// Remove item from cart function
function removeFromCart(productId) {
  cart.removeItem(productId);
  updateCartUI();
}
