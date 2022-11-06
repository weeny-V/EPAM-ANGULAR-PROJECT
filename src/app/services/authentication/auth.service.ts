import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, SimpleRequest } from '../../types/main';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://epam-server-fl19.herokuapp.com/api/auth';
  public logged: boolean = false;

  constructor(
    private _http: HttpClient,
  ) { }

  signup(username: string, password: string): Observable<SimpleRequest> {
    return this._http.post<SimpleRequest>(`${this.url}/signup`, { username, password })
  }

  login(username: string, password: string): Observable<LoginRequest> {
    return this._http.post<LoginRequest>(`${this.url}/login`, { username, password })
  }

  setUserLogged(): void {
    this.logged = true;
  }
  setUserLogOut(): void {
    this.logged = false;
  }
}
