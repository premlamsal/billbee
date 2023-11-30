import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


import { useSnipperStore } from "@/stores/snipper";
import { useAuthStore } from "@/stores/auth";


const router = createRouter({

	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home,
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},

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
				requiresStore: true,


			},
			beforeEnter(to, from, next) {

				if (useSnipperStore().checkPermission('view_invoice')) {
					next()
				}
				else {
					next('notfound')
				}


			},
		},
		{
			path: '/new-invoice',
			component: () => import('../views/Invoice/NewInvoice.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,


			},
			beforeEnter(to, from, next) {

				if (useSnipperStore().checkPermission('add_invoice')) {
					next()
				}
				else {
					next('notfound')
				}
			},
		},
		{
			path: '/:id/edit-invoice',
			name: 'editInvoice',
			component: () => import('../views/Invoice/EditInvoice.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {

				if (useSnipperStore().checkPermission('edit_invoice')) {
					next()
				}
				else {
					next('notfound')
				}
			},
		},
		{
			path: '/:id/show-invoice',
			name: 'ShowInvoice',
			component: () => import('../views/Invoice/ShowInvoice.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {
				let hasAccess = useSnipperStore().permissions;

				if (useSnipperStore().checkPermission('view_invoice')) {
					next()
				}
				else {
					next('notfound')
				}
			},
		},

		{
			path: '/:id/print-invoice',
			name: 'PrintInvoice',
			component: () => import('../views/Invoice/PrintInvoice.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {

				if (useSnipperStore().checkPermission('view_invoice')) {
					next()
				}
				else {
					next('notfound')
				}
			},
		},
		{
			path: '/purchases',
			component: () => import('../views/Purchase/purchases.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,


			},
			beforeEnter(to, from, next) {

				if (useSnipperStore().checkPermission('view_purchase')) {
					next()
				}
				else {
					next('notfound')
				}
			},
		},
		{
			path: '/new-purchase',
			component: () => import('../views/Purchase/NewPurchase.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {

				if (useSnipperStore().checkPermission('add_purchase')) {
					next()
				}
				else {
					next('notfound')
				}
			},
		},
		{
			path: '/:id/edit-purchase',
			name: 'editPurchase',
			component: () => import('../views/Purchase/EditPurchase.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {

				if (useSnipperStore().checkPermission('edit_purchase')) {
					next()
				}
				else {
					next('notfound')
				}
			},
		},
		{
			path: '/:id/show-purchase',
			name: 'ShowPurchase',
			component: () => import('../views/Purchase/ShowPurchase.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {

				if (useSnipperStore().checkPermission('view_purchase')) {
					next()
				}
				else {
					next('notfound')
				}
			},
		},
		{
			path: '/products',
			component: () => import('../views/Product/Products.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,


			},
			beforeEnter(to, from, next) {

				if (useSnipperStore().checkPermission('view_product')) {
					next()
				}
				else {
					next('notfound')
				}
			},
			// beforeEnter(to, from, next) {

			// 	const store = useSnipperStore();

			// 	let hasAccess = store.permissions
			// 	if (hasAccess.includes('view_products') || hasAccess.includes('all')) {
			// 		next()
			// 	} else {
			// 		next('/whoops')
			// 	}

			// }
		},
		{
			path: '/:id/product-profile',
			name: 'ProductProfile',
			component: () => import('../views/Product/ProductProfile.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {
				let hasAccess = useSnipperStore().permissions;
				if (useSnipperStore().checkPermission('view_product')) {
					next()
				}
				else {
					next('notfound')
				}
			},
		},
		{
			path: '/:id/show-product',
			name: 'ShowProduct',
			component: () => import('../views/Product/ShowProduct.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {
				if (useSnipperStore().checkPermission('view_product')) {
					next()
				}
				else {
					next('notfound')
				}
			},
		},
		{
			path: '/:id/customer-payments',
			name: 'CustomerPayments',
			component: () => import('../views/Customer/CustomerPayments.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {

				if (useSnipperStore().checkPermission('view_customer_payment')) {
					next()
				}
				else {
					next('notfound')
				}

			},
		},
		{
			path: '/:id/show-customer',
			name: 'ShowCustomer',
			component: () => import('../views/Customer/CustomerProfile.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {
				if (useSnipperStore().checkPermission('view_customer')) {
					next()
				}
				else {
					next('notfound')
				}

			},
		},
		{
			path: '/customers',
			component: () => import('../views/Customer/Customers.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {
				if (useSnipperStore().checkPermission('view_customer')) {
					next()
				}
				else {
					next('notfound')
				}

			},
		},
		{
			path: '/:id/supplier-payments',
			name: 'SupplierPayments',
			component: () => import('../views/Supplier/SupplierPayments.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {

				if (useSnipperStore().checkPermission('view_supplier_payment')) {
					next()
				}
				else {
					next('notfound')
				}

			},
		},
		{
			path: '/:id/show-supplier',
			name: 'ShowSupplier',
			component: () => import('../views/Supplier/SupplierProfile.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {

				if (useSnipperStore().checkPermission('view_supplier')) {
					next()
				}
				else {
					next('notfound')
				}

			},
		},
		{
			path: '/suppliers',
			component: () => import('../views/Supplier/Suppliers.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,


			},
			beforeEnter(to, from, next) {
				if (useSnipperStore().checkPermission('view_supplier')) {
					next()
				}
				else {
					next('notfound')
				}
			},
		},
		{
			path: '/users',
			component: () => import('../views/User/Users.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,


			},
			beforeEnter(to, from, next) {
				if (useSnipperStore().checkPermission('view_user')) {
					next()
				}
				else {
					next('notfound')
				}
			},
		},
		{
			path: '/roles',
			component: () => import('../views/Role/Roles.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,


			},
			beforeEnter(to, from, next) {
				if (useSnipperStore().checkPermission('view_role')) {
					next()
				}
				else {
					next('notfound')
				}
			},
		},
		{
			path: '/permissions',
			component: () => import('../views/Permission/Permissions.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,
			},
			beforeEnter(to, from, next) {
				if (useSnipperStore().checkPermission('view_permission')) {
					next()
				}
				else {
					next('notfound')
				}
			},
		},
		{
			path: '/categories',
			component: () => import('../views/Category/Categories.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,
			},
			beforeEnter(to, from, next) {
				if (useSnipperStore().checkPermission('view_category')) {
					next()
				}
				else {
					next('notfound')
				}
			},
		},
		{
			path: '/units',
			component: () => import('../views/Unit/Units.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,
			},
			beforeEnter(to, from, next) {
				if (useSnipperStore().checkPermission('view_unit')) {
					next()
				}
				else {
					next('notfound')
				}
			},
		},
		{
			path: '/accounts',
			component: () => import('../views/Account/Accounts.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,
			},
			beforeEnter(to, from, next) {
				if (useSnipperStore().checkPermission('view_account')) {
					next()
				}
				else {
					next('notfound')
				}
			},
		},
		{
			path: '/:id/show-account',
			component: () => import('../views/Account/AccountProfile.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,
			},
			beforeEnter(to, from, next) {
				if (useSnipperStore().checkPermission('view_account')) {
					next()
				}
				else {
					next('notfound')
				}
			},
		},
		{
			path: '/transactions',
			component: () => import('../views/Transaction/Transactions.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,
			},
			beforeEnter(to, from, next) {
				if (useSnipperStore().checkPermission('view_transaction')) {
					next()
				}
				else {
					next('notfound')
				}
			},
		},
		{
			path: '/settings',
			component: () => import('../views/Setting/Settings.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {
				if (useSnipperStore().checkPermission('view_settings')) {
					next()
				}
				else {
					next('notfound')
				}
			},


		},


		//return invoices


		{
			path: '/return-invoices',
			name: 'returnInvoices',
			component: () => import('../views/Returns/Invoice/ReturnInvoices.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {
				if (useSnipperStore().checkPermission('view_return_invoice')) {
					next()
				}
				else {
					next('notfound')
				}

			},
		},
		{
			path: '/new-return-invoice',
			name: 'newInvoiceReturn',
			component: () => import('../views/Returns/Invoice/NewInvoiceReturn.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {
				if (useSnipperStore().checkPermission('add_return_invoice')) {
					next()
				}
				else {
					next('notfound')
				}

			},
		},
		{
			path: '/:id/edit-return-invoice',
			name: 'editInvoiceReturn',
			component: () => import('../views/Returns/Invoice/EditInvoiceReturn.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {

				if (useSnipperStore().checkPermission('edit_return_invoice')) {
					next()
				}
				else {
					next('notfound')
				}


			},
		},
		{
			path: '/:id/show-return-invoice',
			name: 'ShowInvoiceReturn',
			component: () => import('../views/Returns/Invoice/ShowInvoiceReturn.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {

				if (useSnipperStore().checkPermission('view_return_invoice')) {
					next()
				}
				else {
					next('notfound')
				}

			},
		},

		//return purchases


		{
			path: '/return-purchases',
			name: 'returnPurchases',
			component: () => import('../views/Returns/Purchase/ReturnPurchases.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {

				if (useSnipperStore().checkPermission('view_return_invoice')) {
					next()
				}
				else {
					next('notfound')
				}

			},
		},
		{
			path: '/new-return-purchase',
			name: 'newPurchaseReturn',
			component: () => import('../views/Returns/Purchase/NewPurchaseReturn.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {

				if (useSnipperStore().checkPermission('add_return_purchase')) {
					next()
				}
				else {
					next('notfound')
				}

			},
		},
		{
			path: '/:id/edit-return-purchase',
			name: 'editPurchaseReturn',
			component: () => import('../views/Returns/Purchase/EditPurchaseReturn.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {

				if (useSnipperStore().checkPermission('edit_return_purchase')) {
					next()
				}
				else {
					next('notfound')
				}

			},
		},
		{
			path: '/:id/show-return-purchase',
			name: 'ShowPurchaseReturn',
			component: () => import('../views/Returns/Purchase/ShowPurchaseReturn.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
			beforeEnter(to, from, next) {

				if (useSnipperStore().checkPermission('view_return_purchase')) {
					next()
				}
				else {
					next('notfound')
				}

			},
		},
		{
			path: '/returns',
			name: 'returns',
			component: () => import('../views/Returns/ReturnHome.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},

		},
		{
			path: '/stocks',
			name: 'stocks',
			component: () => import('../views/Stock/Stocks.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
		},
		{
			path: "/api-server-down",
			name: 'apiServerDown',
			component: () => import('../views/ErrorPages/apiServerDown.vue'),

		},
		{
			path: "/:notFound",
			name: 'notfound',
			component: () => import('../views/Error.vue'),
		},
	],
})


//async call to fetch permissions
router.beforeEach(async (to, from, next) => {

	const storeSnipp = useSnipperStore();
	const storeAuth = useAuthStore();

	if (storeAuth.authData.isAuthenticated) {


		//this block executes when user is authenticated
		if (to.name == 'login' || to.name == 'register') {
			next('/');//redirect to home if user is already logged in while navigating to login || register page
			return;
		} else {

			//logged in and also need store to open home
			if (to.matched.some((record) => record.meta.requiresStore)) {
				await storeSnipp.getStores();
				if (storeSnipp.hasStore) {
					//when user is authenciated and navigate to different routes and checking routes permissions
					next();
					return;
				} else {
					// console.log('here i am')
					next('/create-store');
					return;
				}
			}
			else {

				// await storeSnipp.getPermissions();

				next();
				console.log('hello boss darling');
				return;
			}




		}


	}
	else {//not loggedIN

		//this block executes when user is not logged in but check which routes needs authenticated user to navigate
		if (to.matched.some((record) => record.meta.requiresAuth)) {
			next("/login");
			// console.log('now here')
			return;
		} else {

			// console.log('now there')

			next();
			return;
		}
	}



})


export default router