import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { LoanService } from '../../services/loan-services/loan.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-services/user.service';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.css']
})

export class LoanFormComponent implements OnInit {

  requestedForApproval: boolean; //Interest Rate calculated
  approved: boolean; //Interest Rate within limit
  loanForm: FormGroup;
  loan: any;
  submittedLoan: any;

  constructor(private formBuilder: FormBuilder,
              private loanService: LoanService,
              private userService: UserService,
              private router: Router) {

    this.loanForm = formBuilder.group({
      'customerName': [null, Validators.required],
      'identificalNumber': [null, Validators.required],
      'loanAmount': [null, Validators.required],
      'creditRating': [null, Validators.required],
      'termsInMonths': [6, Validators.required],
      'annualIncome': [null, Validators.required]
    })
  }

  ngOnInit() {
    this.requestedForApproval = false;
    this.approved = false;
    this.userService.checkAccessRights();
  }

  calculateInterestRate(submittedLoan) {
    this.loanService.calculateInterestRates(submittedLoan).subscribe(
      data => { this.loan = data;
                this.getApproval(data);
                this.requestedForApproval = true;
                this.loan.loanOfficer = this.userService.getCurrentLoginToSession().userName;
              },
      err => console.error(err)
    );
    this.requestedForApproval = true;
  }

  getApproval(submittedLoan) {
    this.loanService.requestApproval(submittedLoan).subscribe(
      data => { this.approved = Boolean(data) },
      err => console.error(err)
    );
  }

  addLoan() {
    this.loanService.postNewLoan(this.loan).subscribe(
      data => { this.loan = data;
                this.router.navigate(['../loan', this.loan.loanID]) },
      err => console.error(err)
    )

  }

  onBack() {
    this.loan = null;
    this.requestedForApproval = false;
  }
}
