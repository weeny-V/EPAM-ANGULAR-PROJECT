import { of } from 'rxjs';
import { CommentService } from './comment.service';
import * as commentMock from './comment.service.mock';
import { HttpClient } from '@angular/common/http';

describe('CommentService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: CommentService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
    service = new CommentService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add comment to database', (done) => {
    httpClientSpy.post.and.returnValue(of(commentMock.addCommentMock));

    service.addComment('1', '1', 'user', 'string')
      .subscribe({
        next: res => {
          expect(res).toEqual(commentMock.addCommentMock)
          done()
        },
        error: done.fail,
      })

    expect(httpClientSpy.post.calls.count()).toBe(1);
  })

  it('should return all comments', (done) => {
    httpClientSpy.get.and.returnValue(of(commentMock.getCommentsMock));

    service.getComments('1')
      .subscribe({
        next: res => {
          expect(res).toEqual(commentMock.getCommentsMock)
          done()
        },
        error: done.fail,
      })

    expect(httpClientSpy.get.calls.count()).toBe(1);
  })

  it('should delete comment', (done) => {
    httpClientSpy.delete.and.returnValue(of(commentMock.successMock));

    service.deleteComment('1')
      .subscribe({
        next: res => {
          expect(res).toEqual(commentMock.successMock)
          done()
        },
        error: done.fail,
      })

    expect(httpClientSpy.delete.calls.count()).toBe(1);
  })
});
