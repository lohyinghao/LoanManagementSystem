import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent implements OnInit {

  userLoginForm: FormGroup;
  firstAttemptMade: boolean;
  returnedUser: any;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {

    this.userLoginForm = formBuilder.group({
      'userName': ["test.user", Validators.required],
      'password': ["password", Validators.required]
    })
  }

  ngOnInit() {
    this.firstAttemptMade = false;
  }

  autheticateLogin(submittedUser): void {
    this.userService.loginRequest(submittedUser).subscribe(
      data => {
        if (data) {
          this.userService.saveCurrentLoginToSession(data);
          this.router.navigate(['home']);
        } else {
          this.firstAttemptMade = true;
        }
      },
      err => console.error(err)

    )
  }

}
