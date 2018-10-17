import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user-services/user.service';

@Component({
  selector: 'app-user-controlpanel',
  templateUrl: './user-controlpanel.component.html',
  styleUrls: ['./user-controlpanel.component.css']
})
export class UserControlpanelComponent implements OnInit {

  currentUser: string;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userService.checkAccessRights();
    this.currentUser = this.userService.getCurrentLoginToSession().userName;
  }

  logout(){
    this.userService.logoutCurrentLoginSession();
    this.router.navigate(['login']);
  }
}
