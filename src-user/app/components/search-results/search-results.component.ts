import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { filters } from '../../services/filters'
import { Car } from '../../services/car';
import { TitleService } from '../../services/title.service';

@Component({
	selector: 'app-search-results',
	templateUrl: './search-results.component.html',
	styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
	cars = [];
	public loading: number = 0;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private http: HttpClient,
		private titleService: TitleService) { }

	ngOnInit() {
		this.loading++;
		this.route
			.queryParams
			.subscribe(params => {
				params = this.objectToHttpParams(params);
				const req = this.http.get<Car[]>('/api/car/search', { params })
					.subscribe(
						res => {
							this.cars = res;
							this.loading--;
						},
						err => {
							this.loading--;
							console.log("Error occured");
						});
			});
		this.titleService.change("Search Results")
	}
	private objectToHttpParams(obj: any) {
		return Object.entries(obj || {})
			.reduce((params, [key, value]) => {
				return params.set(key, String(value));
			}, new HttpParams());
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
