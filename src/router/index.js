import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


import { useSnipperStore } from "@/stores/snipper";
import { useAuthStore } from "@/stores/auth";




const router = createRouter({

	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/Auth/Login.vue'),
		},
		{
			path: '/register',
			name: 'register',
			component: () => import('../views/Auth/Register.vue')
		},
		{
			path: '/create-store',
			component: () => import('../views/Auth/CreateStore.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/invoices',
			component: () => import('../views/Invoice/Invoices.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/new-invoice',
			component: () => import('../views/Invoice/NewInvoice.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/:id/edit-invoice',
			name: 'editInvoice',
			component: () => import('../views/Invoice/EditInvoice.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/:id/show-invoice',
			name: 'ShowInvoice',
			component: () => import('../views/Invoice/ShowInvoice.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/purchases',
			component: () => import('../views/Purchase/purchases.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/new-purchase',
			component: () => import('../views/Purchase/NewPurchase.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/:id/edit-purchase',
			name: 'editPurchase',
			component: () => import('../views/Purchase/EditPurchase.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/:id/show-purchase',
			name: 'ShowPurchase',
			component: () => import('../views/Purchase/ShowPurchase.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/products',
			component: () => import('../views/Product/Products.vue'),
			meta: {
				requiresAuth: true,
			},
			beforeEnter(to, from, next) {

				const store = useSnipperStore();

				let hasAccess = store.permissions
				if (hasAccess.includes('view_products') || hasAccess.includes('all')) {
					next()
				} else {
					next('/whoops')
				}

			}
		},
		{
			path: '/:id/show-product',
			name: 'ShowProduct',
			component: () => import('../views/Product/ShowProduct.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/customers',
			component: () => import('../views/Customer/Customers.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/suppliers',
			component: () => import('../views/Supplier/Suppliers.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/users',
			component: () => import('../views/User/Users.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/roles',
			component: () => import('../views/Role/Roles.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/permissions',
			component: () => import('../views/Permission/Permissions.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/settings',
			component: () => import('../views/Setting/Settings.vue'),
			meta: {
				requiresAuth: true,
			},
		},
	],
})



//async call to fetch permissions
router.beforeEach(async (to, from, next) => {
	const storeSnipp = useSnipperStore();
	const storeAuth = useAuthStore();

		//logged IN
		if (storeAuth.authData.isAuthenticated) {

		await	storeSnipp.getPermissions();
			next();
			return;
		}
		else {//not loggedIN
			if (to.matched.some((record) => record.meta.requiresAuth)) {
				next("/login");
				return;
			} else {
				next();
				return;
			}

		}
	


})


export default router