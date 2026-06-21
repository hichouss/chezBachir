import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [NavbarComponent, FooterComponent, RouterLink, DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cart = inject(CartService);

  updateQty(productId: number, qty: number) {
    this.cart.updateQuantity(productId, qty);
  }

  remove(productId: number) {
    this.cart.remove(productId);
  }
}
