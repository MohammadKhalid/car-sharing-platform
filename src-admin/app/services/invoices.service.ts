import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from './invoice';
import { Observable } from 'rxjs';

@Injectable()
export class InvoicesService {

  constructor(private http: HttpClient) { }
  public list(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>('/api/invoice');
  }
  public generate(data) {
    const req = this.http.post('/api/invoice/generate', data)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        });
  }
  public confirm(data) {
    const req = this.http.put('/api/invoice/confirm/', { id: data._id })
      .subscribe(
        res => {
          data.hasPaid = true;
          console.log(res);
        },
        err => {
          console.log("Error occured");
        });
  }
  public invalidate(data) {
    const req = this.http.put('/api/invoice/invalidate/', { id: data._id })
      .subscribe(
        res => {
          data.hasPaid = false;
          console.log(res);
        },
        err => {
          console.log("Error occured");
        });
  }

}
