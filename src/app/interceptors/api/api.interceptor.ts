import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cookie } from '@app/constants/cookie.constants';
import { StorageService } from '@app/services/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
class ApiInterceptorService {
  private readonly storageSrv: StorageService = inject(StorageService);

  intercept(req, next) {
    const token = this.storageSrv.getCookie(Cookie.Token);

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next(req);
  }
}

export const apiInterceptor: HttpInterceptorFn = (req, next) => inject(ApiInterceptorService).intercept(req, next);
