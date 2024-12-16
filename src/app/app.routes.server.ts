import { RenderMode, ServerRoute } from '@angular/ssr';
import { LANGS_LIST } from './constants/lang.constants';

const buildServerRoute = (path: string, renderMode: RenderMode): ServerRoute =>
  ({
    path,
    renderMode,
  }) as ServerRoute;

const langServerRoutes: ServerRoute[] = LANGS_LIST.map((lang) => [
  buildServerRoute(lang, RenderMode.Prerender),
  buildServerRoute(`${lang}/auth/login`, RenderMode.Prerender),
  buildServerRoute(`${lang}/auth/register`, RenderMode.Prerender),
]).flat();

export const serverRoutes: ServerRoute[] = [
  ...langServerRoutes,
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
