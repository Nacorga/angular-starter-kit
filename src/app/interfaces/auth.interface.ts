import { User, UserApiModel } from './user.interface';

export interface AuthApiModel {
  user: UserApiModel;
  access_token?: string;
}
export interface Auth {
  user: User;
  access_token?: string;
}
