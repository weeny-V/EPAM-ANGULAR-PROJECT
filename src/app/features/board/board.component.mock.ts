import { Board, Task } from '../../types/main';

export const boardMock: Board = {
  _id: 'string',
  createdBy: 'string',
  name: 'string',
  description: 'string',
  createdAt: 'string',
  todoColor: 'string',
  progressColor: 'string',
  doneColor: 'string',
}

export const todoMock: Task[] = [
  {
    _id: 'string',
    boardID: 'string',
    name: 'a',
    status: 'TODO',
    createdAt: new Date(2000,1,1).toString(),
    isArchived: false,
  },
  {
    _id: 'string',
    boardID: 'string',
    name: 'b',
    status: 'TODO',
    createdAt: new Date(2001, 1, 1).toString(),
    isArchived: false,
  },
];

export const progressMock: Task[] = [
  {
    _id: 'string',
    boardID: 'string',
    name: 'a',
    status: 'IN PROGRESS',
    createdAt: new Date(2000, 1, 1).toString(),
    isArchived: false,
  },
  {
    _id: 'string',
    boardID: 'string',
    name: 'b',
    status: 'IN PROGRESS',
    createdAt: new Date(2001, 1, 1).toString(),
    isArchived: false,
  },
];

export const doneMock: Task[] = [
  {
    _id: 'string',
    boardID: 'string',
    name: 'a',
    status: 'DONE',
    createdAt: new Date(2000,1,1).toString(),
    isArchived: false,
  },
  {
    _id: 'string',
    boardID: 'string',
    name: 'b',
    status: 'DONE',
    createdAt: new Date(2001,1,1).toString(),
    isArchived: false,
  },
];

export const taskMock: Task = {
  _id: 'string',
  boardID: 'string',
  name: 'a',
  status: 'TODO',
  createdAt: new Date(2000,1,1).toString(),
  isArchived: false,
};
