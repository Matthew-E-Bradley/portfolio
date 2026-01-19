import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
{
  path: '/portfolio',
  name: 'portfolio',
  component: () => import('../views/PortfolioView.vue'),
},

{
  path: '/gallery/record-fair',
  name: 'gallery-record-fair',
  component: () => import('../components/GalleryRecordFair.vue'),
},
{
  path: '/gallery/logos',
  name: 'gallery-logos',
  component: () => import('../components/GalleryLogos.vue'),
},
{
  path: '/gallery/posters',
  name: 'gallery-posters',
  component: () => import('../components/GalleryPosters.vue'),
},
  ],
})

export default router