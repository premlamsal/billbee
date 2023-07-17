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
		},
		{
			path: '/new-invoice',
			component: () => import('../views/Invoice/NewInvoice.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

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
		},
		{
			path: '/:id/show-invoice',
			name: 'ShowInvoice',
			component: () => import('../views/Invoice/ShowInvoice.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
		},
		{
			path: '/purchases',
			component: () => import('../views/Purchase/purchases.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
		},
		{
			path: '/new-purchase',
			component: () => import('../views/Purchase/NewPurchase.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

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
		},
		{
			path: '/:id/show-purchase',
			name: 'ShowPurchase',
			component: () => import('../views/Purchase/ShowPurchase.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
		},
		{
			path: '/products',
			component: () => import('../views/Product/Products.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

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
			path: '/:id/show-product',
			name: 'ShowProduct',
			component: () => import('../views/Product/ShowProduct.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

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
		},
		{
			path: '/:id/show-customer',
			name: 'ShowCustomer',
			component: () => import('../views/Customer/CustomerProfile.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
		},
		{
			path: '/customers',
			component: () => import('../views/Customer/Customers.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

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
		},
		{
			path: '/:id/show-supplier',
			name: 'ShowSupplier',
			component: () => import('../views/Supplier/SupplierProfile.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
		},
		{
			path: '/suppliers',
			component: () => import('../views/Supplier/Suppliers.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
		},
		{
			path: '/users',
			component: () => import('../views/User/Users.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
		},
		{
			path: '/roles',
			component: () => import('../views/Role/Roles.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
		},
		{
			path: '/permissions',
			component: () => import('../views/Permission/Permissions.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,
			},
		},
		{
			path: '/categories',
			component: () => import('../views/Category/Categories.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,
			},
		},
		{
			path: '/units',
			component: () => import('../views/Unit/Units.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,
			},
		},
		{
			path: '/accounts',
			component: () => import('../views/Account/Accounts.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,
			},
		},
		{
			path: '/:id/show-account',
			component: () => import('../views/Account/AccountProfile.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,
			},
		},
		{
			path: '/transactions',
			component: () => import('../views/Transaction/Transactions.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,
			},
		},
		{
			path: '/settings',
			component: () => import('../views/Setting/Settings.vue'),
			meta: {
				requiresAuth: true,
				requiresStore: true,

			},
		},
	],
})



//async call to fetch permissions
router.beforeEach(async (to, from, next) => {
	const storeSnipp = useSnipperStore();
	const storeAuth = useAuthStore();
	// console.log(storeSnipp.stores)


	await storeSnipp.getStores();

	//logged IN
	if (storeAuth.authData.isAuthenticated) {


		//this block executes when user is authenticated
		if (to.name == 'login' || to.name == 'register') {
			next('/');//redirect to home if user is already logged in while navigating to login || register page
			return;
		} else {
			//logged in and also need store to open home
			if (to.matched.some((record) => record.meta.requiresStore)) {

				if (storeSnipp.hasStore) {
					//when user is authenciated and navigate to different routes and checking routes permissions
					await storeSnipp.getPermissions();
					next();
					return;
				} else {
					// console.log('here i am')
					next('/create-store');
					return;
				}
			} else {
				await storeSnipp.getPermissions();
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

	///new routes

	// if (to.matched.some((record) => record.meta.requiresAuth)) {


	// 	if (storeAuth.authData.isAuthenticated) {
	// 		//if user already authenticated redirect to home or / i.e root url

	// 		//also we need to check that either loggedin user have store assigned or not if not redirect them to create-store page
	// 		await storeSnipp.getStores();
	// 		if (storeSnipp.hasStore) {
	// 			//user has store now redirect to homepage or check permssions for each page url that user have or not

	// 			await storeSnipp.getPermissions();

	// 			let hasAccess = storeSnipp.permissions

	// 			if (hasAccess.includes('view_products') || hasAccess.includes('all')) {
	// 				//now permisison is check redirect to going route by user
	// 				next();
	// 				return;
	// 			} else {
	// 				//user dont have permision to access the page check so redirect to opps page
	// 				next("/oops");
	// 				return;
	// 			}


	// 		}
	// 		 else {
	// 			//user dont have store now redirect to create-store page
	// 			next("/create-store");

	// 			return;
	// 		}



	// 	} else {
	// 		//if not authenticated redirect to login page

	// 		next("/login");

	// 		return;

	// 	}

	// } else {
	// 	//routes will redirect to their redirected page if not login required
	// 	next();
	// 	return;
	// }


})


export default router