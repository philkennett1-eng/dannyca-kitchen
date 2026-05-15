// script.js - Dannyca’s Kitchen

// Supabase Connection
const supabaseUrl = 'https://tlyyakwgbdsjwcduvfxp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRseXlha3dnYmRzandjZHV2ZnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NDM3MzIsImV4cCI6MjA5NDQxOTczMn0.aAdqjwYaPufXmFhfiBqjxgM76h8KEgOQ24r-p4OUs0E';

const supabase = Supabase.createClient(supabaseUrl, supabaseKey);

let cart = [];
let menuItems = [];

// Load Menu from Database
async function loadMenuFromDB() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('category');

  if (error) {
    console.error("Database load error:", error);
    alert("Could not load menu from database. Using sample data.");
    // Fallback sample data
    menuItems = [
      {id:1, name:"Lumpia Rolls", price:6.50, desc:"Crispy Filipino spring rolls", category:"Starters"},
      {id:2, name:"Chicken Adobo", price:9.50, desc:"Classic garlic-soy chicken", category:"Main Meals"},
      {id:3, name:"Halo-Halo", price:6.99, desc:"Mixed shaved ice dessert", category:"Desserts"},
      {id:4, name:"Calamansi Juice", price:3.50, desc:"Fresh lime drink", category:"Drinks"}
    ];
  } else {
    menuItems = data;
  }
  renderAllMenus();
}

function formatPrice(p) {
  return "£" + parseFloat(p).toFixed(2);
}

function renderAllMenus() {
  const categories = {
    starters: document.getElementById('starters'),
    mains: document.getElementById('mains'),
    desserts: document.getElementById('desserts'),
    drinks: document.getElementById('drinks'),
    snacks: document.getElementById('snacks')
  };

  Object.keys(categories).forEach(key => {
    if (categories[key]) categories[key].innerHTML = '';
  });

  menuItems.forEach(item => {
    const html = `
      <div class="menu-card bg-white rounded-3xl shadow p-6">
        <h3 class="font-semibold text-xl">${item.name}</h3>
        <p class="text-gray-600 text-sm mt-1">${item.description || item.desc || ''}</p>
        <div class="mt-6 flex justify-between items-center">
          <span class="text-3xl font-bold text-orange-600">${formatPrice(item.price)}</span>
          <button onclick="addToCart(${item.id})" class="bg-orange-600 text-white px-8 py-3 rounded-2xl hover:bg-orange-700">Add to Cart</button>
        </div>
      </div>`;

    if (item.category === "Starters" && categories.starters) categories.starters.innerHTML += html;
    else if ((item.category === "Main Meals" || item.category === "Mains") && categories.mains) categories.mains.innerHTML += html;
    else if (item.category === "Desserts" && categories.desserts) categories.desserts.innerHTML += html;
    else if (item.category === "Drinks" && categories.drinks) categories.drinks.innerHTML += html;
    else if (categories.snacks) categories.snacks.innerHTML += html;
  });
}

function addToCart(id) {
  const item = menuItems.find(i => i.id === id);
  if (item) {
    cart.push({...item, quantity: 1});
    updateCartCount();
    showToast(`${item.name} added to cart`);
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (toast) {
    document.getElementById('toast-text').textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2000);
  }
}

function updateCartCount() {
  const el = document.getElementById('cart-count');
  if (el) el.textContent = cart.length;
}

function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  if (sidebar && overlay) {
    sidebar.classList.toggle('translate-x-full');
    overlay.classList.toggle('hidden');
  }
}

function checkout() {
  if (cart.length === 0) return;
  alert("✅ Order Received!\n\nThank you for ordering from Dannyca’s Kitchen.");
  cart = [];
  updateCartCount();
  toggleCart();
}

function loginAdmin() {
  const pass = document.getElementById('admin-pass') ? document.getElementById('admin-pass').value : "";
  if (pass === ADMIN_PASSWORD) {
    alert("✅ Logged in as Admin (full functionality coming soon)");
  } else {
    alert("Incorrect password");
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadMenuFromDB();
});
