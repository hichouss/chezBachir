import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, OrderRequest } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private url = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getAll(status?: string) {
    const params = status ? `?status=${status}` : '';
    return this.http.get<Order[]>(`${this.url}${params}`);
  }
  getById(id: number) { return this.http.get<Order>(`${this.url}/${id}`); }
  create(req: OrderRequest) { return this.http.post<Order>(this.url, req); }
  updateStatus(id: number, status: string) {
    return this.http.patch<Order>(`${this.url}/${id}/status`, { status });
  }
  delete(id: number) { return this.http.delete(`${this.url}/${id}`); }
}
