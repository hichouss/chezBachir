import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, DatePipe } from '@angular/common';
import { Order } from '../../models/models';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  imports: [FormsModule, DecimalPipe, DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private orderService = inject(OrderService);

  orders: Order[] = [];
  statusFilter = '';
  selectedOrder: Order | null = null;

  statuses = [
    { value: '', label: 'Toutes' },
    { value: 'PENDING', label: 'En attente' },
    { value: 'PREPARING', label: 'En préparation' },
    { value: 'READY', label: 'Prête' },
    { value: 'COMPLETED', label: 'Terminée' },
    { value: 'CANCELLED', label: 'Annulée' }
  ];

  nextStatuses: Record<string, string[]> = {
    PENDING: ['PREPARING', 'CANCELLED'],
    PREPARING: ['READY', 'CANCELLED'],
    READY: ['COMPLETED'],
    COMPLETED: [],
    CANCELLED: []
  };

  ngOnInit() { this.load(); }

  load() {
    this.orderService.getAll(this.statusFilter || undefined).subscribe(o => this.orders = o);
  }

  changeStatus(order: Order, status: string) {
    this.orderService.updateStatus(order.id, status).subscribe(updated => {
      const idx = this.orders.findIndex(o => o.id === order.id);
      if (idx !== -1) this.orders[idx] = updated;
      if (this.selectedOrder?.id === order.id) this.selectedOrder = updated;
    });
  }

  statusLabel(s: string): string {
    const map: Record<string, string> = {
      PENDING: 'En attente', PREPARING: 'En préparation',
      READY: 'Prête', COMPLETED: 'Terminée', CANCELLED: 'Annulée'
    };
    return map[s] || s;
  }

  statusClass(s: string): string {
    return s.toLowerCase();
  }
}
