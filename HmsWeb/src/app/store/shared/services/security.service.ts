import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationService } from './configuration.service';
import { StorageService } from './storage.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Injectable()
export class SecurityService {
  public UserData: any;

    private actionUrl: string;
    private headers: HttpHeaders;
    private authenticationSource = new Subject<boolean>();
    authenticationChallenge$ = this.authenticationSource.asObservable();
    private authorityUrl = '';

    constructor(
      private _http: HttpClient,
      private _router: Router,
      private _route: ActivatedRoute,
      private _configurationService: ConfigurationService,
      private _storage: StorageService
    ) {
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');

        this._configurationService.settingsLoaded$.subscribe(x => {
            this.authorityUrl = this._configurationService.serverSettings.identityUrl;
            this._storage.store('IdentityUrl', this.authorityUrl);
        });

        if (this._storage.retrieve('IsAuthorized') !== '') {
            this.IsAuthorized = this._storage.retrieve('IsAuthorized');
            this.authenticationSource.next(true);
            this.UserData = this._storage.retrieve('userData');
        }
    }

    public IsAuthorized: boolean;

    public getAuthorizationHeader(): string {
      return 'Bearer ' + this.GetToken()
    }

    public GetToken(): any {
        return this._storage.retrieve('authorizationData');
    }

    public ResetAuthorizationData() {
        this._storage.store('authorizationData', '');
        this._storage.store('authorizationDataIdToken', '');

        this.IsAuthorized = false;
        this._storage.store('IsAuthorized', false);
    }

    public SetAuthorizationData(token: any, id_token: any) {
        if (this._storage.retrieve('authorizationData') !== '') {
            this._storage.store('authorizationData', '');
        }

        this._storage.store('authorizationData', token);
        this._storage.store('authorizationDataIdToken', id_token);
        this.IsAuthorized = true;
        this._storage.store('IsAuthorized', true);

        this.getUserData()
            .subscribe(data => {
                this.UserData = data;
                this._storage.store('userData', data);
                // emit observable
                this.authenticationSource.next(true);
                window.location.href = location.origin;
            },
            error => this.HandleError(error),
            () => {
                console.log(this.UserData);
            });
    }

    public Authorize() {
        this.ResetAuthorizationData();

        const authorizationUrl = this.authorityUrl + '/connect/authorize';
        const client_id = 'js';
        const redirect_uri = location.origin + '/';
        const response_type = 'id_token token';
        const scope = 'openid profile orders basket marketing locations';
        const nonce = 'N' + Math.random() + '' + Date.now();
        const state = Date.now() + '' + Math.random();

        this._storage.store('authStateControl', state);
        this._storage.store('authNonce', nonce);

        const url =
            authorizationUrl + '?' +
            'response_type=' + encodeURI(response_type) + '&' +
            'client_id=' + encodeURI(client_id) + '&' +
            'redirect_uri=' + encodeURI(redirect_uri) + '&' +
            'scope=' + encodeURI(scope) + '&' +
            'nonce=' + encodeURI(nonce) + '&' +
            'state=' + encodeURI(state);

        window.location.href = url;
    }

    public AuthorizedCallback() {
        this.ResetAuthorizationData();

        const hash = window.location.hash.substr(1);

        const result: any = hash.split('&').reduce(function (result: any, item: string) {
            const parts = item.split('=');
            result[parts[0]] = parts[1];
            return result;
        }, {});

        console.log(result);

        let token = '';
        let id_token = '';
        let authResponseIsValid = false;

        if (!result.error) {

            if (result.state !== this._storage.retrieve('authStateControl')) {
                console.log('AuthorizedCallback incorrect state');
            } else {

                token = result.access_token;
                id_token = result.id_token;

                const dataIdToken: any = this.getDataFromToken(id_token);
                console.log(dataIdToken);

                // validate nonce
                if (dataIdToken.nonce !== this._storage.retrieve('authNonce')) {
                    console.log('AuthorizedCallback incorrect nonce');
                } else {
                    this._storage.store('authNonce', '');
                    this._storage.store('authStateControl', '');

                    authResponseIsValid = true;
                    console.log('AuthorizedCallback state and nonce validated, returning access token');
                }
            }
        }


        if (authResponseIsValid) {
            this.SetAuthorizationData(token, id_token);
        }
    }

    public Logoff() {
        const authorizationUrl = this.authorityUrl + '/connect/endsession';
        const id_token_hint = this._storage.retrieve('authorizationDataIdToken');
        const post_logout_redirect_uri = location.origin + '/';

        const url =
            authorizationUrl + '?' +
            'id_token_hint=' + encodeURI(id_token_hint) + '&' +
            'post_logout_redirect_uri=' + encodeURI(post_logout_redirect_uri);

        this.ResetAuthorizationData();

        // emit observable
        this.authenticationSource.next(false);
        window.location.href = url;
    }

    public HandleError(error: HttpErrorResponse) {
        console.log(error);
        if (error.status === 403) {
            this._router.navigate(['/Forbidden']);
        } else if (error.status === 401) {
            // this.ResetAuthorizationData();
            this._router.navigate(['/Unauthorized']);
        }
    }

    private urlBase64Decode(str: string) {
        let output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }

        return window.atob(output);
    }

    private getDataFromToken(token: any) {
        let data = {};
        if (typeof token !== 'undefined') {
            const encoded = token.split('.')[1];
            data = JSON.parse(this.urlBase64Decode(encoded));
        }

        return data;
    }

    private getUserData = (): Observable<string[]> => {
        this.setHeaders();
        if (this.authorityUrl === '') {
            this.authorityUrl = this._storage.retrieve('IdentityUrl');
        }

        return this._http.get(this.authorityUrl + '/connect/userinfo', {
            headers: this.headers,
        }).map((res: HttpResponse<any>) => res.body());
    }

    private setHeaders() {
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');

        const token = this.GetToken();

        if (token !== '') {
            this.headers.append('Authorization', 'Bearer ' + token);
        }
    }
}
