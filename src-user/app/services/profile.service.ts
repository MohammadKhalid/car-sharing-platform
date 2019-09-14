import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Car } from './car';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) { }
  public getCar(id: string): Observable<Car> {
    return this.http.get<Car>('/api/car/' + id);
  }
}
