import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable, Observer, Subject } from "rxjs/Rx";

@Injectable()
export class AuthService implements OnInit {
	id:any = 0;
	constructor(private http: HttpClient) { }
	ngOnInit() {
	}
	isAuthenticated(): Observable<boolean> {
		var subject = new Subject<boolean>();
		this.http.post('/api/auth/isAuthenticated', {})
			.subscribe(
				res => {
					console.log(true);
					subject.next(true);
				},
				err => {
					subject.next(false);
				});
		return subject.asObservable();
	}

	getId() {
		return this.http.get<any>('/api/car/id');
	}
	logout() {
		window.location.href = "/api/auth/logout";
	}

	userInfo(){
		return this.http.get<any>('/api/user/myinfo');
	}

}
