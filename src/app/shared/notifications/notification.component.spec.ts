import { NotificationComponent } from './notification.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should push all exist notifications', () => {
    spyOn(component, 'ngOnInit').and.callFake(() => {
      component.notifications.push({id: 1, message: 'string', timeout: 3000});
    })
    expect(component.notifications.length).toBe(0);
    component.ngOnInit();
    expect(component.notifications.length).toBe(1);
  })

  it('on method close should delete mentioned notification', () => {
    const notification = { id: 1, message: 'string', timeout: 3000 };

    component.notifications.push(notification);
    expect(component.notifications.length).toBe(1);
    component.close(notification);
    expect(component.notifications.length).toBe(0);
  })
});
