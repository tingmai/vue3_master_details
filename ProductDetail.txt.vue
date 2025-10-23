<template>
  <div class="product-detail">
    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <p>Loading product details...</p>
    </div>

    <!-- Product Content -->
    <div v-else-if="product" class="product-content">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <router-link to="/" class="breadcrumb-link">Products</router-link>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ product.name }}</span>
      </nav>

      <!-- Product Layout -->
      <div class="product-layout">
        <!-- Product Image -->
        <div class="product-image-section">
          <img :src="product.image" :alt="product.name" class="product-image" />
        </div>

        <!-- Product Info -->
        <div class="product-info-section">
          <div class="product-header">
            <span class="product-category">{{ product.category }}</span>
            <h1 class="product-title">{{ product.name }}</h1>
            <div class="product-price">${{ product.price }}</div>
          </div>

          <div class="product-actions">
            <button class="btn-primary" @click="addToCart">
              Add to Cart
            </button>
            <button class="btn-secondary" @click="addToWishlist">
              Add to Wishlist
            </button>
          </div>

          <div class="product-meta">
            <div class="meta-item">
              <span class="meta-label">Product ID:</span>
              <span class="meta-value">#{{ product.id }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Category:</span>
              <span class="meta-value">{{ product.category }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div class="related-products" v-if="relatedProducts.length > 0">
        <h2 class="section-title">Related Products</h2>
        <div class="related-grid">
          <div 
            v-for="relatedProduct in relatedProducts" 
            :key="relatedProduct.id" 
            class="related-card"
            @click="viewProductDetail(relatedProduct)"
          >
            <img :src="relatedProduct.image" :alt="relatedProduct.name" />
            <div class="related-info">
              <h4>{{ relatedProduct.name }}</h4>
              <p>${{ relatedProduct.price }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <div class="back-section">
        <button @click="goBack" class="btn-back">
          ← Back to Products
        </button>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="error">
      <p>Product not found.</p>
      <button @click="goBack" class="btn-back">Go Back</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Router and Route
const route = useRoute()
const router = useRouter()

// Reactive data
const product = ref(null)
const loading = ref(true)
const allProducts = ref([])

// Static product data (same as in ProductIndex)
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
const relatedProducts = computed(() => {
  if (!product.value) return []
  
  return allProducts.value
    .filter(p => p.category === product.value.category && p.id !== product.value.id)
    .slice(0, 4) // Show max 4 related products
})

// Methods
const findProductById = (id) => {
  return allProducts.value.find(product => product.id === parseInt(id))
}

const loadProduct = () => {
  loading.value = true
  const productId = parseInt(route.params.id)
  
  // Simulate API call delay
  setTimeout(() => {
    const foundProduct = findProductById(productId)
    
    if (foundProduct) {
      product.value = foundProduct
    } else {
      product.value = null
    }
    
    loading.value = false
  }, 300)
}



const viewProductDetail = (relatedProduct) => {
  router.push({
    name: 'ProductDetail',
    params: { id: relatedProduct.id }
  })
}

const goBack = () => {
  router.push('/')
}

// Lifecycle
onMounted(() => {
  allProducts.value = staticProducts
  loadProduct()
})

// Watch for route changes
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loadProduct()
    }
  }
)
</script>

<style scoped>
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: #64748b;
  font-size: 0.9rem;
}

.breadcrumb-link {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-link:hover {
  color: #5a67d8;
  text-decoration: underline;
}

.breadcrumb-separator {
  color: #cbd5e1;
}

.breadcrumb-current {
  color: #1e293b;
  font-weight: 600;
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.product-image-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}

.product-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
}

.product-info-section {
  padding: 1rem 0;
}

.product-header {
  margin-bottom: 2rem;
}

.product-category {
  display: inline-block;
  background: #e0e7ff;
  color: #4f46e5;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
}

.product-title {
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 700;
  line-height: 1.2;
}

.product-price {
  font-size: 2rem;
  color: #667eea;
  font-weight: 700;
}

.product-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn-primary, .btn-secondary {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: white;
  color: #475569;
  border: 2px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-2px);
}

.product-meta {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.meta-item:not(:last-child) {
  border-bottom: 1px solid #e2e8f0;
}

.meta-label {
  color: #64748b;
  font-weight: 500;
}

.meta-value {
  color: #1e293b;
  font-weight: 600;
}

.related-products {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.related-card {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #f1f5f9;
}

.related-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.related-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.75rem;
}

.related-info h4 {
  font-size: 0.9rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.related-info p {
  color: #667eea;
  font-weight: 700;
  font-size: 1rem;
}

.back-section {
  text-align: center;
  margin-top: 2rem;
}

.btn-back {
  background: white;
  color: #475569;
  border: 2px solid #e2e8f0;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-back:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-2px);
}

.loading, .error {
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
  font-size: 1.1rem;
}

.error {
  color: #ef4444;
}

@media (max-width: 768px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .product-title {
    font-size: 2rem;
  }
  
  .product-actions {
    flex-direction: column;
  }
  
  .related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>