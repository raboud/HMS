import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvTherapyComponent } from './iv-therapy.component';

describe('IvTherapyComponent', () => {
  let component: IvTherapyComponent;
  let fixture: ComponentFixture<IvTherapyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvTherapyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvTherapyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
