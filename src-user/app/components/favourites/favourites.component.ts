import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../../services/car';
import { TitleService } from '../../services/title.service';

@Component({
	selector: 'app-favourites',
	templateUrl: './favourites.component.html',
	styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
	cars = [];
	public loading: number = 0;
	constructor(
		private http: HttpClient,
		private titleService: TitleService) { }

	ngOnInit() {
		this.loading++;
		const req = this.http.get<Car[]>('/api/car/favourite')
			.subscribe(
				res => {
					this.loading--;
					this.cars = res;
				},
				err => {
					this.loading--;
					console.log("Error occured");
				});
		this.titleService.change("Favourite Cars")
	}
	public like(car, event) {
		car.liked = !car.liked;
		event.stopPropagation();
		const req = this.http.post('/api/car/favourite/' + car._id, {})
			.subscribe(
				res => {
					console.log(res);
				},
				err => {
					console.log("Error occured");
				});
	}

}
