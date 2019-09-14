import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Invoice } from './invoice';

@Injectable()
export class PaymentsService {

  constructor(private http: HttpClient) { }
  public list(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>('/api/invoice/mine');
  }
  postFile(data): Observable<Invoice> {
    const endpoint = '/api/invoice/bill-screenshot';
    return this.http
      .post<Invoice>(endpoint, data);
  }
}
