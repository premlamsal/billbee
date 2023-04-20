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
			path: '/login',
			component: () => import('../views/Auth/Login.vue'),
		},
		{
			path: '/register',
			component: () => import('../views/Auth/Register.vue'),
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
			path: '/:id/show-invoice',
			name:'ShowInvoice',
			component: () => import('../views/Invoice/ShowInvoice.vue')
		},
		{
			path: '/purchases',
			component: () => import('../views/Purchase/purchases.vue'),
		},
		{
			path: '/new-purchase',
			component: () => import('../views/Purchase/NewPurchase.vue')
		},
		{
			path: '/:id/edit-purchase',
			name:'editPurchase',
			component: () => import('../views/Purchase/EditPurchase.vue')
		},
		{
			path: '/:id/show-purchase',
			name:'ShowPurchase',
			component: () => import('../views/Purchase/ShowPurchase.vue')
		},
		{
			path: '/products',
			component: () => import('../views/Product/Products.vue')
		},
		{
			path: '/:id/show-product',
			name:'ShowProduct',
			component: () => import('../views/Product/ShowProduct.vue')
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
			path: '/roles',
			component: () => import('../views/Role/Roles.vue')
		},
		{
			path: '/settings',
			component: () => import('../views/Setting/Settings.vue')
		},
	],
})

export default router