import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private url = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAll() { return this.http.get<Product[]>(`${this.url}/all`); }
  getAvailable() { return this.http.get<Product[]>(this.url); }
  getByCategory(id: number) { return this.http.get<Product[]>(`${this.url}/category/${id}`); }
  getPromotions() { return this.http.get<Product[]>(`${this.url}/promotions`); }
  search(keyword: string) { return this.http.get<Product[]>(`${this.url}/search?keyword=${keyword}`); }
  getById(id: number) { return this.http.get<Product>(` ${this.url}/${id}`); }
  create(p: Partial<Product>) { return this.http.post<Product>(this.url, p); }
  update(id: number, p: Partial<Product>) { return this.http.put<Product>(`${this.url}/${id}`, p); }
  delete(id: number) { return this.http.delete(`${this.url}/${id}`); }
}
