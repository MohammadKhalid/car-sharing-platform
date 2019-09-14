import { Component, OnInit } from '@angular/core';
import { MediaChange, ObservableMedia } from "@angular/flex-layout";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TitleService } from '../../services/title.service';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	public mode: string = 'side';
	public opened: boolean = true;
	public position = "start";
	public title: string = "";
	public mediaChange: MediaChange;
	public user = {
		uid: 0,
		name: "N/A",
		address: "N/A",
		email: "N/A"
	};
	navs = [
		{ name: "Home", "url": "home", "icon": "home" },
		{ name: "Payments", "url": "payments", "icon": "payment" },
		{ name: "Favourites", "url": "favourites", "icon": "favorite" },
		{ name: "Settings", "url": "settings", "icon": "settings" },
	];
	constructor(private media: ObservableMedia, private auth: AuthService, public router: Router, private titleService: TitleService) {
	}
	public getMode(mediaChange: MediaChange): string {
		// set mode based on a breakpoint
		if (this.media.isActive('gt-sm')) {
			return 'side';
		} else {
			return 'over';
		}
	}

	public getPosition(mediaChange: MediaChange): string {
		// set mode based on a breakpoint
		if (this.media.isActive('gt-sm')) {
			return 'start';
		} else {
			return 'end';
		}
	}

	// open/close as needed
	public getOpened(mediaChange: MediaChange): boolean {
		if (this.media.isActive('gt-sm')) {
			return true;
		} else {
			return false;
		}
	}
	public logout() {
		this.auth.logout();
	}
	public isHiding() {
		var regexp = new RegExp('\/dashboard\/profile\/.*|\/dashboard\/sell');
		var test = regexp.test(this.router.url);
		return (test);
	}
	ngOnInit() {
		this.auth.userInfo().subscribe(
			res => {
				this.user.name = res.name;
				this.user.address = res.address;
				this.user.email = res.email;
			},
			err => {
				console.log("err:", err);
			}
		)
		this.titleService.title.subscribe(title => {
			this.title = title;
		});
		this.media.subscribe((mediaChange: MediaChange) => {
			this.mode = this.getMode(mediaChange);
			this.opened = this.getOpened(mediaChange);
			this.position = this.getPosition(mediaChange);
			this.mediaChange = mediaChange;
		});
	}

}
