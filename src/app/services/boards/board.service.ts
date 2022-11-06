import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetBoardByIdRequest, GetBoardRequest, PostBoardRequest, SimpleRequest } from '../../types/main';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private url: string = 'https://epam-server-fl19.herokuapp.com/api/board';

  constructor(private _http: HttpClient) { }

  getBoards(): Observable<GetBoardRequest> {
    return this._http.get<GetBoardRequest>(this.url);
  }

  addBoard(name: string, description: string): Observable<PostBoardRequest> {
    return this._http.post<PostBoardRequest>(`${this.url}/add`, { name, description });
  }

  updateBoard(id: string, name: string): Observable<SimpleRequest> {
    return this._http.put<SimpleRequest>(`${this.url}/update/${id}`, { name })
  }

  deleteBoard(id: string): Observable<SimpleRequest> {
    return this._http.delete<SimpleRequest>(`${this.url}/${id}`);
  }

  getBoardById(id: string): Observable<GetBoardByIdRequest> {
    return this._http.get<GetBoardByIdRequest>(`${this.url}/${id}`);
  }

  changeColor(boardID: string, column: string, color: string): Observable<SimpleRequest> {
    return this._http.patch<SimpleRequest>(`${this.url}/color/${boardID}/${column}`, { color });
  }
}
