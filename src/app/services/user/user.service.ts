import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetUserInfoRequest } from '../../types/main';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'https://epam-server-fl19.herokuapp.com/api/user';


  constructor(
    private _http: HttpClient,
  ) { }

  getUserInfo(): Observable<GetUserInfoRequest> {
    return this._http.get<GetUserInfoRequest>(`${this.url}/me`);
  }
}
