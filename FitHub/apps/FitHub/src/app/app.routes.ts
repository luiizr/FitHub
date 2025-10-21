import { Route } from '@angular/router';
import { LoginComponent } from '../inicial/login/login.component';
import { RegistroComponent } from '../inicial/registro/registro.component';
import { LandingPageComponent } from '../inicial/landingPage/landingPage.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];