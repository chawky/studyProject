import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { LayoutComponent } from './layout/layout.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'app-signup', component: SignupComponent },
  {
    path: 'app-layout',
    component: LayoutComponent,
    children: [{ path: 'app-welcome-page', component: WelcomePageComponent }],
  },
  { path: 'footer', component: FooterComponent },
];
