import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TitleService } from '../../services/title.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.change(this.titles[this.selectedIndex]);
  }
  selectedIndex: number = 0;
  totalTabs: number = 3;
  titles: Array<string> = ["My Cars", "Registered Cars", "Imported Cars"];
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  swipe(eType) {
    if (eType === 'swipeleft') {
      this.selectedIndex = (this.selectedIndex + 1) % this.totalTabs;
    }
    else if (eType === 'swiperight') {
      this.selectedIndex -= 1;
      if (this.selectedIndex < 0) {
        this.selectedIndex = this.totalTabs - this.selectedIndex;
      }
    }
    this.titleService.change(this.titles[this.selectedIndex]);

  }

}
