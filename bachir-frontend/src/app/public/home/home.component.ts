import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface FeaturedProduct {
  id: number;
  name: string;
  unit: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, FooterComponent, RouterLink, DecimalPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private interval: any;
  promos = [
    { name: 'Flanchet de bœuf',  price: '14,99', offer: '3 kg = 41,99 €',      saving: 'Économisez 3 €',       imageUrl: '/Flank Steak_Trimmed.jpg' },
    { name: 'Ailes de poulet',    price: '6,99',  offer: 'Carton 3 kg = 15 €',  saving: 'Soit 5 €/kg',          imageUrl: '/45232932-raw-chicken-wings-isolated-on-white-background.jpg' },
    { name: 'Blanc de poulet',    price: '12,99', offer: 'Barquette 2,5 kg = 23,99 €', saving: 'Soit 9,60 €/kg', imageUrl: '/9812117-blanc-de-poulet-cru-gratuit-photo.jpg' },
    { name: 'Cuisses de poulet',  price: '5,99',  offer: 'Carton 10 kg = 25,99 €', saving: 'Soit 2,60 €/kg',    imageUrl: '/cuisses-de-poulet-cru-avec-peau-sur-fond-blanc-220856755.webp' },
    { name: 'Plat de côte',      price: '15,99', offer: '3 kg = 44,99 €',      saving: 'Économisez 3 €',       imageUrl: '/plat-de-cote-de-boeuf.jpg' },
  ];

  allProducts: FeaturedProduct[][] = [
    [
      { id: 1, name: 'Côte de bœuf',   unit: 'au kg',    price: 23.99, imageUrl: "/Capture d'écran 2026-06-21 212441.png" },
      { id: 2, name: "Gigot d'agneau", unit: 'au kg',    price: 23.99, imageUrl: '/gigot-d-agneau-entier-origine-france.jpg' },
      { id: 3, name: 'Poulet entier',  unit: 'la pièce', price: 8.99,  imageUrl: '/poulet-cru-frais-entier-isole-fond-blanc_625448-304.avif' },
      { id: 4, name: 'Merguez maison', unit: 'au kg',    price: 13.99, imageUrl: '/merguez-sur-un-fond-blanc-plusieurs-cru-d-isolement-140511276.webp' },
    ],
    [
      { id: 5, name: 'Entrecôte',      unit: 'au kg',    price: 23.99, imageUrl: '/360_F_47091524_h8U9mviFhLg1qe9zBjFbvcMyHiEygf8E.jpg' },
      { id: 6, name: "Souris d'agneau", unit: 'au kg',   price: 25.99, imageUrl: '/47702-0w470h470_Souris_Agneau_France.jpg' },
      { id: 7, name: 'Cuisses de poulet', unit: 'au kg', price: 5.99,  imageUrl: '/cuisses-de-poulet-cru-avec-peau-sur-fond-blanc-220856755.webp' },
      { id: 8, name: 'Bavette',        unit: 'au kg',    price: 20.99, imageUrl: '/bavette-viande-de-boeuf-cru-steak-ou-faux-filet-d-aloyau-sur-planche-marbre-isolé-fond-blanc-272372257.webp' },
    ],
    [
      { id: 9,  name: 'Faux-filet',    unit: 'au kg',    price: 23.99, imageUrl: '/raw-striploin-strip-loin-steak-new-york-meat-beef-isolated-white-background-top-view_89816-53203.avif' },
      { id: 10, name: "Épaule d'agneau", unit: 'au kg',  price: 22.99, imageUrl: '/fr_pim_219666001001_011.png' },
      { id: 11, name: 'Ailes de poulet', unit: 'au kg',  price: 6.99,  imageUrl: '/45232932-raw-chicken-wings-isolated-on-white-background.jpg' },
      { id: 12, name: 'Rumsteck',      unit: 'au kg',    price: 20.99, imageUrl: '/Rumsteak.jpg' },
    ],
    [
      { id: 13, name: 'Hamoud Blanche 1L', unit: 'la pièce', price: 2.50, imageUrl: "/Capture d'écran 2026-06-25 195201.png" },
      { id: 14, name: 'Selecto 1L',     unit: 'la pièce', price: 2.50, imageUrl: "/Capture d'écran 2026-06-25 195455.png" },
      { id: 15, name: 'Slim Orange 1L',  unit: 'la pièce', price: 2.50, imageUrl: "/Capture d'écran 2026-06-25 195339.png" },
      { id: 16, name: 'Slim Citron 1L',  unit: 'la pièce', price: 2.50, imageUrl: "/Capture d'écran 2026-06-25 195605.png" },
    ],
    [
      { id: 17, name: 'Harissa',           unit: 'la pièce', price: 3.50,  imageUrl: "/Capture d'écran 2026-06-25 201222.png" },
      { id: 18, name: 'Couscous Dari 1kg', unit: 'la pièce', price: 3.50,  imageUrl: "/Capture d'écran 2026-06-25 201001.png" },
      { id: 19, name: 'Medina Smen 500g',  unit: 'la pièce', price: 3.50,  imageUrl: "/Capture d'écran 2026-06-25 200715.png" },
      { id: 20, name: 'Margarine La Belle 500g', unit: 'la pièce', price: 3.50, imageUrl: "/Capture d'écran 2026-06-25 200826.png" },
    ],
  ];

  currentPage = 0;
  get featuredProducts() { return this.allProducts[this.currentPage]; }
  get pages() { return this.allProducts; }

  constructor(private zone: NgZone) {}

  goToPage(i: number) { this.currentPage = i; }

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      this.interval = setInterval(() => {
        this.zone.run(() => {
          this.currentPage = (this.currentPage + 1) % this.allProducts.length;
        });
      }, 3000);
    });
  }

  ngOnDestroy() { clearInterval(this.interval); }
}
