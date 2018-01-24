import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/operator/retry';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SecurityService } from './security.service';
import { Guid } from '../../guid';

// Implementing a Retry-Circuit breaker policy
// is pending to do for the SPA app
@Injectable()
export class DataService {
    constructor(private http: HttpClient, private securityService: SecurityService) { }

    get<type>(url: string, params?: any): Observable<type> {
        if (this.securityService) {
          return this.http.get<type>(url)
          .map(
            (d) => {
              return d;
        }).catch(this.handleError);
        } else {
        return this.http.get<type>(url).map(
            () => {
        }).catch(this.handleError);
      }
    }

    postWithId(url: string, data: any, params?: any): Observable<Response> {
        return this.doPost(url, data, true, params);
    }

    post(url: string, data: any, params?: any): Observable<Response> {
        return this.doPost(url, data, false, params);
    }

    putWithId(url: string, data: any, params?: any): Observable<Response> {
        return this.doPut(url, data, true, params);
    }

    private doPost(url: string, data: any, needId: boolean, params?: any): Observable<Response> {
      const options: HttpHeaders = new HttpHeaders();


        if (this.securityService) {
            options.set('Authorization', this.securityService.getAuthorizationHeader());
        }
        if (needId) {
            const guid = Guid.newGuid();
            options.append('x-requestid', guid);
        }

        return this.http.post(url, data, {headers: options}).map(
            (res: HttpResponse<any>) => {
                return res;
            }).catch(this.handleError);
    }

    private doPut(url: string, data: any, needId: boolean, params?: any): Observable<Response> {
      const options: HttpHeaders = new HttpHeaders();


        if (this.securityService) {
            options.set('Authorization', this.securityService.getAuthorizationHeader());
        }
        if (needId) {
            const guid = Guid.newGuid();
            options.append('x-requestid', guid);
        }

        return this.http.put(url, data, {headers: options}).map(
            (res: Response) => {
                return res;
            }).catch(this.handleError);
    }

    delete(url: string, params?: any) {
      /*
        let options: RequestOptionsArgs = {};

        if (this.securityService) {
            options.headers = new Headers();
            options.headers.append('Authorization', 'Bearer ' + this.securityService.GetToken());
        }

        console.log('data.service deleting');
        // return this.http.delete(url, options).subscribe(
        //        return res;
        //    );
*/
        this.http.delete(url).subscribe((res) => {
            console.log('deleted');
        });
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error instanceof HttpErrorResponse) {
            let errMessage = '';
            try {
                errMessage = error.message;
            } catch (err) {
                errMessage = error.statusText;
            }
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'server error');
    }
}
