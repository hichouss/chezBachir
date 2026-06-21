import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private url = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getAll() { return this.http.get<Category[]>(`${this.url}/all`); }
  getActive() { return this.http.get<Category[]>(this.url); }
  getById(id: number) { return this.http.get<Category>(`${this.url}/${id}`); }
  create(c: Partial<Category>) { return this.http.post<Category>(this.url, c); }
  update(id: number, c: Partial<Category>) { return this.http.put<Category>(`${this.url}/${id}`, c); }
  delete(id: number) { return this.http.delete(`${this.url}/${id}`); }
}
