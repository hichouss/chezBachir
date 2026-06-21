import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreInfo } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private url = `${environment.apiUrl}/store`;

  constructor(private http: HttpClient) {}

  get() { return this.http.get<StoreInfo>(this.url); }
  update(info: StoreInfo) { return this.http.put<StoreInfo>(this.url, info); }
}
