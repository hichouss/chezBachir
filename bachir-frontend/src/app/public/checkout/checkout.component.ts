import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, RouterLink, DecimalPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  private orderService = inject(OrderService);
  private router = inject(Router);
  cart = inject(CartService);

  form = this.fb.group({
    customerName: ['', [Validators.required, Validators.minLength(2)]],
    customerPhone: ['', [Validators.required, Validators.pattern(/^[\d\s\+\-\.]{8,15}$/)]],
    customerEmail: ['', Validators.email],
    notes: ['']
  });

  loading = false;
  success = false;
  orderId: number | null = null;
  error = '';

  submit() {
    if (this.form.invalid || this.cart.items().length === 0) return;

    this.loading = true;
    this.error = '';

    const request = {
      ...this.form.value as any,
      items: this.cart.items().map(i => ({
        productId: i.product.id,
        quantity: i.quantity
      }))
    };

    this.orderService.create(request).subscribe({
      next: (order) => {
        this.orderId = order.id;
        this.success = true;
        this.cart.clear();
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Une erreur est survenue. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }
}
