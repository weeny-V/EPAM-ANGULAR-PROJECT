export interface DropzoneLayout {
  container: string;
  list: string;
  dndHorizontal: boolean;
}

export interface Task {
  _id: string;
  boardID: string;
  name: string;
  status: string;
  createdAt: string;
  isArchived: boolean;
}

export interface SimpleRequest {
  message: string;
  status: number;
}

export interface LoginRequest extends SimpleRequest {
  jwt_token: string;
}

export interface GetBoardRequest extends SimpleRequest {
  boards: Board[];
}

export interface PostBoardRequest extends SimpleRequest {
  board: Board;
}

export interface GetBoardByIdRequest extends SimpleRequest {
  board: Board;
}

export interface GetAllMyTasksRequest extends SimpleRequest {
  tasks: Task[];
}

export interface ChangeTaskStatusRequest extends SimpleRequest {
  changeTask: Task;
}

export interface CreateNewTaskRequest extends SimpleRequest {
  newTask: Task;
}

export interface GetUserInfoRequest extends SimpleRequest {
  user: IUser;
}

export interface AddCommentRequest extends SimpleRequest {
  comment: IComment;
}

export interface GetCommentsRequest extends SimpleRequest {
  comments: IComment[];
}

export class INotification {

  constructor(
    public id: number,
    public message: string,
    public timeout: number,
  ) {
  }

}

export interface Board {
  _id: string;
  createdBy: string;
  name: string;
  description: string;
  createdAt: string;
  todoColor: string;
  progressColor: string;
  doneColor: string;
}

export interface IUser {
  _id: string;
  username: string;
  createdDate: string;
}

export interface IComment {
  _id: string;
  taskID: string;
  from: string;
  message: string;
  createdAt: string;
  photo: Blob | null;
}

export declare interface ComponentType<T> {
  new (...args: any[]): T;
}

export declare class ModalConfig<D = any> {
  data?: D | null;
}

export interface ISortItem {
  isAsc: boolean;
  isDesc: boolean;
  type: string;
}

export interface IModalData {
  data: any;
}

export interface IStore {
  user?: IUser;
}
