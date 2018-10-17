import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopulateFakeBackendService{

  constructor() { }

  populate(): void {
    let loansDB = [
      {
        "loanID": 1,
        "customerName": "alfred",
        "identificalNumber": "C91G93CJ",
        "loanAmount": 7200,
        "creditRating": "C",
        "termsInMonths": 36,
        "annualIncome": 51738,
        "interestRates": 0.1358,
        "loanOfficer": "yinghao.loh"
      },

      {
        "loanID": 2,
        "customerName": "kerry",
        "identificalNumber": "77YP8NW6",
        "loanAmount": 12000,
        "creditRating": "A",
        "termsInMonths": 36,
        "annualIncome": 240000,
        "interestRates": 0.0607,
        "loanOfficer": "yinghao.loh"
      },

      {
        "loanID": 3,
        "customerName": "julia",
        "identificalNumber": "T5VYG862",
        "loanAmount": 3100,
        "creditRating": "B",
        "termsInMonths": 18,
        "annualIncome": 85000,
        "interestRates": 0.0943,
        "loanOfficer": "dale.eric"
      },

      {
        "loanID": 4,
        "customerName": "amanda",
        "identificalNumber": "FCS7OSQY",
        "loanAmount": 3200,
        "creditRating": "A",
        "termsInMonths": 36,
        "annualIncome": 42000,
        "interestRates": 0.0796,
        "loanOfficer": "dale.eric"
      },

      {
        "loanID": 5,
        "customerName": "jack",
        "identificalNumber": "0APQX40K",
        "loanAmount": 11000,
        "creditRating": "A",
        "termsInMonths": 36,
        "annualIncome": 100000,
        "interestRates": 0.0734,
        "loanOfficer": "dale.eric"
      }
    ]

    localStorage.setItem('loansDB', JSON.stringify(loansDB));
  }
}
