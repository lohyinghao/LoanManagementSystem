import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private username4navbar = new Subject<string>();


  constructor(private http: HttpClient,
              @Inject(SESSION_STORAGE) private storage: WebStorageService,
              private router: Router) {
                this.username4navbar.next("");
              }

  loginRequest(user) {
    let body = JSON.stringify(user);
    return this.http.post('/api/login', body, httpOptions)
  }

  saveCurrentLoginToSession(user): void {
    this.storage.set('user', user);
    this.username4navbar.next(user.userName);
  }

  logoutCurrentLoginSession():void {
    this.storage.remove('user');
    this.username4navbar.next("");
  }

  getCurrentLoginToSession() {
    return this.storage.get('user');
  }

  checkAccessRights() {
    if (this.getCurrentLoginToSession() === null
      && typeof this.getCurrentLoginToSession() === "object") {
      this.router.navigate(['login'])
    }
  }

  getUsernameforNavBar(): Observable<string> {
    return this.username4navbar.asObservable();
  }
}
