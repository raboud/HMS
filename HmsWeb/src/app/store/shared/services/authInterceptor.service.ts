import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private auth: SecurityService;

  constructor(private injector: Injector) {}

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    this.auth = this.injector.get(SecurityService); // get it here within intercept
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
