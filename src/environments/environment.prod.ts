import { Environment } from '@app/interfaces/environment.interface';

export const environment: Environment = {
  production: true,
  name: 'prod',
  appUrl: 'https://www.my_api.xyz',
  apiUrl: 'https://api.my_api.xyz',
  googleClientId: '',
  googleTagManagerId: '',
  timeout: 15000,
};
