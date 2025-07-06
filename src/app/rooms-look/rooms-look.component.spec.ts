import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsLookComponent } from './rooms-look.component';

describe('RoomsLookComponent', () => {
  let component: RoomsLookComponent;
  let fixture: ComponentFixture<RoomsLookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsLookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsLookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
