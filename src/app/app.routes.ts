import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
  },
  { path: 'guests/:id', loadComponent: () => import('./guests/guest-detail.component').then((m) => m.GuestDetailComponent) },
  { path: 'guests', loadComponent: () => import('./guests/guests.component').then((m) => m.GuestsComponent) },
  { path: 'analytics', loadComponent: () => import('./analytics/analytics.component').then((m) => m.AnalyticsComponent) },
  { path: 'payments', loadComponent: () => import('./payments/payments.component').then((m) => m.PaymentsComponent) },
  { path: 'settings', loadComponent: () => import('./settings/settings.component').then((m) => m.SettingsComponent) },
  {
    path: 'properties',
    loadComponent: () =>
      import('./properties/properties.component').then(
        (m) => m.PropertiesComponent,
      ),
  },
  {
    path: 'reservations/new',
    loadComponent: () =>
      import('./reservations/reservation-create.component').then(
        (m) => m.ReservationCreateComponent,
      ),
  },
  {
    path: 'reservations/:id',
    loadComponent: () =>
      import('./reservations/reservation-detail.component').then(
        (m) => m.ReservationDetailComponent,
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
    path: 'booking/request/:token',
    loadComponent: () =>
      import('./reservations/booking-request.component').then(
        (m) => m.BookingRequestComponent,
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
    path: 'properties/:id',
    loadComponent: () =>
      import('./properties/property-detail.component').then(
        (m) => m.PropertyDetailComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  { path: '**', redirectTo: 'dashboard' },
];
