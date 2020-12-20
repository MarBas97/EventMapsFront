import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainmapComponent } from './mainmap.component';

describe('MainmapComponent', () => {
  let component: MainmapComponent;
  let fixture: ComponentFixture<MainmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
