import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FakeBackendService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var loansDB = JSON.parse(localStorage.getItem('loansDB'));

    if (request.url.endsWith('/api/loan/all') && request.method === 'GET') {
      let body = loansDB;
      return of(new HttpResponse({ status: 200, body: body }));
    }

    if (request.url.match(/\/api\/loan\/\d+$/) && request.method === 'GET') {
      let urlParts = request.url.split('/');
      let id = parseInt(urlParts[urlParts.length - 1]);
      let matchedLoan = loansDB.filter(loan => { return loan.loanID === id; });
      return of(new HttpResponse({ status: 200, body: matchedLoan[0] }));
    }

    if (request.url.endsWith('/api/loan/new')  && request.method === 'POST') {
      let newLoan = JSON.parse(request.body);
      newLoan.loanID = loansDB.length + 1;
      loansDB.push(newLoan);
      localStorage.setItem('loansDB', JSON.stringify(loansDB));
      let matchedLoan = loansDB.filter(loan => { return loan.loanID === newLoan.loanID; });
      return of(new HttpResponse({ status: 200, body: matchedLoan[0] }));
    }

    if (request.url.endsWith('/api/loan/calculate')  && request.method === 'POST') {
      let newLoan = JSON.parse(request.body);
      let a = 0.1133;
      let b = 0.007197;
      let c = 0.008028;
      let creditRatingNum = {
        "A": 1,
        "B": 2,
        "C": 3,
        "D": 4,
        "E": 5,
        "F": 6,
        "G": 7,
      }
      let calinterestRates = a*Math.sqrt(newLoan.loanAmount/newLoan.annualIncome)
                         +b*creditRatingNum[newLoan.creditRating]
                         +c*(newLoan.termsInMonths/6);

      calinterestRates = Math.round(calinterestRates * 10000) / 10000;
      let interestRates = Math.max(calinterestRates,0.07);
      newLoan.interestRates = interestRates;
      return of(new HttpResponse({ status: 200, body: newLoan }));
    }

    if (request.url.endsWith('/api/loan/approval')  && request.method === 'POST') {
      let newLoan = JSON.parse(request.body);
      let body = false;
      if(newLoan.interestRates < 0.3){
        body = true;
      }
      return of(new HttpResponse({ status: 200, body: body }));
    }

    if (request.url.endsWith('/api/login')  && request.method === 'POST') {
      let user = JSON.parse(request.body);
      user.password = "";
      return of(new HttpResponse({ status: 200, body: user }));
    }
  }

}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendService,
  multi: true
};

