import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
import { AuthComponent } from './core/components/auth/auth.component';

const routes: Routes = [
  // {
  //   path: "",
  //   component: AppComponent,
  // },
  {
    path: "login",
    component: AuthComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
