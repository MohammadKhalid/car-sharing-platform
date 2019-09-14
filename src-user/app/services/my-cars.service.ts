import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Car } from './car';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class MyCarsService {

  constructor(private http: HttpClient) { }
  public list(): Observable<Car[]> {
    return this.http.get<Car[]>('/api/car/mine');
  }
  public addCar(car: Car) {
    return this.http.post('/api/car/', car)
  }
  public like(id) {
    const req = this.http.post('/api/car/favourite/' + id, {})
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        });
  }
  public removeCar(id) {
    return this.http.delete('/api/car/' + id, {})
  }
}
