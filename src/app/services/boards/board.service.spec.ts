import { of } from 'rxjs';
import { BoardService } from './board.service';
import * as boardMock from './board.service.mock';
import { HttpClient } from '@angular/common/http';

describe('BoardService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: BoardService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete'])
    service = new BoardService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return board on board request', (done) => {
    httpClientSpy.get.and.returnValue(of(boardMock.getBoardsMock));

    service.getBoards()
      .subscribe({
        next: res => {
          expect(res).toEqual(boardMock.getBoardsMock);
          done();
        },
        error: done.fail,
      })

    expect(httpClientSpy.get.calls.count()).toBe(1);
  })

  it('should add board', (done => {
    httpClientSpy.post.and.returnValue(of(boardMock.addBoardMock));

    service.addBoard('name', 'description')
      .subscribe({
        next: res => {
          expect(res).toEqual(boardMock.addBoardMock);
          done();
        },
        error: done.fail,
      })

    expect(httpClientSpy.post.calls.count()).toBe(1);
  }))

  it('should update board', (done => {
    httpClientSpy.put.and.returnValue(of(boardMock.successMock));

    service.updateBoard('1', 'name')
      .subscribe({
        next: res => {
          expect(res).toEqual(boardMock.successMock);
          done();
        },
        error: done.fail,
      })

    expect(httpClientSpy.put.calls.count()).toBe(1);
  }))

  it('should delete board', (done => {
    httpClientSpy.delete.and.returnValue(of(boardMock.successMock));

    service.deleteBoard('1')
      .subscribe({
        next: res => {
          expect(res).toEqual(boardMock.successMock);
          done();
        },
        error: done.fail,
      })

    expect(httpClientSpy.delete.calls.count()).toBe(1);
  }))

  it('should return board by id', (done => {
    httpClientSpy.get.and.returnValue(of(boardMock.getBoardByIdMock));

    service.getBoardById('1')
      .subscribe({
        next: res => {
          expect(res).toEqual(boardMock.getBoardByIdMock);
          done();
        },
        error: done.fail,
      })

    expect(httpClientSpy.get.calls.count()).toBe(1);
  }))

  it('should change color of column in board', (done => {
    httpClientSpy.patch.and.returnValue(of(boardMock.successMock));

    service.changeColor('1', 'todo', 'red')
      .subscribe({
        next: res => {
          expect(res).toEqual(boardMock.successMock);
          done();
        },
        error: done.fail,
      })

    expect(httpClientSpy.patch.calls.count()).toBe(1);
  }))
});
