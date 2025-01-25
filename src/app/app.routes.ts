import { Routes } from '@angular/router';
import { DEFAULT_LANG, LANGS_LIST } from './constants/lang.constants';
import { authGuard } from './guards/auth/auth.guard';
import { authRoutes } from './pages/auth/auth.routes';
import { authRedirectGuard } from './guards/auth-redirect/auth-redirect.guard';

const langRoutes: Routes[] = LANGS_LIST.map((lang) => [
  {
    path: lang,
    loadComponent: () => import('./pages/home/home.component').then((c) => c.HomePageComponent),
    canActivate: [authRedirectGuard],
  },
  {
    path: `${lang}/auth`,
    loadComponent: () => import('./pages/auth/auth.component').then((c) => c.AuthPageComponent),
    children: authRoutes,
    canActivate: [authRedirectGuard],
  },
  {
    path: `${lang}/dashboard`,
    loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardPageComponent),
    canActivate: [authGuard],
  },
  {
    path: `${lang}/page-one`,
    loadComponent: () => import('./pages/page-one/page-one.component').then((c) => c.PageOneComponent),
    canActivate: [authGuard],
  },
  {
    path: `${lang}/page-two`,
    loadComponent: () => import('./pages/page-two/page-two.component').then((c) => c.PageTwoComponent),
    canActivate: [authGuard],
  },
  {
    path: `${lang}/profile`,
    loadComponent: () => import('./pages/profile/profile.component').then((c) => c.ProfilePageComponent),
    canActivate: [authGuard],
  },
  {
    path: `${lang}/settings`,
    loadComponent: () => import('./pages/settings/settings.component').then((c) => c.SettingsPageComponent),
    canActivate: [authGuard],
  },
]);

export const routes: Routes = [
  {
    path: '',
    redirectTo: `/${DEFAULT_LANG}`,
    pathMatch: 'full',
  },
  ...langRoutes.flat(),
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then((c) => c.NotFoundPageComponent),
  },
];
