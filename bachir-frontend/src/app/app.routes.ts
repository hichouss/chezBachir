import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./public/home/home.component').then(m => m.HomeComponent) },
  { path: 'catalogue', loadComponent: () => import('./public/catalogue/catalogue.component').then(m => m.CatalogueComponent) },
  { path: 'panier', loadComponent: () => import('./public/cart/cart.component').then(m => m.CartComponent) },
  { path: 'commande', loadComponent: () => import('./public/checkout/checkout.component').then(m => m.CheckoutComponent) },
  { path: 'horaires', loadComponent: () => import('./public/horaires/horaires.component').then(m => m.HorairesComponent) },
  { path: 'contact', loadComponent: () => import('./public/contact/contact.component').then(m => m.ContactComponent) },
  {
    path: 'admin',
    children: [
      { path: 'login', loadComponent: () => import('./admin/login/login.component').then(m => m.LoginComponent) },
      {
        path: '',
        loadComponent: () => import('./admin/layout/admin-layout.component').then(m => m.AdminLayoutComponent),
        canActivate: [authGuard],
        children: [
          { path: 'dashboard', loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent) },
          { path: 'produits', loadComponent: () => import('./admin/products/products.component').then(m => m.ProductsComponent) },
          { path: 'categories', loadComponent: () => import('./admin/categories/categories.component').then(m => m.CategoriesComponent) },
          { path: 'commandes', loadComponent: () => import('./admin/orders/orders.component').then(m => m.OrdersComponent) },
          { path: 'magasin', loadComponent: () => import('./admin/store-settings/store-settings.component').then(m => m.StoreSettingsComponent) },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
