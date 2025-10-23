<template>
  <div class="product-index">
    <div class="page-header">
      <h1>Our Products</h1>
      <p>Discover amazing products at great prices</p>
    </div>

    <!-- Category Filter -->
    <div class="filter-section">
      <label for="category-filter" class="filter-label">Filter by Category:</label>
      <select 
        id="category-filter" 
        v-model="selectedCategory" 
        class="category-select"
        @change="filterProducts"
      >
        <option value="all">All Categories</option>
        <option 
          v-for="category in categories" 
          :key="category" 
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>

    <!-- Products Grid -->
    <div class="products-grid">
      <div 
        v-for="product in filteredProducts" 
        :key="product.id" 
        class="product-card"
        @click="viewProductDetail(product)"
      >
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
          <div class="product-category-badge">{{ product.category }}</div>
        </div>
        
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">${{ product.price }}</p>
          <div class="product-actions">
            <button 
              class="view-details-btn"
              @click.stop="viewProductDetail(product)"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- No Products Message -->
    <div v-if="filteredProducts.length === 0" class="no-products">
      <p>No products found in the selected category.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Router
const router = useRouter()

// Reactive data
const products = ref([])
const selectedCategory = ref('all')

// Static product data
const staticProducts = [
  { id: 1, category: 'Electronics', name: 'Wireless Headphones', price: 99.99, image: 'https://picsum.photos/300/200?random=1' },
  { id: 2, category: 'Electronics', name: 'Smart Watch', price: 199.99, image: 'https://picsum.photos/300/200?random=2' },
  { id: 3, category: 'Electronics', name: 'Bluetooth Speaker', price: 59.99, image: 'https://picsum.photos/300/200?random=3' },
  { id: 4, category: 'Electronics', name: 'Gaming Mouse', price: 49.99, image: 'https://picsum.photos/300/200?random=4' },
  { id: 5, category: 'Clothing', name: 'Cotton T-Shirt', price: 24.99, image: 'https://picsum.photos/300/200?random=5' },
  { id: 6, category: 'Clothing', name: 'Denim Jeans', price: 79.99, image: 'https://picsum.photos/300/200?random=6' },
  { id: 7, category: 'Clothing', name: 'Winter Jacket', price: 129.99, image: 'https://picsum.photos/300/200?random=7' },
  { id: 8, category: 'Clothing', name: 'Running Shoes', price: 89.99, image: 'https://picsum.photos/300/200?random=8' },
  { id: 9, category: 'Home', name: 'Coffee Maker', price: 49.99, image: 'https://picsum.photos/300/200?random=9' },
  { id: 10, category: 'Home', name: 'Desk Lamp', price: 34.99, image: 'https://picsum.photos/300/200?random=10' },
  { id: 11, category: 'Home', name: 'Throw Pillow', price: 19.99, image: 'https://picsum.photos/300/200?random=11' },
  { id: 12, category: 'Home', name: 'Kitchen Blender', price: 69.99, image: 'https://picsum.photos/300/200?random=12' },
  { id: 13, category: 'Books', name: 'Vue.js Guide', price: 29.99, image: 'https://picsum.photos/300/200?random=13' },
  { id: 14, category: 'Books', name: 'JavaScript Essentials', price: 24.99, image: 'https://picsum.photos/300/200?random=14' },
  { id: 15, category: 'Books', name: 'Web Development', price: 39.99, image: 'https://picsum.photos/300/200?random=15' },
  { id: 16, category: 'Sports', name: 'Yoga Mat', price: 29.99, image: 'https://picsum.photos/300/200?random=16' },
  { id: 17, category: 'Sports', name: 'Dumbbell Set', price: 89.99, image: 'https://picsum.photos/300/200?random=17' },
  { id: 18, category: 'Sports', name: 'Basketball', price: 34.99, image: 'https://picsum.photos/300/200?random=18' },
  { id: 19, category: 'Beauty', name: 'Face Cream', price: 24.99, image: 'https://picsum.photos/300/200?random=19' },
  { id: 20, category: 'Beauty', name: 'Perfume', price: 59.99, image: 'https://picsum.photos/300/200?random=20' }
]

// Computed properties
const categories = computed(() => {
  const uniqueCategories = [...new Set(products.value.map(product => product.category))]
  return uniqueCategories.sort()
})

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return products.value
  }
  return products.value.filter(product => product.category === selectedCategory.value)
})

// Methods
const viewProductDetail = (product) => {
  router.push({
    name: 'ProductDetail',
    params: { id: product.id },
    query: { 
      category: product.category,
      name: product.name,
      price: product.price,
      image: product.image
    }
  })
}

const filterProducts = () => {
  // The computed property filteredProducts will automatically update
  console.log(`Filtering by: ${selectedCategory.value}`)
}

// Lifecycle
onMounted(() => {
  products.value = staticProducts
  console.log('Products loaded:', products.value.length)
})
</script>

<style scoped>
.product-index {
  padding: 0 1rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.page-header p {
  color: #64748b;
  font-size: 1.1rem;
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.filter-label {
  font-weight: 600;
  color: #475569;
}

.category-select {
  padding: 0.5rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #475569;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

.product-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  border: 1px solid #f1f5f9;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.product-category-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(102, 126, 234, 0.9);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-info {
  padding: 1.5rem;
}

.product-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 1rem;
}

.product-actions {
  display: flex;
  gap: 0.75rem;
}

.view-details-btn {
  flex: 1;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-details-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.no-products {
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .filter-section {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>