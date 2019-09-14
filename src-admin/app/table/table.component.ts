import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../services/user';

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit {
    users: User[];
    ngOnInit() {
        this.userService.list().subscribe(
            res => {
                this.users = res;
            },
            err => {
                console.log("Error occured");
            });
    }
    activate(user) {
        this.userService.activate(user);
        
    }
    deactivate(user) {
        this.userService.deactivate(user);
        
    }

    loginAsUser(user){
        this.userService.loginAsUser(user);
    }
    constructor(private userService: UserService) { }
}
