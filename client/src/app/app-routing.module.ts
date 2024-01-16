import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { OtpCheckEmailComponent } from './otp-check-email/otp-check-email.component';
import { AddNoteComponent } from './notes/add-note/add-note.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'contact',
    component: ContactMeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
     path: 'register',
     component: RegisterComponent
  },
  {
    path: 'user/:id',
      component: UserComponent
  },
  {
    path: 'check-email',
    component: OtpCheckEmailComponent
  },
  {
    path: 'add-note',
    component: AddNoteComponent
  },
  {
    path: 'portfolio',
    component: PortfolioComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
