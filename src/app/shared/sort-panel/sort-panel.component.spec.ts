import { By } from '@angular/platform-browser';
import { SortPanelComponent } from './sort-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('SortPanelComponent', () => {
  let component: SortPanelComponent;
  let fixture: ComponentFixture<SortPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortPanelComponent ],
      imports: [ FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change sortBy variable on each select changes', () => {
    spyOn(component, 'onChange');

    const select = fixture.debugElement.query(By.css('#sort-panel')).nativeElement;

    expect(select.value).toBe('Date');

    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(select.value).toBe('Name');

    select.value = select.options[0].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(select.value).toBe('Date');
  })

  it('should work correctly ASC and DESC buttons', () => {
    const eventName = spyOn(component.sortByName, 'emit');
    const eventDate = spyOn(component.sortByDate, 'emit');

    component.sort()
    expect(eventDate).toHaveBeenCalledWith({
      type: 'date',
      isAsc: false,
      isDesc: true,
    });

    component.sortBy.setValue('Name');
    component.onChange();
    fixture.detectChanges();
    expect(eventName).toHaveBeenCalledWith({
      type: 'name',
      isAsc: false,
      isDesc: true,
    })

    component.sort();
    fixture.detectChanges();
    expect(eventName).toHaveBeenCalledWith({
      type: 'name',
      isAsc: true,
      isDesc: false,
    })
  })
});
