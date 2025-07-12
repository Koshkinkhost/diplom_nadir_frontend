import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesPanelComponent } from './employees-panel.component';

describe('EmployeesPanelComponent', () => {
  let component: EmployeesPanelComponent;
  let fixture: ComponentFixture<EmployeesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
