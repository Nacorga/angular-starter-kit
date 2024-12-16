export type EnvironmentName = 'dev' | 'prod';

export interface Environment {
  production: boolean;
  name: EnvironmentName;
  appUrl: string;
  apiUrl: string;
  googleClientId: string;
  googleTagManagerId: string;
  timeout: number;
}
