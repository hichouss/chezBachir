import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="admin-layout">
      <aside class="admin-sidebar">
        <div class="admin-sidebar__logo">Boucherie <span>Bachir</span></div>
        <nav>
          <a routerLink="/admin/dashboard" routerLinkActive="active">📊 Tableau de bord</a>
          <a routerLink="/admin/commandes" routerLinkActive="active">📋 Commandes</a>
          <a routerLink="/admin/produits" routerLinkActive="active">🥩 Produits</a>
          <a routerLink="/admin/categories" routerLinkActive="active">🗂️ Catégories</a>
          <a routerLink="/admin/magasin" routerLinkActive="active">⚙️ Paramètres</a>
        </nav>
        <div class="admin-sidebar__logout">
          <button (click)="auth.logout()">Se déconnecter</button>
        </div>
      </aside>
      <main class="admin-content">
        <router-outlet />
      </main>
    </div>
  `
})
export class AdminLayoutComponent {
  auth = inject(AuthService);
}
