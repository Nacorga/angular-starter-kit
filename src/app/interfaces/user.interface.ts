import { Lang } from '@app/types/lang.types';
import { UserLoginType } from '@app/types/user.types';

export interface UserApiModel {
  uuid: string;
  email: string;
  password: string;
  lang: Lang;
  loginType: UserLoginType;
  img: string;
  name: string;
  isVerified: boolean;
  newsletter: boolean;
}

export interface User {
  id: string;
  email: string;
  password: string;
  lang: Lang;
  loginType: UserLoginType;
  img: string;
  name: string;
  isVerified: boolean;
  newsletter: boolean;
}
