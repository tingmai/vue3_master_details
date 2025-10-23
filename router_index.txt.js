import { createRouter, createWebHistory } from 'vue-router'
import ProductIndex from '@/views/ProductIndex.vue'
import ProductDetail from '@/views/ProductDetail.vue'

const routes = [
  {
    path: '/',
    name: 'ProductIndex',
    component: ProductIndex
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router