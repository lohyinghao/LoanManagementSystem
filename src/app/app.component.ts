import { Component, OnInit } from '@angular/core';

import { UserService } from './services/user-services/user.service';
import { PopulateFakeBackendService } from './services/fake-backend/populate-fake-backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Lenders Union';
  getUsernameforNavBar = "";

  constructor(private userService: UserService,
              private populateFakeBackendService: PopulateFakeBackendService){}

  ngOnInit(): void {
    this.userService.getUsernameforNavBar().subscribe(
      data => { this.getUsernameforNavBar = data;
                console.log(data) },
      err => console.error(err)
    )

    //populate some data into mock DB
    this.populateFakeBackendService.populate();
  }
}
