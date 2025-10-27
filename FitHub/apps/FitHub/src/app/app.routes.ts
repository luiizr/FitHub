import { Route } from '@angular/router';
import { LoginComponent } from '../inicial/login/login.component';
import { RegistroComponent } from '../inicial/registro/registro.component';
import { LandingPageComponent } from '../inicial/landingPage/landingPage.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { isNotAuthenticatedGuard } from './guards/is-not-authenticated.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [isNotAuthenticatedGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [isNotAuthenticatedGuard],
  },
  {
    path: 'registro',
    component: RegistroComponent,
    canActivate: [isNotAuthenticatedGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];