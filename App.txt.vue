<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <h1 class="logo">Northern City Online Shop</h1>
        <router-link to="/" class="nav-link">All Products</router-link>
      </div>
    </nav>
    
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
// Composition API - no need for options, just script setup
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8fafc;
  color: #334155;
}

.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 80px);
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .main-content {
    padding: 1rem;
  }
}
</style>