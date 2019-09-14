import { Component, OnInit } from '@angular/core';
import { UnregisteredCarsService } from '../../services/unregistered-cars.service'

@Component({
  selector: 'app-unregistered-cars',
  templateUrl: './unregistered-cars.component.html',
  styleUrls: ['./unregistered-cars.component.scss']
})
export class UnregisteredCarsComponent implements OnInit {
  cars = [];
  public loading: number = 0;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  constructor(private rCarsService: UnregisteredCarsService) { }
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
