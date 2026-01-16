import { inject, PLATFORM_ID } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    if (!auth.isAuthToken) {
      return inject(Router).createUrlTree(['/login']);
    }

    return true;
  } else {
    return true;
  }
};
