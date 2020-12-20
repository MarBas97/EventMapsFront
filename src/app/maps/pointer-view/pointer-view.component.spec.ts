import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointerViewComponent } from './pointer-view.component';

describe('PointerViewComponent', () => {
  let component: PointerViewComponent;
  let fixture: ComponentFixture<PointerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointerViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
