import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { first, map, timeout } from 'rxjs/operators';
import { HttpOptions } from '@app/interfaces/http-options.interface';

export class HttpBaseService extends HttpClient {
  private apiUrl: string = environment.apiUrl;
  private timeout: number = environment.timeout;

  private createUrl(path: string): string {
    return `${this.apiUrl}/${path}`;
  }

  private isValidHttpParamValue(val: any): boolean {
    return val !== '' && val !== undefined && val !== null;
  }

  protected toHttpParams(params: object): HttpParams {
    let httpParams = new HttpParams();

    Object.keys(params)
      .filter((key) => this.isValidHttpParamValue(params[key]))
      .forEach((key) => {
        if (key === 'sort') {
          if (this.isValidHttpParamValue(params['sort'].value)) {
            httpParams = httpParams.append('sortKey', params['sort'].key);
            httpParams = httpParams.append('sortValue', params['sort'].value);
          }
        } else {
          httpParams = httpParams.append(key, params[key]);
        }
      });

    return httpParams;
  }

  protected Get<T>(path: string, options: HttpOptions = {}): Observable<T> {
    return this.get<{ statusCode: number; data: T }>(this.createUrl(path), options).pipe(
      timeout(this.timeout),
      first(),
      map((res) => res.data),
    ) as Observable<T>;
  }

  protected Put<T>(path: string, body: object, headers?: HttpHeaders): Observable<T> {
    return this.put<{ statusCode: number; data: T }>(this.createUrl(path), body, headers ? { headers } : {}).pipe(
      timeout(this.timeout),
      first(),
      map((res) => res.data),
    ) as Observable<T>;
  }

  protected Patch<T>(path: string, body: object, headers?: HttpHeaders): Observable<T> {
    return this.patch<{ statusCode: number; data: T }>(this.createUrl(path), body, headers ? { headers } : {}).pipe(
      timeout(this.timeout),
      first(),
      map((res) => res.data),
    ) as Observable<T>;
  }

  protected Post<T>(path: string, body: object, headers?: HttpHeaders): Observable<T> {
    return this.post<{ statusCode: number; data: T }>(this.createUrl(path), body, headers ? { headers } : {}).pipe(
      timeout(this.timeout),
      first(),
      map((res) => res.data),
    ) as Observable<T>;
  }

  protected Delete<T>(path: string, headers?: HttpHeaders): Observable<T> {
    return this.delete<{ statusCode: number; data: T }>(this.createUrl(path), headers ? { headers } : {}).pipe(
      timeout(this.timeout),
      first(),
      map((res) => res.data),
    ) as Observable<T>;
  }
}
