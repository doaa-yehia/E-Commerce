import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { logedGuard } from './core/guards/loged/loged.guard';

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },

  // Auth Layout Routes
  { 
    path: "", 
    component: AuthLayoutComponent,canActivate:[logedGuard],
    children: [
      { path: "register", loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), title: "register" },
      { path: "login", loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), title: "login" },
      { path: "forget", loadComponent: () => import('./pages/forget/forget.component').then(m => m.ForgetComponent), title: "rePassword" }

    ]
  },

  // Main Layout Routes
  { 
    path: "", 
    component: MainLayoutComponent,canActivate:[authGuard] ,
    children: [
      { path: "home", loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: "home" },
      { path: "brands", loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent), title: "brands" },
      { path: "cart", loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent), title: "cart" },
      { path: "categories", loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent), title: "categories" },
      { path: "wishList", loadComponent: () => import('./pages/wish-list/wish-list.component').then(m => m.WishListComponent), title: "wishList" },
      { path: "allorders", loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllordersComponent), title: "allorders" },
      { path: "checkout/:id",loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent), title: "checkout" },
      { path: "products", loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), title: "products" },
      { path:"details/:id",loadComponent:()=>import('./pages/details/details.component').then(m=>m.DetailsComponent),title:"details"},
      { path: "**", loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent), title: "notfound" }
    ]
  }
];
