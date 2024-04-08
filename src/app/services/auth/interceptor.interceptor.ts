import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import swal from 'sweetalert';
import { AuthService } from './auth.service';
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const token = JSON.parse(localStorage.getItem('tokenData')!);

  const authService = inject(AuthService);
  const re = /signin/gi;
  const re1 = /refreshtoken/gi;
  // Exclude interceptor for login request
  if (token && req.url.search(re) === -1 && req.url.search(re1) === -1) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    return next(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          const isRefresh = confirm('do you want to continue  ?');
          if (isRefresh) {
            authService.$refreshToken.next(true);
          }
        }
        return throwError(error);
      })
    );
  } else {
    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
};
