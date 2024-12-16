import { User } from '@app/models/user.model';

export interface Auth {
  user: User;
  access_token?: string;
}
