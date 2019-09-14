import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Cars } from './cars'
import { Router } from '@angular/router';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	@ViewChild('search') searchElement: ElementRef;
	constructor(private router: Router) { }
	popularCars: Array<object> = [
		{
			name: "Toyota Corolla",
			value: "Corolla"
		},
		{
			name: "Honda Civic",
			value: "Civic"
		},
		{
			name: "Honda City",
			value: "City"
		},
		{
			name: "Toyota Vitz",
			value: "Vitz"
		},
		{
			name: "Toyota Land Cruiser",
			value: "Land Cruiser"
		},
		{
			name: "Suzuki Cultus",
			value: "Cultus"
		},
		{
			name: "Suzuki Mehran",
			value: "Mehran"
		},
		{
			name: "Suzuki Alto",
			value: "Alto"
		},
		{
			name: "Daihatsu Mira",
			value: "Mira"
		},
		{
			name: "Toyota Prado",
			value: "Prado"
		}];
	advanceSearch: boolean = false;
	models = [];
	filteredModels = [];
	cities: Array<string> = ['Islamabad', 'Karachi', 'Lahore', 'Rawalpindi'];
	filteredCities = this.cities;
	areas = {
		"Karachi": ["Korangi", "Defence", "FB Area", "Nazimabad"],
		"Islamabad": ["F7", "F6", "F8", "F9", "F10", "F11", "G7", "G6", "G8", "G9", "G10", "G11", "I7", "I6", "I8", "I9", "I10", "I11"]
	};
	filteredAreas = [];
	citySelected = false;
	prices = [];
	modelNos = [];
	showingMore = false;
	cityText = "";
	ngOnInit() {
		this.searchElement.nativeElement.focus();
		this.models = new Cars().getData();
		this.filteredModels = new Cars().getData();
		this.generateYears();
		this.generatePrice();
	}
	scrollTo(el) {
		el.scrollIntoView();
	}
	filter(val: string, array): string[] {
		var filtered = [];
		for (var i = 0; i < this.models.length; i++) {
			var item = this.models[i].value.filter(option =>
				option.toLowerCase().indexOf(val.toLowerCase()) === 0);
			if (item.length > 0) {
				filtered.push({ name: this.models[i].name, value: item });
			}
		}
		return filtered;
	}
	showArea(city) {
		this.filteredAreas = this.areas[city];
		this.citySelected = true;
	}
	generateYears() {
		var maxYear: number = (new Date()).getFullYear();
		var minYear: number = maxYear - 50;
		for (maxYear; maxYear > minYear; maxYear--) {
			this.modelNos.push(maxYear);
		}
	}
	generatePrice() {
		var maxPrice: number = 20000000;
		var minPrice: number = 200000;
		for (minPrice; minPrice < maxPrice; minPrice += 200000) {
			this.prices.push(minPrice);
		}
	}
	submit(form) {
		var data = this.verifyParams(form.value);
		this.router.navigate(['/dashboard/search-results'], { queryParams: data });
	}

	verifyParams(data) {
		var cleandata: filters = {};
		if (typeof (data.area) != "undefined" && data.area != "") {
			cleandata.area = data.area;
		}
		if (typeof (data.city) != "undefined" && data.city != "") {
			cleandata.city = data.city;
		}
		if (typeof (data.maxMileage) != "undefined" && data.maxMileage != "") {
			cleandata.maxMileage = data.maxMileage;
		}
		if (typeof (data.maxModelNo) != "undefined" && data.maxModelNo != "") {
			cleandata.maxModelNo = data.maxModelNo;
		}
		if (typeof (data.maxPrice) != "undefined" && data.maxPrice != "") {
			cleandata.maxPrice = data.maxPrice;
		}
		if (typeof (data.minMileage) != "undefined" && data.minMileage != "") {
			cleandata.minMileage = data.minMileage;
		}
		if (typeof (data.minModelNo) != "undefined" && data.minModelNo != "") {
			cleandata.minModelNo = data.minModelNo;
		}
		if (typeof (data.minPrice) != "undefined" && data.minPrice != "") {
			cleandata.minPrice = data.minPrice;
		}
		if (typeof (data.model) != "undefined" && data.model != "") {
			cleandata.model = data.model;
		}
		if (typeof (data.search) != "undefined" && data.search != "") {
			cleandata.search = data.search;
		}
		if (typeof (data.transmission) != "undefined" && data.transmission != "") {
			cleandata.transmission = data.transmission;
		}
		return cleandata;
	}

}

interface filters {
	area?: string;
	city?: string;
	maxMileage?: number;
	maxModelNo?: number;
	maxPrice?: number;
	minMileage?: number;
	minModelNo?: number;
	minPrice?: number;
	model?: string;
	search?: string;
	transmission?: string;
}