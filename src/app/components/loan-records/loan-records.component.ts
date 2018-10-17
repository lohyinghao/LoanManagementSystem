import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../services/loan-services/loan.service';
import { UserService } from '../../services/user-services/user.service';

@Component({
  selector: 'app-loan-records',
  templateUrl: './loan-records.component.html',
  styleUrls: ['./loan-records.component.css']
})
export class LoanRecordsComponent implements OnInit {

  loans;

  constructor(private loanService: LoanService,
              private userService: UserService) { }

  ngOnInit() {
    this.getLoans();
    this.userService.checkAccessRights();
  }

  getLoans(){
    this.loanService.getLoans().subscribe(
      data => { 
        this.loans = data;
      },
      err => console.error(err)
    )
  }

}
