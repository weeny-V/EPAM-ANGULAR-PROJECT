import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddCommentRequest, GetCommentsRequest, SimpleRequest } from '../../types/main';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url: string = 'https://epam-server-fl19.herokuapp.com/api/comment';

  constructor(
    private _http: HttpClient,
  ) { }

  addComment(boardID: string, taskID: string, from: string, message: string): Observable<AddCommentRequest> {
    return this._http.post<AddCommentRequest>(`${this.url}`, { boardID, taskID, from, message });
  }

  getComments(taskID: string): Observable<GetCommentsRequest> {
    return this._http.get<GetCommentsRequest>(`${this.url}/${taskID}`);
  }

  deleteComment(commentID: string): Observable<SimpleRequest> {
    return this._http.delete<SimpleRequest>(`${this.url}/${commentID}`);
  }
}
