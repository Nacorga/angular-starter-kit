import { LayoutBreakpoint } from '@app/constants/layout.constants';
import { Lang } from '@app/types/lang.types';
import { User } from './user.interface';

export interface State {
  currentLang: Lang;
  layout: LayoutBreakpoint;
  loader: boolean;
  user: User;
}
