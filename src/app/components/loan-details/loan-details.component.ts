import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoanService } from '../../services/loan-services/loan.service';
import { UserService } from '../../services/user-services/user.service';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})

export class LoanDetailsComponent implements OnInit {

  pageTitle: string = 'Loan Details';
  loan; 

  constructor(private route: ActivatedRoute,
              private router: Router,
              private loanService: LoanService,
              private userService: UserService) { }

  ngOnInit() {
    let loanId = +this.route.snapshot.paramMap.get('loanId');
    this.getLoanDetails(loanId);
    this.userService.checkAccessRights();
  }

  getLoanDetails(loanId: number){
    this.loanService.getLoanById(loanId).subscribe(
      data => { this.loan = data },
      err => console.error(err)
    );
  }
  
}
