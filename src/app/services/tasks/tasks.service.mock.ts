import * as TasksInterface from '../../types/main';
import { SimpleRequest } from '../../types/main';

export const getAllTasksMock: TasksInterface.GetAllMyTasksRequest = {
  message: 'string',
  status: 200,
  tasks: [],
}

export const changeStatusMock: TasksInterface.ChangeTaskStatusRequest = {
  message: 'string',
  status: 200,
  changeTask: {
    _id: '1',
    boardID: '1',
    name: 'name',
    status: 'TODO',
    createdAt: 'date',
    isArchived: false,
  }
}

export const createTaskMock: TasksInterface.CreateNewTaskRequest = {
  message: 'string',
  status: 200,
  newTask: {
    _id: '1',
    boardID: '1',
    name: 'name',
    status: 'TODO',
    createdAt: 'date',
    isArchived: false,
  }
}

export const successMock: SimpleRequest = {
  message: 'string',
  status: 200,
}
