import { inject, Injectable } from '@angular/core';
import { Auth, AuthApiModel } from '@app/interfaces/auth.interface';
import { User, UserApiModel } from '@app/interfaces/user.interface';
import { UserMapperService } from '@app/mappers/user/user.service';
import { HttpBaseService } from '@app/services/http/http.service';
import { Lang } from '@app/types/lang.types';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends HttpBaseService {
  private readonly baseUrl = 'auth';
  private readonly userMapperSrv = inject(UserMapperService);

  sign(): Observable<User> {
    return this.Get<UserApiModel>(this.baseUrl).pipe(map((apiModel) => this.userMapperSrv.mapApiToDomain(apiModel)));
  }

  login(body: { email: string; password: string }): Observable<Auth> {
    return this.Post<AuthApiModel>(`${this.baseUrl}/login`, body).pipe(
      map((apiModel) => ({
        access_token: apiModel.access_token,
        user: this.userMapperSrv.mapApiToDomain(apiModel.user),
      })),
    );
  }

  loginWithGoogle(body: { code: string }): Observable<Auth> {
    return this.Post<AuthApiModel>(`${this.baseUrl}/login/google`, body).pipe(
      map((apiModel) => ({
        access_token: apiModel.access_token,
        user: this.userMapperSrv.mapApiToDomain(apiModel.user),
      })),
    );
  }

  register(body: { email: string; password: string }): Observable<Auth> {
    return this.Post<AuthApiModel>(`${this.baseUrl}/register`, body).pipe(
      map((apiModel) => ({
        access_token: apiModel.access_token,
        user: this.userMapperSrv.mapApiToDomain(apiModel.user),
      })),
    );
  }

  registerWithGoogle(body: { code: string; lang: Lang }): Observable<Auth> {
    return this.Post<AuthApiModel>(`${this.baseUrl}/register/google`, body).pipe(
      map((apiModel) => ({
        access_token: apiModel.access_token,
        user: this.userMapperSrv.mapApiToDomain(apiModel.user),
      })),
    );
  }
}
