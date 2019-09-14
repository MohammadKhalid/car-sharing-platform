import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { Car } from '../../services/car';
import { AuthService } from '../../services/auth.service';
import { TitleService } from '../../services/title.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private id: string;
  public car: Car = new Car();
  public features: Features;
  public descLength = 100;
  public uid: string;
  public loading = 0;
  constructor(private route: ActivatedRoute,
    private profileService: ProfileService,
    private auth: AuthService,
    private titleService: TitleService,
    private sanitizer: DomSanitizer) {
    this.route.params.subscribe(params => this.setId(params.id));
    this.features = new Features();
  }
  images = ['../../../assets/car.jpg', '../../../assets/car.jpg', '../../../assets/car.jpg', '../../../assets/car.jpg'];
  ngOnInit() {
    this.loading++;
    this.auth.getId().subscribe(
      res => {
        this.loading--;
        this.uid = res.id;
      },
      err => {
        this.loading--;
        console.log(err);
      }
    );
    this.titleService.change('Car Details');
  }
  setId(id: string) {
    this.id = id;
    this.profileService.getCar(id);
    this.profileService.getCar(id).subscribe(
      res => {
        this.car = res;
        this.titleService.change(this.car.title);
        this.generateFeatureRows(res.features)
      },
      err => {
        console.log('Error occured');
      });
  }

  public getText(text: string) {
    if (text) {
      return text.slice(0, this.descLength);
    } else {
      return null;
    }
  }

  public showMore() {
    this.descLength = 250;
  }
  public showLess() {
    this.descLength = 100;
  }
  public call(phone) {
    window.open('tel:' + phone);
  }
  public sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  public generateFeatureRows(features: Array<string>) {
    const length = Math.ceil(features.length / 2);
    for (let i = 0; i < length; i++) {
      const feature = new Feature(features[i], icons[features[i]])
      this.features.LeftCol.push(feature);
      if (features[i + length]) {
        const feature2 = new Feature(features[i + length], icons[features[i + length]])
        this.features.RightCol.push(feature2);
      }
    }
    console.log(this.features);
  }
}


class Features {
  public LeftCol: Array<Feature>;
  public RightCol: Array<Feature>;
  constructor() {
    this.LeftCol = new Array<Feature>();
    this.RightCol = new Array<Feature>();
  }
}

class Feature {
  public name: string = "";
  public icon: string = "";
  constructor(name, icon){
    this.name = name;
    this.icon = icon;
  }
}

const icons = {
  "Air Bags": "https://lite1.pakwheels.com/app/1.5.0/assets/images/features/ico-feature-air-bag.svg",
  "Air Conditioning": "https://lite1.pakwheels.com/app/1.5.0/assets/images/features/ico-feature-air-conditioning.svg",
  "Cool Box": "assets/coolbox.png",
  "Power Windows": "https://lite1.pakwheels.com/app/1.5.0/assets/images/features/ico-feature-power-windows.svg",
  "Power Steering": "https://lite1.pakwheels.com/app/1.5.0/assets/images/features/ico-feature-power-steering.svg",
  "Power Locks": "https://lite1.pakwheels.com/app/1.5.0/assets/images/features/ico-feature-power-lock.svg",
  "Keyless Entry": "https://lite1.pakwheels.com/app/1.5.0/assets/images/features/ico-feature-keyless-entry.svg",
  "Power Mirrors": "https://lite1.pakwheels.com/app/1.5.0/assets/images/features/ico-feature-power-mirrors.svg",
  "Cruise Control": "https://lite1.pakwheels.com/app/1.5.0/assets/images/features/ico-feature-cruise-control.svg",
  "ABS": "https://lite1.pakwheels.com/app/1.5.0/assets/images/features/ico-feature-abs.svg",
  "Navigation System": "https://lite1.pakwheels.com/app/1.5.0/assets/images/features/ico-feature-navigation.svg",
  "FM/AM Radio": "https://lite1.pakwheels.com/app/1.5.0/assets/images/features/ico-feature-am-fm-radio.svg",
  "Cassette Player": "https://lite1.pakwheels.com/app/1.5.0/assets/images/features/ico-feature-cassette.svg",
  "Cd Player": "https://lite1.pakwheels.com/app/1.5.0/assets/images/features/ico-feature-cd-player.svg",
  "Sun Roof": "https://lite1.pakwheels.com/app/1.5.0/assets/images/features/ico-feature-sun-roof.svg",
  "Alloy Rims": "https://lite1.pakwheels.com/app/1.5.0/assets/images/features/ico-feature-alloy-rims.svg",
  "Immobilizer Key": "https://lite1.pakwheels.com/app/1.5.0/assets/images/features/ico-feature-immobiliser-key.svg",
  "Dvd Player": "https://lite1.pakwheels.com/app/1.5.0/assets/images/features/ic_dvd_player.png"
}