import * as BoardInterface from '../../types/main';
import { SimpleRequest } from '../../types/main';

export const getBoardsMock: BoardInterface.GetBoardRequest = {
  message: 'success',
  status: 200,
  boards: [],
}

export const addBoardMock: BoardInterface.PostBoardRequest = {
  message: 'success',
  status: 200,
  board: {
    description: 'description',
    name: 'name',
    _id: '1',
    createdBy: 'user',
    createdAt: 'date',
    todoColor: 'color',
    doneColor: 'color',
    progressColor: 'color',
  }
}

export const getBoardByIdMock: BoardInterface.GetBoardByIdRequest = {
  message: 'success',
  status: 200,
  board: {
    description: 'description',
    name: 'name',
    _id: '1',
    createdBy: 'user',
    createdAt: 'date',
    todoColor: 'color',
    doneColor: 'color',
    progressColor: 'color',
  }
}

export const successMock: SimpleRequest = {
  message: 'success',
  status: 200,
}
