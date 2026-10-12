import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
  },
  {
    path: 'properties',
    loadComponent: () =>
      import('./properties/properties.component').then(
        (m) => m.PropertiesComponent,
      ),
  },
  {
    path: 'reservations',
    loadComponent: () =>
      import('./reservations/reservations.component').then(
        (m) => m.ReservationsComponent,
      ),
  },
  {
    path: 'properties/new',
    loadComponent: () =>
      import('./properties/property-create.component').then(
        (m) => m.PropertyCreateComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  { path: '**', redirectTo: 'dashboard' },
];
