import { Board, PostBoardRequest, SimpleRequest } from '../../types/main';

export const boardsMock: Board[] = [
  {
    _id: '1',
    createdBy: 'user',
    name: 'a',
    description: 'description',
    createdAt: new Date(2000, 1, 1).toString(),
    todoColor: 'red',
    progressColor: 'white',
    doneColor: 'black',
  },
  {
    _id: '2',
    createdBy: 'user',
    name: 'b',
    description: 'description',
    createdAt: new Date(2001, 2, 1).toString(),
    todoColor: 'red',
    progressColor: 'white',
    doneColor: 'black',
  },
];

export const dashboardResponseMock: SimpleRequest = {
  message: 'string',
  status: 200,
};

export const postResponseMock: PostBoardRequest = {
  message: 'string',
  status: 200,
  board: {
    _id: 'string',
    createdBy: 'string',
    name: 'string',
    description: 'string',
    createdAt: 'string',
    todoColor: 'string',
    progressColor: 'string',
    doneColor: 'string',
  }
}
