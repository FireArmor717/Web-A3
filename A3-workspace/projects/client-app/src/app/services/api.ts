import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/events`);
  }

  getEvent(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/events/${id}`);
  }

  searchEvents(params: any): Observable<any[]> {
    // params is an object like { date: '2025-11-01', location: 'Beijing' }
    return this.http.get<any[]>(`${this.base}/events/search`, { params });
  }

  registerEvent(payload: any) {
    return this.http.post(`${this.base}/registrations`, payload);
  }
}
