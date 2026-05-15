<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dannyca’s Kitchen</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
</head>
<body class="bg-gray-50">

  <header class="bg-white shadow sticky top-0">
    <div class="max-w-6xl mx-auto px-6 py-5 flex justify-between">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold">DK</div>
        <h1 class="text-3xl font-bold">Dannyca’s Kitchen</h1>
      </div>
      <button onclick="toggleCart()" class="flex items-center gap-2 px-6 py-3 bg-orange-100 rounded-2xl">
        Cart (<span id="cart-count">0</span>)
      </button>
    </div>
  </header>

  <section class="max-w-6xl mx-auto px-6 py-16">
    <h2 class="text-5xl font-bold text-center mb-12">Our Menu</h2>
    <div id="menu-container" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"></div>
  </section>

  <script src="script.js"></script>
</body>
</html>
