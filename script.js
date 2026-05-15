// script.js - Minimal Working Version
console.log("Script loaded");

const supabaseUrl = 'https://tlyyakwgbdsjwcduvfxp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRseXlha3dnYmRzandjZHV2ZnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NDM3MzIsImV4cCI6MjA5NDQxOTczMn0.aAdqjwYaPufXmFhfiBqjxgM76h8KEgOQ24r-p4OUs0E';

const supabase = Supabase.createClient(supabaseUrl, supabaseKey);

async function loadMenu() {
  console.log("Trying to load from database...");
  const { data, error } = await supabase.from('products').select('*');
  
  if (error) {
    console.error("Error:", error);
    document.getElementById('menu-container').innerHTML = "<p class='text-red-500'>Error loading menu. Check console.</p>";
    return;
  }

  console.log("Data received:", data);

  const container = document.getElementById('menu-container');
  container.innerHTML = data.map(item => `
    <div class="bg-white p-6 rounded-3xl shadow">
      <h3 class="font-bold">${item.name}</h3>
      <p>£${parseFloat(item.price).toFixed(2)}</p>
      <button onclick="alert('Added ${item.name}')" class="mt-4 bg-orange-600 text-white px-6 py-2 rounded-xl">Add</button>
    </div>
  `).join('');
}

// Run on load
window.onload = loadMenu;
