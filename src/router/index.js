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
			component: () => import('../views/Invoice/Invoices.vue'),
		},
		{
			path: '/new-invoice',
			component: () => import('../views/Invoice/NewInvoice.vue')
		},
		{
			path: '/:id/edit-invoice',
			name:'editInvoice',
			component: () => import('../views/Invoice/EditInvoice.vue')
		},
		{
			path: '/purchases',
			component: () => import('../views/Purchase/purchases.vue'),
		},
		{
			path: '/products',
			component: () => import('../views/Product/Products.vue')
		},
		{
			path: '/customers',
			component: () => import('../views/Customer/Customers.vue')
		},
		{
			path: '/suppliers',
			component: () => import('../views/Supplier/Suppliers.vue')
		},
		{
			path: '/users',
			component: () => import('../views/User/Users.vue')
		},
		{
			path: '/settings',
			component: () => import('../views/Setting/Settings.vue')
		},
	],
})

export default router