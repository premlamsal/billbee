import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/invoices',
			component: () => import('../views/Invoices.vue')
		},
    {
			path: '/products',
			component: () => import('../views/Products.vue')
		},
    {
			path: '/users',
			component: () => import('../views/Users.vue')
		},
    {
			path: '/settings',
			component: () => import('../views/Settings.vue')
		},
	],
})

export default router