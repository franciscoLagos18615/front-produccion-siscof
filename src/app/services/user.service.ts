import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders  } from '@angular/common/http';
import {Http, Headers} from '@angular/http';
import { Remesa } from '../interfaces/remesa.interface';
import {map} from 'rxjs/operators';
//import { Observable } from 'rxjs/Observable';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private userUrl = 'http://142.93.113.147:8080/api/test/user';
  private pmUrl = 'http://142.93.113.147:8080/api/test/pm';
  private adminUrl = 'http://142.93.113.147:8080/api/test/admin';
  private urlRemesa = 'http://142.93.113.147:8080/api/remesa/new';
  private urlgetUserFor = 'http://142.93.113.147:8080/api/auth/user/';
  private urlGetUser = 'http://142.93.113.147:8080/api/auth/username/';
  private urlGetAlluser = 'http://142.93.113.147:8080/api/auth/user/all';
  private urlUserUpdate = 'http://142.93.113.147:8080/api/auth/UserUpdate/'

  constructor(private http: HttpClient, private http2: Http) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }
  nuevaRemesa(remesa: Remesa) {
    let body = JSON.stringify(remesa);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
   return this.http2.post(this.urlRemesa, body, { headers})
       .pipe(
         map(res => {
           console.log(res.json());
           return res.json(); }
           ));
   }
   getUser(username: string){
    let url = `${this.urlGetUser}${username}`;
    return this.http2.get(url)
      .pipe(
        map(
          res => res.json()
        )
      );
  }
  //get user for id
  getUserForId(id: number){
    let url = `${this.urlgetUserFor}${id}`;
    return this.http2.get(url)
      .pipe(
        map(
          res => res.json()
        )
      );
  }

  getAllUser(){
    let url = `${this.urlGetAlluser}`;
    return this.http2.get(url)
      .pipe(
        map(
          res => res.json()
        )
      );
  }

  //metodo para actualizar el usuario
  actualizarUser(user: User, id: number):Observable<string>  {
    //private urlUserUpdate = 'http://localhost:8080/api/auth/UserUpdate/{id}'
    let body = JSON.stringify(user);
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    let url = `${this.urlUserUpdate}${id}`;
    //this.http.post<string>(this.signupUrl, info, httpOptions);
   return this.http.put<string>(url, user, httpOptions)
       .pipe(
         map(res => {
           console.log(res);
           return res;
          }
           ));

  }

}
