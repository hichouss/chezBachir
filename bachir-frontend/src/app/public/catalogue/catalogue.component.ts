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
  { id: 1,  name: 'Côte de bœuf',       category: 'Bœuf', emoji: '🐄', imageUrl: "/Capture d'écran 2026-06-21 212441.png",     price: 189, unit: 'kg' },
  { id: 2,  name: 'Entrecôte',           category: 'Bœuf', emoji: '🐄', imageUrl: '/360_F_47091524_h8U9mviFhLg1qe9zBjFbvcMyHiEygf8E.jpg',   price: 179, unit: 'kg' },
  { id: 3,  name: 'Faux-filet',          category: 'Bœuf', emoji: '🐄', imageUrl: '/raw-striploin-strip-loin-steak-new-york-meat-beef-isolated-white-background-top-view_89816-53203.avif',  price: 159, unit: 'kg' },
  { id: 4,  name: 'Rumsteck',            category: 'Bœuf', emoji: '🐄', imageUrl: '/Rumsteak.jpg',    price: 149, unit: 'kg' },
  { id: 5,  name: 'Bavette',             category: 'Bœuf', emoji: '🐄', imageUrl: '/bavette-viande-de-boeuf-cru-steak-ou-faux-filet-d-aloyau-sur-planche-marbre-isolé-fond-blanc-272372257.webp', price: 129, unit: 'kg' },
  { id: 6,  name: 'Onglet',              category: 'Bœuf', emoji: '🐄', price: 139, unit: 'kg' },
  { id: 7,  name: 'Steak haché',         category: 'Bœuf', emoji: '🐄', price: 109, unit: 'kg' },
  { id: 8,  name: 'Viande hachée',       category: 'Bœuf', emoji: '🐄', imageUrl: '/boeuf-hache-quoi-choisir.jpeg', price: 89,  unit: 'kg' },
  { id: 9,  name: 'Bourguignon',         category: 'Bœuf', emoji: '🐄', price: 99,  unit: 'kg' },
  { id: 10, name: 'Pot-au-feu',          category: 'Bœuf', emoji: '🐄', imageUrl: "/Capture d'écran 2026-06-21 211833.png", price: 89,  unit: 'kg' },
  { id: 11, name: 'Collier de bœuf',     category: 'Bœuf', emoji: '🐄', imageUrl: '/Chuck Neck Roast.jpg', price: 79,  unit: 'kg' },
  { id: 12, name: 'Jarret de bœuf',      category: 'Bœuf', emoji: '🐄', imageUrl: "/Capture d'écran 2026-06-21 213511.png", price: 79,  unit: 'kg' },
  { id: 13, name: 'Plat de côte',        category: 'Bœuf', emoji: '🐄', imageUrl: '/plat-de-cote-de-boeuf.jpg', price: 75,  unit: 'kg' },
  { id: 14, name: 'Flanchet',            category: 'Bœuf', emoji: '🐄', imageUrl: '/Flank Steak_Trimmed.jpg', price: 75,  unit: 'kg' },
  { id: 15, name: 'Queue de bœuf',       category: 'Bœuf', emoji: '🐄', price: 69,  unit: 'kg' },
  { id: 16, name: 'Foie de bœuf',        category: 'Bœuf', emoji: '🐄', imageUrl: '/depositphotos_13332391-stock-photo-liver.jpg', price: 59,  unit: 'kg' },
  // Agneau
  { id: 17, name: "Côtelettes d'agneau", category: 'Agneau', emoji: '🐑', imageUrl: '/zoom_114.jpg', price: 159, unit: 'kg' },
  { id: 18, name: "Gigot d'agneau",      category: 'Agneau', emoji: '🐑', imageUrl: '/gigot-d-agneau-entier-origine-france.jpg', price: 149, unit: 'kg' },
  { id: 19, name: "Épaule d'agneau",     category: 'Agneau', emoji: '🐑', imageUrl: '/fr_pim_219666001001_011.png', price: 129, unit: 'kg' },
  { id: 20, name: "Collier d'agneau",    category: 'Agneau', emoji: '🐑', imageUrl: '/47699-0w600h600_Collier_Agneau_France.jpg', price: 99,  unit: 'kg' },
  { id: 21, name: "Souris d'agneau",     category: 'Agneau', emoji: '🐑', imageUrl: '/47702-0w470h470_Souris_Agneau_France.jpg', price: 139, unit: 'kg' },
  { id: 22, name: "Poitrine d'agneau",   category: 'Agneau', emoji: '🐑', imageUrl: '/poitrine-d-agneau-en-tranche-prete-a-cuire.jpg', price: 89,  unit: 'kg' },
  { id: 23, name: "Foie d'agneau",       category: 'Agneau', emoji: '🐑', imageUrl: '/medium_Adobe_Stock_847816635_4979a3dc3e.webp', price: 49,  unit: 'kg' },
  // Volaille
  { id: 24, name: 'Escalope de poulet',  category: 'Volaille', emoji: '🐔', imageUrl: '/9812117-blanc-de-poulet-cru-gratuit-photo.jpg', price: 79,  unit: 'kg' },
  { id: 25, name: 'Filet de poulet',     category: 'Volaille', emoji: '🐔', imageUrl: '/1946037-viande-de-poulet-crue-sur-fond-blanc-gratuit-photo.jpg', price: 89,  unit: 'kg' },
  { id: 26, name: 'Cuisses de poulet',   category: 'Volaille', emoji: '🐔', imageUrl: '/cuisses-de-poulet-cru-avec-peau-sur-fond-blanc-220856755.webp', price: 59,  unit: 'kg' },
  { id: 27, name: 'Hauts de cuisse',     category: 'Volaille', emoji: '🐔', imageUrl: '/istockphoto-1401936268-612x612.jpg', price: 55,  unit: 'kg' },
  { id: 28, name: 'Ailes de poulet',     category: 'Volaille', emoji: '🐔', imageUrl: '/45232932-raw-chicken-wings-isolated-on-white-background.jpg', price: 45,  unit: 'kg' },
  { id: 29, name: 'Pilons de poulet',    category: 'Volaille', emoji: '🐔', imageUrl: '/75089340-trois-pilons-de-poulet-cru-isolé-sur-fond-blanc.jpg', price: 45,  unit: 'kg' },
  { id: 30, name: 'Poulet entier',       category: 'Volaille', emoji: '🐔', imageUrl: '/poulet-cru-frais-entier-isole-fond-blanc_625448-304.avif', price: 49,  unit: 'pièce' },
  { id: 31, name: 'Cuisse de dinde',     category: 'Volaille', emoji: '🐔', imageUrl: '/istockphoto-1289367014-612x612.jpg', price: 69,  unit: 'kg' },
  { id: 32, name: 'Escalope de dinde',   category: 'Volaille', emoji: '🐔', imageUrl: '/35758-escalope-de-dinde.jpg', price: 79,  unit: 'kg' },
  // Charcuterie Halal
  { id: 33, name: 'Merguez maison',        category: 'Charcuterie Halal', emoji: '🌭', imageUrl: '/merguez-sur-un-fond-blanc-plusieurs-cru-d-isolement-140511276.webp', price: 99,  unit: 'kg' },
  { id: 34, name: 'Saucisses de volaille', category: 'Charcuterie Halal', emoji: '🌭', price: 89,  unit: 'kg' },
  { id: 35, name: 'Saucisses épicées',     category: 'Charcuterie Halal', emoji: '🌭', price: 95,  unit: 'kg' },
  { id: 36, name: 'Kefta préparée',        category: 'Charcuterie Halal', emoji: '🌭', price: 109, unit: 'kg' },
  // Préparations Maison
  { id: 37, name: 'Brochettes de bœuf',   category: 'Préparations Maison', emoji: '🍢', price: 149, unit: 'kg' },
  { id: 38, name: 'Brochettes de poulet', category: 'Préparations Maison', emoji: '🍢', price: 99,  unit: 'kg' },
  { id: 39, name: 'Kefta',                category: 'Préparations Maison', emoji: '🍢', price: 109, unit: 'kg' },
  { id: 40, name: 'Viande marinée',        category: 'Préparations Maison', emoji: '🍢', price: 129, unit: 'kg' },
  { id: 41, name: 'Escalopes marinées',    category: 'Préparations Maison', emoji: '🍢', price: 119, unit: 'kg' },
  { id: 42, name: 'Poulet mariné',         category: 'Préparations Maison', emoji: '🍢', imageUrl: "/Capture d'écran 2026-06-21 210949.png", price: 89,  unit: 'kg' },
];

const CATEGORIES: StaticCategory[] = [
  { id: 'Bœuf',                name: 'Bœuf',                emoji: '🐄' },
  { id: 'Agneau',              name: 'Agneau',              emoji: '🐑' },
  { id: 'Volaille',            name: 'Volaille',            emoji: '🐔' },
  { id: 'Charcuterie Halal',   name: 'Charcuterie Halal',   emoji: '🌭' },
  { id: 'Préparations Maison', name: 'Préparations Maison', emoji: '🍢' },
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
