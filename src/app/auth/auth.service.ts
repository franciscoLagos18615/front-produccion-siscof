import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {

  private loginUrl = 'http://142.93.113.147:8080/api/auth/signin';
  private signupUrl = 'http://142.93.113.147:8080/api/auth/signup';
  private estaLogeado = false;

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    this.estaLogeado = true;
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
    //this.estaLogeado = true;

  }
  getSeLogeo(){
    if (this.estaLogeado){
      return true;
    }
    else{
      return false;
    }
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }


}
