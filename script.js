// script.js - Clean Single Declaration Version

console.log("Script loaded successfully");

const supabaseUrl = 'https://tlyyakwgbdsjwcduvfxp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRseXlha3dnYmRzandjZHV2ZnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NDM3MzIsImV4cCI6MjA5NDQxOTczMn0.aAdqjwYaPufXmFhfiBqjxgM76h8KEgOQ24r-p4OUs0E';

const supabase = Supabase.createClient(supabaseUrl, supabaseKey);

let cart = [];
let menuItems = [];

// Load menu from database
async function loadMenu() {
  console.log("Trying to load menu from Supabase...");

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('category');

  if (error) {
    console.error("Database error:", error);
    const container = document.getElementById('menu-container');
    if (container) container.innerHTML = `<p class="text-red-500 p-8">Error loading menu: ${error.message}</p>`;
    return;
  }

  console.log("Menu data received:", data);
  menuItems = data || [];
  renderMenu();
}

function renderMenu() {
  const container = document.getElementById('menu-container');
  if (!container) return;

  container.innerHTML = menuItems.map(item => `
    <div class="bg-white p-6 rounded-3xl shadow">
      <h3 class="font-semibold text-xl">${item.name}</h3>
      <p class="text-gray-600 mt-1">${item.description || ''}</p>
      <div class="mt-4 flex justify-between items-center">
        <span class="text-2xl font-bold">£${parseFloat(item.price).toFixed(2)}</span>
        <button onclick="addToCart(${item.id})" class="bg-orange-600 text-white px-6 py-2 rounded-xl">Add</button>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const item = menuItems.find(i => i.id === id);
  if (item) {
    cart.push({...item, quantity: 1});
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.textContent = cart.length;
    alert(`${item.name} added to cart`);
  }
}

function toggleCart() {
  alert("Cart clicked - " + cart.length + " items (demo)");
}

// Run when page loads
window.onload = loadMenu;
