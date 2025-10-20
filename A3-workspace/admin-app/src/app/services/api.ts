import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const ADMIN_API = 'https://localhost:3000/api/admin/events';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<any[]> {
    return this.http.get<any[]>(ADMIN_API);
  }

  getEventById(id: number): Observable<any> {
    return this.http.get<any>(`${ADMIN_API}/${id}`);
  }

  addEvent(payload: any): Observable<any> {
    return this.http.post(ADMIN_API, payload);
  }

  updateEvent(id: number, payload: any): Observable<any> {
    return this.http.put(`${ADMIN_API}/${id}`, payload);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${ADMIN_API}/${id}`);
  }
}
