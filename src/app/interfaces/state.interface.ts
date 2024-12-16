import { LayoutBreakpoint } from '@app/constants/layout.constants';
import { Lang } from '@app/types/lang.types';

export interface State {
  currentLang: Lang;
  layout: LayoutBreakpoint;
  loader: boolean;
  user: Lang;
}
