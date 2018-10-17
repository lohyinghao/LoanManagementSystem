import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';

import { AppComponent } from './app.component';

import { LoanService } from './services/loan-services/loan.service';
import { UserService } from './services/user-services/user.service';

import { LoanRecordsComponent } from './components/loan-records/loan-records.component';
import { LoanDetailsComponent } from './components/loan-details/loan-details.component';
import { LoanFormComponent } from './components/loan-form/loan-form.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserControlpanelComponent } from './components/user-controlpanel/user-controlpanel.component';
import { fakeBackendProvider } from './services/fake-backend/fake-backend.service';


@NgModule({
  declarations: [
    AppComponent,
    LoanRecordsComponent,
    LoanDetailsComponent,
    LoanFormComponent,
    UserLoginComponent,
    UserControlpanelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StorageServiceModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
      ]
    ),
    RouterModule.forChild([
      { path: 'loan/all', component: LoanRecordsComponent },
      { path: 'loan/new', component: LoanFormComponent },
      { path: 'loan/:loanId', component: LoanDetailsComponent },
      { path: 'login', component: UserLoginComponent },
      { path: 'home', component: UserControlpanelComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])

  ],
  providers: [
      LoanService,
      UserService,
      fakeBackendProvider
    ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
