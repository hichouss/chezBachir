import { Component } from '@angular/core';
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
export class HomeComponent {
  featuredProducts: FeaturedProduct[] = [
    { id: 1, name: 'Côte de bœuf',   unit: 'au kg',    price: 23.99, imageUrl: "/Capture d'écran 2026-06-21 212441.png" },
    { id: 2, name: "Gigot d'agneau", unit: 'au kg',    price: 23.99, imageUrl: '/gigot-d-agneau-entier-origine-france.jpg' },
    { id: 3, name: 'Poulet entier',  unit: 'la pièce', price: 8.99,  imageUrl: '/poulet-cru-frais-entier-isole-fond-blanc_625448-304.avif' },
    { id: 4, name: 'Merguez maison', unit: 'au kg',    price: 13.99, imageUrl: '/merguez-sur-un-fond-blanc-plusieurs-cru-d-isolement-140511276.webp' },
  ];
}
