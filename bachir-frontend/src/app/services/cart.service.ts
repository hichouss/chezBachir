import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Product } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CartService {
  items = signal<CartItem[]>([]);

  totalItems = computed(() => this.items().reduce((sum, i) => sum + i.quantity, 0));
  totalAmount = computed(() => this.items().reduce((sum, i) => sum + i.product.price * i.quantity, 0));

  add(product: Product, quantity = 1) {
    this.items.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i => i.product.id === product.id
          ? { ...i, quantity: i.quantity + quantity }
          : i);
      }
      return [...items, { product, quantity }];
    });
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }
    this.items.update(items =>
      items.map(i => i.product.id === productId ? { ...i, quantity } : i)
    );
  }

  remove(productId: number) {
    this.items.update(items => items.filter(i => i.product.id !== productId));
  }

  clear() {
    this.items.set([]);
  }
}
