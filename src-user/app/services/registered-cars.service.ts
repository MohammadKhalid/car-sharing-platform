
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Car } from './car';
@Injectable()
export class RegisteredCarsService {

  constructor(private http: HttpClient) { }
  public list(): Observable<Car[]> {
    return this.http.get<Car[]>('/api/car/local');
  }
  public addCar(car: Car){
    const req = this.http.post('/api/car/', car)
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured");
      });
  }
  public like(id){
    const req = this.http.post('/api/car/favourite/'+id, {})
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured");
      });
  }
}
