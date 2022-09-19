import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { Subscriber, Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy {

  private _subscriptions: Subscription[];

  constructor(private _auth: AuthService) {
    this._subscriptions = [];
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
      console.log(subscription);
    });
  }

  public isAuthenticated(): Observable<boolean> {
    return this._auth.isAuthenticated$;
  }

  public getUser(): Observable<User | null | undefined> {
    return this._auth.user$;
  }

  public login(): void {
    this._auth.loginWithRedirect();
  }

  public signup(): void {
    this._auth.loginWithRedirect({ screen_hint: 'signup' });
  }

  public logout() {
    localStorage.removeItem("token");
    this._auth.logout()
  }

  public saveUserInfo() {
    let temp = this._auth.user$.subscribe((data) => {
      localStorage.setItem("username", data?.['username']);
    });
    this._subscriptions.push(temp);
  }

  public saveToken() {
    let temp = this._auth.getAccessTokenSilently().subscribe((token: string) => {
      localStorage.setItem("token", token);
    });
    this._subscriptions.push(temp);
  }
}
