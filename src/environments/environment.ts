import { Environment } from '@app/interfaces/environment.interface';

export const environment: Environment = {
  production: false,
  name: 'dev',
  appUrl: 'http://localhost:4200',
  apiUrl: 'http://localhost:3000',
  googleClientId: '',
  googleTagManagerId: '',
  timeout: 30000,
};
