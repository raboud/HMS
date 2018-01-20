import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Expertise2Component } from './expertise2.component';

describe('Expertise2Component', () => {
  let component: Expertise2Component;
  let fixture: ComponentFixture<Expertise2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Expertise2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Expertise2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
