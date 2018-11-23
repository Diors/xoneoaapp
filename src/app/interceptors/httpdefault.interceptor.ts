import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { HttpInterceptor, HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';

// 所有http請求，在url前添加context-path和HttpHeader
const CONTEXT_PATH = 'http://localhost:8090/';
@Injectable()
export class HttpDefaultInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('start http default interceptor');
        const httpreq = req.clone({
            url: req.url.replace(req.url, CONTEXT_PATH + req.url)
        });

        const authToken = this.authService.getAuthorizationToken();
        httpreq.headers.set('Authorization', authToken);
        return next.handle(httpreq);
    }
}
