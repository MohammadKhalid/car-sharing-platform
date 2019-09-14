import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  public title = new Subject<string>();
  constructor() { }
  change(title: string){
    this.title.next(title);
  }
}
