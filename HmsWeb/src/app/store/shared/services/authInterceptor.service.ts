import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SecurityService } from './security.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: SecurityService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.IsAuthorized) {
      // Get the auth header from the service.
      const authHeader = this.auth.getAuthorizationHeader();
      // Clone the request to add the new header.
      const authReq = req.clone({
        headers: req.headers.set('Authorization', authHeader)
      });
      // Pass on the cloned request instead of the original request.
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}