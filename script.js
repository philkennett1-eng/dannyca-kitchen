// script.js
let cart = [];
const ADMIN_PASSWORD = "admin123";

const menuItems = [
  {id:1, name:"Lumpia Rolls", price:6.50, desc:"Crispy Filipino spring rolls", category:"Starters"},
  {id:2, name:"Calamares", price:8.50, desc:"Crispy fried squid", category:"Starters"},
  {id:3, name:"Chicken Adobo", price:9.50, desc:"Classic garlic-soy chicken", category:"Main Meals"},
  {id:4, name:"Sinigang na Baboy", price:10.50, desc:"Tamarind pork soup", category:"Main Meals"},
  {id:5, name:"Lechon Kawali", price:12.50, desc:"Crispy pork belly", category:"Main Meals"},
  {id:6, name:"Halo-Halo", price:6.99, desc:"Mixed shaved ice dessert", category:"Desserts"},
  {id:7, name:"Calamansi Juice", price:3.50, desc:"Fresh Philippine lime drink", category:"Drinks"},
  {id:8, name:"Garlic Rice", price:3.00, desc:"Fragrant garlic rice", category:"Snacks"}
];

function formatPrice(p) { return "£" + p.toFixed(2); }

function renderAllMenus() {
  // This will be called from index.html
  console.log("Menus rendered");
}

function addToCart(id) {
  const item = menuItems.find(i => i.id === id);
  if (item) {
    cart.push({...item, quantity: 1});
    updateCartCount();
    showToast(`${item.name} added to cart`);
  }
}

// ... (more functions will be added incrementally)

function showToast(message) {
  const toast = document.getElementById('toast');
  if (toast) {
    document.getElementById('toast-text').textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2000);
  }
}

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.textContent = cart.length;
}

// Initialize when loaded
document.addEventListener('DOMContentLoaded', () => {
  renderAllMenus();
});
