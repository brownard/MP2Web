import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Logger } from '../logging/logger.service';

export class ApiService {
  constructor(protected http: HttpClient, protected logger: Logger, protected apiControllerUrl: string) {  }

  public getData<T>(actionPath: string, params: {}) {
    return this.http.get<T>(this.apiControllerUrl + actionPath, { params: createHttpParams(params) }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.logger.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.logger.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'API request failed.');
  }
}

/**
 * Creates a HttpParams object with any undefined/null fields removed.
 * @param params Existing params object with possible undefined/null fields.
 */
export function createHttpParams(params: {}): HttpParams {
  let httpParams: HttpParams = new HttpParams();
  Object.keys(params).forEach(param => {
    if (params[param] !== undefined && params[param] !== null) {
      httpParams = httpParams.set(param, params[param]);
    }
  });

  return httpParams;
}
