import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "./user";
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  public list(): Observable<User[]> {
    return this.http.get<User[]>('/api/user');
  }
  public activate(user){
    const req = this.http.put('/api/user/activate/'+user._id,{})
    .subscribe(
      res => {
        console.log(res);
        user.approved = true;
      },
      err => {
        console.log("Error occured");
      });
  }

  public loginAsUser(user){
    const req = this.http.post('/api/auth/switch-to-user',user)
    .subscribe(
      res => {
        location.href = "/user";
      },
      err => {
        console.log("Error occured");
      });
  }

  public deactivate(user){
    const req = this.http.put('/api/user/deactivate/'+user._id,{})
    .subscribe(
      res => {
        console.log(res);
        user.approved = false;
      },
      err => {
        console.log("Error occured");
      });
  }
}
