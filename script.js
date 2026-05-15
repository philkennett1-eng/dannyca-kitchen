// script.js - Clean version - supabase declared only here

const supabaseUrl = 'https://tlyyakwgbdsjwcduvfxp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRseXlha3dnYmRzandjZHV2ZnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NDM3MzIsImV4cCI6MjA5NDQxOTczMn0.aAdqjwYaPufXmFhfiBqjxgM76h8KEgOQ24r-p4OUs0E';

const supabase = Supabase.createClient(supabaseUrl, supabaseKey);

let cart = [];
let menuItems = [];

async function loadMenu() {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error(error);
    menuItems = [{id:1, name:"Chicken Adobo", price:9.50, desc:"Sample item - DB issue"}];
  } else {
    menuItems = data || [];
  }
  renderMenu();
}

function renderMenu() {
  const container = document.getElementById('menu-container');
  container.innerHTML = menuItems.map(item => `
    <div class="bg-white p-6 rounded-3xl shadow">
      <h3 class="font-semibold text-xl">${item.name}</h3>
      <p class="text-gray-600">${item.description || item.desc || ''}</p>
      <div class="mt-4 flex justify-between items-center">
        <span class="text-xl font-bold">£${parseFloat(item.price).toFixed(2)}</span>
        <button onclick="addToCart(${item.id})" class="bg-orange-600 text-white px-6 py-2 rounded-xl">Add</button>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const item = menuItems.find(i => i.id === id);
  if (item) {
    const existing = cart.find(i => i.id === id);
    if (existing) existing.quantity = (existing.quantity || 1) + 1;
    else cart.push({...item, quantity: 1});
    updateCartCount();
  }
}

function updateCartCount() {
  let total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  document.getElementById('cart-count').textContent = total;
}

function toggleCart() {
  alert("Cart clicked (demo)");
}

// Start
loadMenu();
