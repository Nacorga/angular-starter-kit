import { Injectable } from '@angular/core';
import { Auth } from '@app/interfaces/auth.interface';
import { User } from '@app/models/user.model';
import { HttpBaseService } from '@app/services/http/http.service';
import { Lang } from '@app/types/lang.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends HttpBaseService {
  private readonly baseUrl = 'auth';

  sign(): Observable<User> {
    return this.Get<User>(this.baseUrl);
  }

  login(body: { email: string; password: string }): Observable<Auth> {
    return this.Post<Auth>(`${this.baseUrl}/login`, body);
  }

  loginWithGoogle(body: { code: string }): Observable<Auth> {
    return this.Post<Auth>(`${this.baseUrl}/login/google`, body);
  }

  register(body: { email: string; password: string }): Observable<Auth> {
    return this.Post<Auth>(`${this.baseUrl}/register`, body);
  }

  registerWithGoogle(body: { code: string; lang: Lang }): Observable<Auth> {
    return this.Post<Auth>(`${this.baseUrl}/register/google`, body);
  }
}
