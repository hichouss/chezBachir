import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardStats } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  getStats() {
    return this.http.get<DashboardStats>(`${environment.apiUrl}/admin/dashboard`);
  }
}
