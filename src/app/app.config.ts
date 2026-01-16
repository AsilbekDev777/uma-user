import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {provideNzIcons} from 'ng-zorro-antd/icon';
import {
  UserOutline,
  FacebookOutline,
  TwitterOutline,
  InstagramOutline,
  LinkedinOutline,
  ShoppingCartOutline, ArrowLeftOutline, EnvironmentOutline, SlidersOutline
} from '@ant-design/icons-angular/icons';
import {provideIcons} from '@ng-icons/core';
import {lucideHome, lucideSettings, lucideUser2} from '@ng-icons/lucide';
import {en_US, provideNzI18n} from 'ng-zorro-antd/i18n';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideNzIcons([
      UserOutline,
      FacebookOutline,
      TwitterOutline,
      InstagramOutline,
      LinkedinOutline,
      ShoppingCartOutline,
      ArrowLeftOutline,
      EnvironmentOutline,
      SlidersOutline
    ]),
    provideIcons({
      lucideHome,
      lucideSettings,
      lucideUser2
    }),
    provideNzI18n(en_US)
  ]
};
