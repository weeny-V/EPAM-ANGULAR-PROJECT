import * as UserInterface from '../../types/main';

export const getUserInfoMock: UserInterface.GetUserInfoRequest = {
  message: 'string',
  status: 200,
  user: {
    _id: '1',
    username: 'username',
    createdDate: 'date',
  }
}
