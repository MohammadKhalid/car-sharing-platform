import { Component, OnInit } from '@angular/core';
import { RegisteredCarsService } from '../../services/registered-cars.service';

@Component({
  selector: 'app-registered-cars',
  templateUrl: './registered-cars.component.html',
  styleUrls: ['./registered-cars.component.scss']
})
export class RegisteredCarsComponent implements OnInit {
  cars = [];
  public loading = 0;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  constructor(private rCarsService: RegisteredCarsService) { }
  ngOnInit() {
    this.loading++;
    this.rCarsService.list().subscribe(
      res => {
        this.loading--;
        this.cars = res;
      },
      err => {
        this.loading--;
        console.log("Error occured");
      });
  }
  swipe(eType) {
    console.log("registered", eType)
  }
  like(car, event){
    car.liked = !car.liked;
    event.stopPropagation();
    this.rCarsService.like(car._id);
  }
}
