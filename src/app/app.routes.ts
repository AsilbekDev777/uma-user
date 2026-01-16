import {Routes} from '@angular/router';
import {ERROR_ROUTES} from './core/result/error.route';
import {AuthGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    loadComponent: async () => (await import('./layouts/layout.component')).LayoutComponent,
    // providers: [LayoutStore],
    loadChildren: () => {
      return [
        {
          path: '',
          // canActivate: [AuthGuard],
          loadComponent: async () => (await import('./features/main/main.component')).HomeComponent,
        },
        {
          path: 'card',
          // canActivate: [AuthGuard],
          loadComponent: async () => (await import('./features/card/card.component')).CardComponent,
        },
        {
          path: 'checkout',
          // canActivate: [AuthGuard],
          loadComponent: async () => (await import('./features/checkout/checkout.component')).CheckoutComponent,
        }
      ]
    }
  },
  {
    path: 'search',
    // canActivate: [AuthGuard],
    loadComponent: async () => (await import('./features/search/search.component')).SearchComponent,
  },
  {
    path: 'product',
    // canActivate: [AuthGuard],
    loadComponent: async () => (await import('./features/product/product.component')).ProductComponent,
  },
  {
    path: 'profile',
    // canActivate: [AuthGuard],
    loadComponent: async () =>
      (await import('./features/profile-layout/profile-layout.component'))
        .ProfileLayoutComponent,
    children: [
      {
        path: 'info',
        // canActivate: [AuthGuard],
        loadComponent: async () =>
          (await import('./features/profile-layout/profile-info/profile-info.component'))
            .ProfileInfoComponent,
      },
      {
        path: 'orders',
        // canActivate: [AuthGuard],
        loadComponent: async () =>
          (await import('./features/profile-layout/profile-orders/profile-orders.component'))
            .ProfileOrdersComponent,
      },
      {
        path: 'notifications',
        // canActivate: [AuthGuard],
        loadComponent: async () =>
          (await import('./features/profile-layout/profile-notification/profile-notification.component'))
            .ProfileNotificationComponent,
      },
      {
        path: 'feedback',
        // canActivate: [AuthGuard],
        loadComponent: async () =>
          (await import('./features/profile-layout/profile-feedback/profile-feedback.component'))
            .ProfileFeedbackComponent,
      },
    ],
  },
  {
    path: 'login',
    loadComponent: async () => (await import('./auth/auth.component')).AuthComponent,
  },
  ...ERROR_ROUTES
];
