import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sendit';

  constructor(private _auth: AuthService) {}

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
    this._auth.logout()
  }
}
