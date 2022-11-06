import * as CommentInterface from '../../types/main';
import { SimpleRequest } from '../../types/main';

export const addCommentMock: CommentInterface.AddCommentRequest = {
  message: 'success',
  status: 200,
  comment: {
    _id: '1',
    taskID: '1',
    from: 'user',
    message: 'string',
    createdAt: 'date',
    photo: null,
  }
}

export const getCommentsMock: CommentInterface.GetCommentsRequest = {
  message: 'string',
  status: 200,
  comments: [],
}

export const successMock: SimpleRequest = {
  message: 'string',
  status: 200,
}
