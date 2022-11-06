import { of } from 'rxjs';
import { TasksService } from './tasks.service';
import * as taskMock from './tasks.service.mock';
import { HttpClient } from '@angular/common/http';

describe('TasksService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: TasksService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'patch', 'delete'])
    service = new TasksService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array with tasks', (done) => {
    httpClientSpy.get.and.returnValue(of(taskMock.getAllTasksMock));

    service.getAllMyTasks('1')
      .subscribe({
        next: res => {
          expect(res).toEqual(taskMock.getAllTasksMock);
          done();
        },
        error: done.fail,
      });

    expect(httpClientSpy.get.calls.count()).toBe(1);
  })

  it('should change status of task', (done) => {
    httpClientSpy.patch.and.returnValue(of(taskMock.changeStatusMock));

    service.changeStatus('1', 'TODO')
      .subscribe({
        next: res => {
          expect(res).toEqual(taskMock.changeStatusMock);
          done();
        },
        error: done.fail
      });

    expect(httpClientSpy.patch.calls.count()).toBe(1);
  })

  it('should create new task', (done) => {
    httpClientSpy.post.and.returnValue(of(taskMock.createTaskMock));

    service.createTask('1','TODO', 'task')
      .subscribe({
        next: res => {
          expect(res).toEqual(taskMock.createTaskMock);
          done();
        },
        error: done.fail
      });

    expect(httpClientSpy.post.calls.count()).toBe(1);
  })

  it('should edit already exist task', (done) => {
    httpClientSpy.patch.and.returnValue(of(taskMock.successMock));

    service.editTask('1', 'task')
      .subscribe({
        next: res => {
          expect(res).toEqual(taskMock.successMock);
          done();
        },
        error: done.fail
      });

    expect(httpClientSpy.patch.calls.count()).toBe(1);
  })

  it('should delete already exist task', (done) => {
    httpClientSpy.delete.and.returnValue(of(taskMock.successMock));

    service.deleteTask('1')
      .subscribe({
        next: res => {
          expect(res).toEqual(taskMock.successMock);
          done();
        },
        error: done.fail
      });

    expect(httpClientSpy.delete.calls.count()).toBe(1);
  })

  it('should update archive status of already exist task', (done) => {
    httpClientSpy.patch.and.returnValue(of(taskMock.successMock));

    service.updateArchive('1', false)
      .subscribe({
        next: res => {
          expect(res).toEqual(taskMock.successMock);
          done();
        },
        error: done.fail
      });

    expect(httpClientSpy.patch.calls.count()).toBe(1);
  })
});
