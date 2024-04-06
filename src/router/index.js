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
				title: 'Home' + " | " + import.meta.env.VITE_MY_APP_NAME,

			},

		},
		{
			path: '/login',
			name: 'login',
			meta: {
				title: 'Login' + " | " + import.meta.env.VITE_MY_APP_NAME,

			},
			component: () => import('../views/Auth/Login.vue'),


		},
		{
			path: '/register',
			name: 'register',
			meta: {
				title: 'Register' + " | " + import.meta.env.VITE_MY_APP_NAME,

			},
			component: () => import('../views/Auth/Register.vue')
		},
		{
			path: '/create-store',
			component: () => import('../views/Auth/CreateStore.vue'),
			meta: {
				requiresAuth: true,
				title: 'Create Store' + " | " + import.meta.env.VITE_MY_APP_NAME,

			},
		},
		{
			path: '/invoices',
			component: () => import('../views/Invoice/Invoices.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,
				title: 'Invoices' + " | " + import.meta.env.VITE_MY_APP_NAME,


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
				title: 'New Invoice' + " | " + import.meta.env.VITE_MY_APP_NAME,


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
				title: 'Edit Invoice' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'Invoice' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'Print Invoice' + " | " + import.meta.env.VITE_MY_APP_NAME,

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

				title: 'Purchases' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'New Purchase' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'Edit Purchase' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'Show Purchase' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
			path: '/:id/print-purchase',
			name: 'PrintPurchase',
			component: () => import('../views/Purchase/PrintPurchase.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,
				title: 'Print Purchase' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'Products' + " | " + import.meta.env.VITE_MY_APP_NAME,


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
				title: 'Produt Profile' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'Product' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'Customer Payments' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'Customer' + " | " + import.meta.env.VITE_MY_APP_NAME,
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
				title: 'Customers' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'Supplier Payments' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'Supplier' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'Suppliers' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'Users' + " | " + import.meta.env.VITE_MY_APP_NAME,


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
				title: 'Roles' + " | " + import.meta.env.VITE_MY_APP_NAME,


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
				title: 'Permissions' + " | " + import.meta.env.VITE_MY_APP_NAME,
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
				title: 'Categories' + " | " + import.meta.env.VITE_MY_APP_NAME,
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
				title: 'Units' + " | " + import.meta.env.VITE_MY_APP_NAME,
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
				title: 'Accounts' + " | " + import.meta.env.VITE_MY_APP_NAME,
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
				title: 'Account' + " | " + import.meta.env.VITE_MY_APP_NAME,
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
				title: 'Transactions' + " | " + import.meta.env.VITE_MY_APP_NAME,
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
				title: 'Settings' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
		{
			path: '/storeprofile',
			component: () => import('../views/Setting/StoreProfile.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,
				title: 'StoreProfile' + " | " + import.meta.env.VITE_MY_APP_NAME,

			},
			beforeEnter(to, from, next) {
				if (useSnipperStore().checkPermission('view_store_profile')) {
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
				title: 'Return Invoices' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'New Return Invoice' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'Edit Return Invoice' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'Return Invoice' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
			path: '/:id/print-return-invoice',
			name: 'PrintInvoice',
			component: () => import('../views/Returns/Invoice/PrintReturnInvoice.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,
				title: 'Print Return Invoice' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'Return Purchases' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'New Return Purchase' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'Edit Return Purchase' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'Return Purchase' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
			path: '/:id/print-return-purchase',
			name: 'PrintReturnPurchase',
			component: () => import('../views/Returns/Purchase/PrintReturnPurchase.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,
				title: 'Print Return Purchase' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
				title: 'Returns' + " | " + import.meta.env.VITE_MY_APP_NAME,

			},

		},
		{
			path: '/stocks',
			name: 'stocks',
			component: () => import('../views/Stock/Stocks.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,
				title: 'Stocks' + " | " + import.meta.env.VITE_MY_APP_NAME,

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
			meta: {

				title: 'Not Found' + " | " + import.meta.env.VITE_MY_APP_NAME,
			},
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

router.beforeEach((to, from, next) => {
	// Get the page title from the route meta data that we have defined
	// See further down below for how we setup this data
	const title = to.meta.title

	//Take the title from the parameters
	const titleFromParams = to.params.pageTitle;
	// If the route has a title, set it as the page title of the document/page
	if (title) {
		document.title = title
	}
	// If we have a title from the params, extend the title with the title
	// from our params
	if (titleFromParams) {
		document.title = `${titleFromParams} - ${document.title}`;
	}
	// Continue resolving the route
	next()
})


export default router