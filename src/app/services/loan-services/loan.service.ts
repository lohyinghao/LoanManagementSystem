import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class LoanService {

  constructor(private http: HttpClient) { }

  getLoans() {
    return this.http.get('/api/loan/all');
  }

  getLoanById(loanId: number) {
    return this.http.get(`/api/loan/${loanId}`);
  }

  postNewLoan(loan) {
    let body = JSON.stringify(loan);
      return this.http.post('/api/loan/new', body, httpOptions);
  }

  calculateInterestRates(loan) {
    let body = JSON.stringify(loan);
    return this.http.post('/api/loan/calculate', body, httpOptions)
  }

  requestApproval(loan){
    let body = JSON.stringify(loan);
    return this.http.post('/api/loan/approval', body, httpOptions);
  }
}
