import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MyCarsService } from '../../services/my-cars.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {
  cities: Array<string> = ['Islamabad', 'Karachi', 'Lahore', 'Rawalpindi'];
  filteredCities = this.cities;
  regFilteredCities = this.cities;
  submitting: boolean;
  areas = {
    'Karachi': ['Korangi', 'Defence', 'FB Area', 'Nazimabad'],
    'Islamabad': ['F7', 'F6', 'F8', 'F9', 'F10', 'F11', 'G7', 'G6', 'G8', 'G9', 'G10', 'G11', 'I7', 'I6', 'I8', 'I9', 'I10', 'I11']
  };
  colors = ['WHITE', 'SILVER', 'BLACK', 'GREY', 'BLUE', 'GREEN', 'RED', 'GOLD', 'MAROON', 'BEIGE', 'PINK',
    'BROWN', 'BURGUNDY', 'YELLOW', 'BRONZE', 'PURPLE', 'TURQOUISE', 'ORANGE', 'INDIGO', 'MAGNETA', 'UNLISTED'];
  filteredAreas = [];
  modelNos = [];
  files = [];
  constructor(private mycarsService: MyCarsService,
    private titleService: TitleService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.generateYears();
    this.titleService.change('Add Details');
    this.submitting = false;
  }

  filter(val: string, array): string[] {
    const filterValue = val.toLowerCase();
    return array.filter(option => option.toLowerCase().includes(filterValue));
  }
  citySelected(city: string): boolean {
    return this.cities.indexOf(city) >= 0;
  }
  showArea(city) {
    this.filteredAreas = this.areas[city];
  }
  generateYears() {
    let maxYear: number = (new Date()).getFullYear();
    const minYear: number = maxYear - 50;
    for (maxYear; maxYear > minYear; maxYear--) {
      this.modelNos.push(maxYear);
    }
  }
  displayImages(event) {
    if (event.target.files) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const img = new Image;
          img.src = event.target.result;
          img.onload = () => {
            const imgHeight = img.height;
            const imgWidth = img.width;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (img.height > 1000) {
              canvas.height = 1000;
              canvas.width = imgWidth / (imgHeight / 1000);
            } else {
              canvas.height = img.height;
              canvas.width = img.width;
            }
            // step 3, resize to final size
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const dataImage = canvas.toDataURL();

            this.files.push(dataImage);
          };
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }
  submit(form: NgForm) {
    // adding images for form
    const data = form.value;
    data.images = this.files;
    this.submitting = true;
    this.mycarsService.addCar(data).subscribe(
      res => {
        console.log(res);
        form.resetForm();
        this.files = [];
        this.snackBar.open('Successfully added', 'Dismiss', {
          duration: 2000
        });
        this.submitting = false;
      },
      err => {
        this.submitting = false;
        console.log(err);
      });
  }
  scrollTo(el) {
    el.scrollIntoView({ behavior: 'instant', block: 'start', inline: 'nearest' });
    // window.scrollBy(0, 10);
  }
}
