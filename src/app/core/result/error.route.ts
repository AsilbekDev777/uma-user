import {Routes} from "@angular/router";
import {ErrorComponent} from "./error.component";

export const ERROR_ROUTES: Routes = [
  {
    path: '403',
    component: ErrorComponent,
    title: 'Доступ запрещен',
    data: {
      title: 'Доступ запрещен',
      subTitle: 'Извините, вы не авторизованы для доступа к этой странице.'
    }
  },
  {
    path: '404',
    component: ErrorComponent,
    title: 'Не найдено',
    data: {
      title: 'Не найдено',
      subTitle: 'Извините, страница, которую вы посетили, не существует.'
    }
  },
  {
    path: '500',
    component: ErrorComponent,
    title: 'Внутренняя ошибка сервера',
    data: {
      title: 'Внутренняя ошибка сервера',
      subTitle: 'Извините, на сервере ошибка.'
    }
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];
