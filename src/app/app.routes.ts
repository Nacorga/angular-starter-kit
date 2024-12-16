import { Routes } from '@angular/router';
import { DEFAULT_LANG, LANGS_LIST } from './constants/lang.constants';
import { HomePageComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login/login.component';
import { RegisterPageComponent } from './pages/register/register.component';

const langRoutes: Routes[] = LANGS_LIST.map((lang) => [
  {
    path: lang,
    component: HomePageComponent,
  },
  {
    path: `${lang}/auth/login`,
    component: LoginPageComponent,
  },
  {
    path: `${lang}/auth/register`,
    component: RegisterPageComponent,
  },
]);

export const routes: Routes = [
  {
    path: '',
    redirectTo: `/${DEFAULT_LANG}`,
    pathMatch: 'full',
  },
  ...langRoutes.flat(),
];
