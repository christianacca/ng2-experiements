/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormHybridComplexComponent } from './form-hybrid-complex.component';

describe('FormHybridComplexComponent', () => {
  let component: FormHybridComplexComponent;
  let fixture: ComponentFixture<FormHybridComplexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHybridComplexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHybridComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
