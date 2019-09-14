import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(private http: HttpClient, private titleService: TitleService) { }
  public userInfo = new UserInfo();
  ngOnInit() {
    this.http.get<UserInfo>('/api/user/myinfo').subscribe(
      res => {
        this.userInfo.name = res.name;
        this.userInfo.address = res.address;
        this.userInfo.email = res.email;
      },
      err => {
        console.log(err);
      }
    )
    this.titleService.change("Settings")
  }

  submit(form) {
    console.log(form);
    
    this.http.put('/api/user/myinfo', form.value).subscribe(
      res => {
        alert("Saved Successfully");
      },
      err => {
        console.log(err);
      }
    )
    
  }

}


export class UserInfo {
  constructor(
    public name: string = "",
    public address: string = "",
    public email: string = "",
    public password?: string,
  ) { }
}