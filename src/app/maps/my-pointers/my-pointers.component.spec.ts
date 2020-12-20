import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPointersComponent } from './my-pointers.component';

describe('MyPointersComponent', () => {
  let component: MyPointersComponent;
  let fixture: ComponentFixture<MyPointersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPointersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPointersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
