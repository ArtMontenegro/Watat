const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const coffeeCards = document.getElementById("coffee-container");
const dessertCards = document.getElementById("dessert-container");
const cartBtn = document.getElementById("cart-btn");
const clearCart = document.getElementById("clear-cart");
const totalItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showCart = document.getElementById("show-cart");
let isCartShowing = false;

const coffees = [
  {
    id: 1,
    name: "Black Coffee",
    price: 1.00.toFixed(2)
  },
  {
    id: 2,
    name: "Capuccino",
    price: 2.00.toFixed(2)
  },
  {
    id: 3,
    name: "French Vanilla",
    price: 3.00.toFixed(2)
  },
  {
    id: 4,
    name: "Caramel Macchiato",
    price: 3.50.toFixed(2)
  },
  {
    id: 5,
    name: "Pumpkin Spice Latte",
    price: 4.00.toFixed(2)
  },
  {
    id: 6,
    name: "Hazelnut",
    price: 4.00.toFixed(2)
  },
  {
    id: 7,
    name: "Mocha",
    price: 4.50.toFixed(2)
  }
];

const desserts = [
  {
    id: 8,
    name: "Cookie",
    price: 1.50.toFixed(2)
  },
  {
    id: 9,
    name: "Donut",
    price: 1.50.toFixed(2)
  },
  {
    id: 10,
    name: "Cinnamon Roll",
    price: 2.50.toFixed(2)
  },
  {
    id: 11,
    name: "Vanilla Cupcake",
    price: 3.00.toFixed(2)
  },
  {
    id: 12,
    name: "Chocolate Cupcake",
    price: 4.00.toFixed(2)
  },
  {
    id: 13,
    name: "Pumpkin Cupcake",
    price: 4.00.toFixed(2)
  },
  {
    id: 14,
    name: "Lemon Cupcake",
    price: 3.00.toFixed(2)
  },
  {
    id: 15,
    name: "French Macaron",
    price: 4.00.toFixed(2)
  },
  {
    id: 16,
    name: "Chocolate Macaron",
    price: 3.00.toFixed(2)
  },
  {
    id: 17,
    name: "Vanilla Macaron",
    price: 2.50.toFixed(2)
  },
  {
    id: 18,
    name: "Cherry Pie",
    price: 3.00.toFixed(2)
  },
  {
    id: 19,
    name: "Cheesecake",
    price: 3.00.toFixed(2)
  },
  {
    id: 20,
    name: "Chocolate Pretzel",
    price: 3.00.toFixed(2)
  },
  {
    id: 21,
    name: "Strawberry Pretzel",
    price: 5.00.toFixed(2)
  },
  {
    id: 22,
    name: "Strawberry Ice Cream",
    price: 2.00.toFixed(2)
  },
  {
    id: 23,
    name: "Butter Pecan Ice Cream",
    price: 2.00.toFixed(2)
  },
  {
    id: 24,
    name: "Rocky Road Ice Cream",
    price: 2.00.toFixed(2)
  },
];

const products = coffees.concat(desserts);

coffees.forEach(
  ({ name, id, price }) => {
    coffeeCards.innerHTML += `
      <div class="item-card">
        <h2>${name}</h2>
        <p class="item-price">$${price}</p>
        <button 
          id="${id}" 
          class="btn add-cart">Add to cart
        </button>
      </div>
    `;
  }
);

desserts.forEach(
  ({ name, id, price }) => {
    dessertCards.innerHTML += `
      <div class="item-card">
        <h2>${name}</h2>
        <p class="item-price">$${price}</p>
        <button 
          id="${id}" 
          class="btn add-cart">Add to cart
        </button>
      </div>
    `;
  }
);

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.taxRate = 8.25;
  }

  addItem(id, products) {
    const product = products.find((item) => item.id === id);
    const { name, price } = product;
    this.items.push(product);

    const totalCountPerProduct = {};
    this.items.forEach((dessert) => {
      totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
    })

    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);

    currentProductCount > 1
      ? currentProductCountSpan.textContent = `${currentProductCount}x`
      : productsContainer.innerHTML += `
      <div id="product${id}" class="product">
        <p>
          <span class="product-count" id="product-count-for-id${id}"></span>${name}
        </p>
        <p>${price}</p>
      </div>
      `;
  }

  getCounts() {
    return this.items.length;
  }

  clearCart() {
    if (!this.items.length) {
      alert("Your shopping cart is already empty");
      return;
    }

    const isCartCleared = confirm(
      "Are you sure you want to clear all items from your shopping cart?"
    );

    if (isCartCleared) {
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalItems.textContent = 0;
      cartSubTotal.textContent = 0;
      cartTaxes.textContent = 0;
      cartTotal.textContent = 0;
    }
  }

  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
  }

  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0);
    const tax = this.calculateTaxes(subTotal);
    this.total = subTotal + tax;
    cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
    cartTaxes.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${this.total.toFixed(2)}`;
    return this.total;
  }
};

const cart = new ShoppingCart();
const addCart = document.getElementsByClassName("add-cart");

[...addCart].forEach(
  (btn) => {
    btn.addEventListener("click", (event) => {
      cart.addItem(Number(event.target.id), products);
      totalItems.textContent = cart.getCounts();
      cart.calculateTotal();
    })
  }
);

cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  showCart.textContent = isCartShowing ? "Hide" : "Show";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});

clearCart.addEventListener("click", () => {
  cart.clearCart.bind(cart);
});