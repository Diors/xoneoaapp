import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ResponseMessage } from '../response';


const TOKEN_KEY = 'auth-token';
const url = 'login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  constructor(private storage: Storage, private plt: Platform, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  login(username, password) {
    const body = {
      username: username,
      password: password
    };
    // let httpres = this.http.post(url, body);

    return this.storage.set(TOKEN_KEY, 'liuyi 123456').then(
      res => {
        this.authenticationState.next(true);
      }
    );
  }


  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
  getAuthorizationToken() {
    return this.storage.get(TOKEN_KEY).toString();
  }

  checkToken() {
    const token = this.storage.get(TOKEN_KEY);
    if (token) {
      // check token is active in server
      this.http.post<ResponseMessage>('/verifyToken', null).subscribe(data => {
        console.log(data.code);
        if (data.code === '0000') {
          return this.authenticationState.next(true);
        } else {
          return this.authenticationState.next(false);
        }
      }, err => {
        return this.authenticationState.next(false);
      });
    } else {
      return this.authenticationState.next(false);
    }
  }
}
