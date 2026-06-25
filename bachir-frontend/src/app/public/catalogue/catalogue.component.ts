import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface StaticProduct {
  id: number;
  name: string;
  category: string;
  emoji: string;
  imageUrl?: string;
  price?: number;
  unit?: string;
}

interface StaticCategory {
  id: string;
  name: string;
  emoji: string;
}

const ALL_PRODUCTS: StaticProduct[] = [
  // Bœuf
  { id: 1,  name: 'Côte de bœuf',       category: 'Bœuf', emoji: '🐄', imageUrl: "/Capture d'écran 2026-06-21 212441.png",     price: 23.99, unit: 'kg' },
  { id: 2,  name: 'Entrecôte',           category: 'Bœuf', emoji: '🐄', imageUrl: '/360_F_47091524_h8U9mviFhLg1qe9zBjFbvcMyHiEygf8E.jpg',   price: 23.99, unit: 'kg' },
  { id: 3,  name: 'Faux-filet',          category: 'Bœuf', emoji: '🐄', imageUrl: '/raw-striploin-strip-loin-steak-new-york-meat-beef-isolated-white-background-top-view_89816-53203.avif',  price: 23.99, unit: 'kg' },
  { id: 4,  name: 'Rumsteck',            category: 'Bœuf', emoji: '🐄', imageUrl: '/Rumsteak.jpg',    price: 20.99, unit: 'kg' },
  { id: 5,  name: 'Bavette',             category: 'Bœuf', emoji: '🐄', imageUrl: '/bavette-viande-de-boeuf-cru-steak-ou-faux-filet-d-aloyau-sur-planche-marbre-isolé-fond-blanc-272372257.webp', price: 20.99, unit: 'kg' },
  { id: 6,  name: 'Viande hachée',       category: 'Bœuf', emoji: '🐄', imageUrl: '/boeuf-hache-quoi-choisir.jpeg', price: 16.99, unit: 'kg' },
  { id: 7,  name: 'Pot-au-feu',          category: 'Bœuf', emoji: '🐄', imageUrl: "/Capture d'écran 2026-06-21 211833.png", price: 16.99, unit: 'kg' },
  { id: 8,  name: 'Collier de bœuf',     category: 'Bœuf', emoji: '🐄', imageUrl: '/Chuck Neck Roast.jpg', price: 16.99, unit: 'kg' },
  { id: 9,  name: 'Jarret de bœuf',      category: 'Bœuf', emoji: '🐄', imageUrl: "/Capture d'écran 2026-06-21 213511.png", price: 16.99, unit: 'kg' },
  { id: 10, name: 'Foie de bœuf',        category: 'Bœuf', emoji: '🐄', imageUrl: '/depositphotos_13332391-stock-photo-liver.jpg', price: 14.99, unit: 'kg' },
  // Agneau
  { id: 11, name: "Côtelettes d'agneau", category: 'Agneau', emoji: '🐑', imageUrl: '/zoom_114.jpg', price: 24.99, unit: 'kg' },
  { id: 12, name: "Gigot d'agneau",      category: 'Agneau', emoji: '🐑', imageUrl: '/gigot-d-agneau-entier-origine-france.jpg', price: 23.99, unit: 'kg' },
  { id: 13, name: "Épaule d'agneau",     category: 'Agneau', emoji: '🐑', imageUrl: '/fr_pim_219666001001_011.png', price: 22.99, unit: 'kg' },
  { id: 14, name: "Collier d'agneau",    category: 'Agneau', emoji: '🐑', imageUrl: '/47699-0w600h600_Collier_Agneau_France.jpg', price: 20.99, unit: 'kg' },
  { id: 15, name: "Souris d'agneau",     category: 'Agneau', emoji: '🐑', imageUrl: '/47702-0w470h470_Souris_Agneau_France.jpg', price: 25.99, unit: 'kg' },
  { id: 16, name: "Poitrine d'agneau",   category: 'Agneau', emoji: '🐑', imageUrl: '/poitrine-d-agneau-en-tranche-prete-a-cuire.jpg', price: 11.99, unit: 'kg' },
  { id: 17, name: "Foie d'agneau",       category: 'Agneau', emoji: '🐑', imageUrl: '/medium_Adobe_Stock_847816635_4979a3dc3e.webp', price: 16.99, unit: 'kg' },
  // Volaille
  { id: 18, name: 'Filet/Escalope de poulet', category: 'Volaille', emoji: '🐔', imageUrl: '/9812117-blanc-de-poulet-cru-gratuit-photo.jpg', price: 12.99, unit: 'kg' },
  { id: 19, name: 'Cuisses de poulet',   category: 'Volaille', emoji: '🐔', imageUrl: '/cuisses-de-poulet-cru-avec-peau-sur-fond-blanc-220856755.webp', price: 5.99, unit: 'kg' },
  { id: 20, name: 'Hauts de cuisse',     category: 'Volaille', emoji: '🐔', imageUrl: '/istockphoto-1401936268-612x612.jpg', price: 5.99, unit: 'kg' },
  { id: 21, name: 'Ailes de poulet',     category: 'Volaille', emoji: '🐔', imageUrl: '/45232932-raw-chicken-wings-isolated-on-white-background.jpg', price: 6.99, unit: 'kg' },
  { id: 22, name: 'Pilon de poulet',     category: 'Volaille', emoji: '🐔', imageUrl: '/75089340-trois-pilons-de-poulet-cru-isolé-sur-fond-blanc.jpg', price: 6.99, unit: 'kg' },
  { id: 23, name: 'Poulet entier',       category: 'Volaille', emoji: '🐔', imageUrl: '/poulet-cru-frais-entier-isole-fond-blanc_625448-304.avif', price: 8.99, unit: 'pièce' },
  { id: 24, name: 'Cuisses de dinde',    category: 'Volaille', emoji: '🐔', imageUrl: '/istockphoto-1289367014-612x612.jpg', price: 9.99, unit: 'kg' },
  // Préparations Maison
  { id: 25, name: 'Merguez maison',      category: 'Préparations Maison', emoji: '🍢', imageUrl: '/merguez-sur-un-fond-blanc-plusieurs-cru-d-isolement-140511276.webp', price: 13.99, unit: 'kg' },
  { id: 26, name: 'Poulet mariné',       category: 'Préparations Maison', emoji: '🍢', imageUrl: "/Capture d'écran 2026-06-21 210949.png", price: 14.99, unit: 'kg' },
  // Épicerie
  { id: 27, name: 'Hamoud Blanche 1L',   category: 'Épicerie', emoji: '🫒', imageUrl: "/Capture d'écran 2026-06-25 195201.png", price: 2.50, unit: 'pièce' },
  { id: 28, name: 'Slim Orange 1L',      category: 'Épicerie', emoji: '🫒', imageUrl: "/Capture d'écran 2026-06-25 195339.png", price: 2.50, unit: 'pièce' },
  { id: 29, name: 'Selecto 1L',          category: 'Épicerie', emoji: '🫒', imageUrl: "/Capture d'écran 2026-06-25 195455.png", price: 2.50, unit: 'pièce' },
  { id: 30, name: 'Slim Citron 1L',      category: 'Épicerie', emoji: '🫒', imageUrl: "/Capture d'écran 2026-06-25 195605.png", price: 2.50, unit: 'pièce' },
  { id: 31, name: 'Slim Ananas 1L',      category: 'Épicerie', emoji: '🫒', imageUrl: "/Capture d'écran 2026-06-25 195655.png", price: 2.50, unit: 'pièce' },
  { id: 32, name: 'Bouillon Jumbo Halal', category: 'Épicerie', emoji: '🫒', imageUrl: "/Capture d'écran 2026-06-25 200154.png", price: 100, unit: 'pièce' },
  { id: 33, name: 'Miel Assila El Mordjene 1kg', category: 'Épicerie', emoji: '🫒', imageUrl: "/Capture d'écran 2026-06-25 200325.png", price: 100, unit: 'pièce' },
  { id: 35, name: 'Medina Smen 500g', category: 'Épicerie', emoji: '🫒', imageUrl: "/Capture d'écran 2026-06-25 200715.png", price: 100, unit: 'pièce' },
  { id: 36, name: 'Margarine La Belle 500g', category: 'Épicerie', emoji: '🫒', imageUrl: "/Capture d'écran 2026-06-25 200826.png", price: 100, unit: 'pièce' },
  { id: 37, name: 'Couscous Dari Fin 1kg', category: 'Épicerie', emoji: '🫒', imageUrl: "/Capture d'écran 2026-06-25 201001.png", price: 100, unit: 'pièce' },
  { id: 38, name: 'Harissa', category: 'Épicerie', emoji: '🫒', imageUrl: "/Capture d'écran 2026-06-25 201222.png", price: 100, unit: 'pièce' },
];

const CATEGORIES: StaticCategory[] = [
  { id: 'Bœuf',                name: 'Bœuf',                emoji: '🐄' },
  { id: 'Agneau',              name: 'Agneau',              emoji: '🐑' },
  { id: 'Volaille',            name: 'Volaille',            emoji: '🐔' },
  { id: 'Préparations Maison', name: 'Préparations Maison', emoji: '🍢' },
  { id: 'Épicerie',            name: 'Épicerie',            emoji: '🫒' },
];

@Component({
  selector: 'app-catalogue',
  imports: [NavbarComponent, FooterComponent, FormsModule, DecimalPipe],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent implements OnInit {
  categories = CATEGORIES;
  filtered: StaticProduct[] = [];
  paginated: StaticProduct[] = [];
  selectedCategory: string | null = null;
  searchKeyword = '';
  currentPage = 1;
  readonly perPage = 12;

  get totalPages(): number {
    return Math.ceil(this.filtered.length / this.perPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ngOnInit() {
    this.filtered = ALL_PRODUCTS.filter(p => p.imageUrl);
    this.paginate();
  }

  onCategoryChange(id: string | null) {
    this.selectedCategory = id;
    this.searchKeyword = '';
    this.currentPage = 1;
    this.applyFilter();
  }

  onSearch() {
    this.selectedCategory = null;
    this.currentPage = 1;
    this.applyFilter();
  }

  applyFilter() {
    let list = ALL_PRODUCTS.filter(p => p.imageUrl);
    if (this.selectedCategory) list = list.filter(p => p.category === this.selectedCategory);
    if (this.searchKeyword.trim()) {
      const kw = this.searchKeyword.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(kw));
    }
    this.filtered = list;
    this.paginate();
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginate();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  paginate() {
    const start = (this.currentPage - 1) * this.perPage;
    this.paginated = this.filtered.slice(start, start + this.perPage);
  }
}
