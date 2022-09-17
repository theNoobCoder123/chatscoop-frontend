import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

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
    localStorage.removeItem("token");
    this._auth.logout()
  }

  public saveToken() {
    this._auth.getAccessTokenSilently().subscribe((token: string) => {
      localStorage.setItem("token", token);
    });
  }
}
