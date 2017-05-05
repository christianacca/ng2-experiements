/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormEgComponent } from './form-eg.component';

describe('FormEgComponent', () => {
  let component: FormEgComponent;
  let fixture: ComponentFixture<FormEgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
