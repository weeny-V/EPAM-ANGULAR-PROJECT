import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeTaskStatusRequest, CreateNewTaskRequest, GetAllMyTasksRequest, SimpleRequest } from '../../types/main';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private url = 'https://epam-server-fl19.herokuapp.com/api/task';

  constructor(
    private _http: HttpClient,
  ) { }

  getAllMyTasks(boardID: string): Observable<GetAllMyTasksRequest> {
    return this._http.get<GetAllMyTasksRequest>(`${this.url}/${boardID}`);
  }

  changeStatus(taskID: string, status: string): Observable<ChangeTaskStatusRequest> {
    return this._http.patch<ChangeTaskStatusRequest>(`${this.url}/${taskID}`, { status });
  }

  createTask(boardID: string, status: string, name: string): Observable<CreateNewTaskRequest> {
    return this._http.post<CreateNewTaskRequest>(`${this.url}/create`, {
      boardID, status, name,
    });
  }

  editTask(taskID: string, name: string): Observable<SimpleRequest> {
    return this._http.patch<SimpleRequest>(`${this.url}/edit/${taskID}`, { name });
  }

  deleteTask(taskID: string): Observable<SimpleRequest> {
    return this._http.delete<SimpleRequest>(`${this.url}/delete/${taskID}`);
  }

  updateArchive(taskID: string, archive: boolean): Observable<SimpleRequest> {
    return this._http.patch<SimpleRequest>(`${this.url}/archive/${taskID}`, { archive });
  }
}
