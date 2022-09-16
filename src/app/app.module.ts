import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'chat-scoop.au.auth0.com',
      clientId: 'kCNa5h19rU8uwDJahVRIZmsxIaaaMVY1',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }







//////////////////////////////////////////////////////////////////////////////////////////////////////
// Domain: chat-scoop.au.auth0.com
// Client ID: kCNa5h19rU8uwDJahVRIZmsxIaaaMVY1
//////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////
// {
//   "sub": "auth0|630e49dbaeefe014f7a3b9e1",
//   "nickname": "patelhrishikesh2000",
//   "name": "patelhrishikesh2000@gmail.com",
//   "picture": "https://s.gravatar.com/avatar/1559d16c067e94a7489bebf2789e0b97?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpa.png",
//   "updated_at": "2022-08-30T17:33:16.003Z"
// }
//////////////////////////////////////////////////////////////////////////////////////////////////////