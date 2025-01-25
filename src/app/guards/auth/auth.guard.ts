import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { RouterService } from '@app/services/router/router.service';
import { StateService } from '@app/services/state/state.service';
import { UtilsService } from '@app/services/utils/utils.service';

export const authGuard: CanActivateFn = () => {
  const stateSrv = inject(StateService);
  const utilsSrv = inject(UtilsService);
  const routerSrv = inject(RouterService);

  if (stateSrv.state.user()) {
    return true;
  }

  utilsSrv.isPlatformBrowser && routerSrv.navigate(true, ['auth', 'login']);

  return false;
};
